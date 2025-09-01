# Task Assignment Role-Based Authorization Fix

## Overview
Fixed the 403 unauthorized error and improved the task assignment system to properly handle role-based permissions where regular users can only assign tasks to themselves, while admin users can assign tasks to any user (except themselves).

## Issues Fixed

### 1. **403 Unauthorized Error**
- **Problem**: Frontend was disabling the user dropdown for regular users but not setting a default value, causing validation errors.
- **Solution**: Automatically set `user_id` to current user's ID for non-admin users in the form initialization.

### 2. **Missing Backend Validation**
- **Problem**: Backend validation didn't enforce role-based assignment rules.
- **Solution**: Added role-based validation rules in `StoreTaskRequest` and `UpdateTaskRequest`.

### 3. **Inconsistent User Lists**
- **Problem**: Edit page wasn't filtering users based on role like the create page.
- **Solution**: Applied consistent user filtering logic across create and edit operations.

## Changes Made

### Backend Changes

#### 1. Updated `StoreTaskRequest.php`
```php
public function rules(): array
{
    $currentUser = Auth::user();
    
    // Define user_id validation rules based on role
    $userIdRules = ['required', Rule::exists('users', 'id')];
    
    // If user is not admin, they can only assign to themselves
    if ($currentUser && $currentUser->role !== 'admin') {
        $userIdRules[] = Rule::in([$currentUser->id]);
    }

    return [
        'title' => ['required', 'string', 'max:255'],
        'description' => ['required', 'string'],
        'user_id' => $userIdRules,
        'client_id' => ['required', Rule::exists('clients', 'id')],
        'project_id' => ['required', Rule::exists('projects', 'id')],
        'status' => ['required', Rule::enum(TaskStatus::class)],
        'deadline_at' => ['required', 'date'],
    ];
}

public function messages(): array
{
    return [
        'user_id.in' => 'You can only assign tasks to yourself.',
        'user_id.required' => 'Please select a user to assign this task to.',
        'user_id.exists' => 'The selected user does not exist.',
    ];
}
```

#### 2. Updated `UpdateTaskRequest.php`
- Applied the same validation logic as `StoreTaskRequest.php`
- Added custom validation messages for better user experience

#### 3. Fixed `TaskController@edit`
```php
public function edit(Task $task)
{
    $currentUser = Auth::user();

    // If user is Admin, they can assign to any user except themselves
    // If user is regular user, they can only assign to themselves.
    if ($currentUser->role === 'admin') {
        $users = User::select('id', 'first_name', 'last_name')
            ->where('id', '!=', $currentUser->id)
            ->get();
    } else {
        // Regular users can only assign to themselves
        $users = User::select('id', 'first_name', 'last_name')
            ->where('id', $currentUser->id)
            ->get();
    }
    
    // ... rest of the method
    
    return Inertia::render('tasks/tasks-creation-page', [
        'task' => $task,
        'users' => $users,
        'currentUser' => [
            'id' => $currentUser->id,
            'role' => $currentUser->role ?? RoleEnum::USER->value,
            'canAssignToOthers' => $currentUser->role === RoleEnum::ADMIN->value
        ],
        // ... other props
    ]);
}
```

### Frontend Changes

#### 1. Updated `tasks-creation-page.tsx`
```tsx
const { data, setData, post, put, processing, reset, errors } = useForm<Required<TaskForm>>({
    id: task?.id ?? null,
    title: task?.title ?? '',
    description: task?.description ?? '',
    client_id: task?.client_id ?? null,
    user_id: task?.user_id ?? (currentUser.role !== 'admin' ? currentUser.id : null), // Auto-assign for non-admin
    project_id: task?.project_id ?? null,
    deadline_at: task?.deadline_at ?? '',
    status: task?.status ?? ''
});
```

#### 2. Enhanced `task-form-input.tsx`
```tsx
// Filter users based on role
const availableUsers = currentUser.role === 'admin' ? users : users.filter(user => user.id === currentUser.id);

// Improved UI with role-specific messages
<SelectInput<User> 
    label="Assigned User"    
    htmlFor="user_id"
    value={onData.user_id?.toString() || ''}
    onChange={(value) => onChange('user_id', value)}
    placeholder={currentUser.role === 'admin' ? "Select assigned user" : "Assigned to yourself"}
    data={availableUsers}
    valueKey="id"
    displayKey="first_name"
    groupLabel={currentUser.role === 'admin' ? "Available Users" : "Current User"}
    error={onErrors.user_id}
    disabled={isDropdownDisabled}
    required
/>

{currentUser.role !== 'admin' && (
    <div className="text-sm text-muted-foreground mt-1">
        <span className="text-amber-600">Note:</span> As a regular user, you can only assign tasks to yourself.
    </div>
)}
```

## Role-Based Logic

### Admin Users
- Can assign tasks to any user except themselves
- See dropdown with all other users
- Can create and edit all tasks
- Dropdown is enabled with full user list

### Regular Users
- Can only assign tasks to themselves
- See dropdown with only their own name (pre-selected)
- Dropdown appears disabled for better UX
- Backend validates that they can only assign to themselves

## Security Improvements

1. **Backend Validation**: Server-side validation ensures users cannot bypass frontend restrictions
2. **Role-Based Rules**: Validation rules adapt based on user role
3. **Custom Messages**: Clear error messages for authorization failures
4. **Consistent Filtering**: User lists are filtered on both create and edit operations

## User Experience Improvements

1. **Auto-Assignment**: Non-admin users automatically have themselves assigned
2. **Clear Messaging**: Informative notes explain the restrictions
3. **Conditional Placeholders**: Different placeholder text based on role
4. **Proper Error Handling**: Meaningful validation messages

## Testing Recommendations

1. **Admin User Tests**:
   - Can create tasks assigned to other users
   - Can edit tasks and change assignments
   - Cannot assign tasks to themselves

2. **Regular User Tests**:
   - Can create tasks assigned to themselves
   - Cannot assign tasks to other users
   - Get clear error messages if they try to bypass restrictions

3. **Edge Cases**:
   - Test with no other users available
   - Test role switching scenarios
   - Test form validation with invalid data

## Related Files Modified

- `app/Http/Requests/StoreTaskRequest.php`
- `app/Http/Requests/UpdateTaskRequest.php`
- `app/Http/Controllers/TaskController.php`
- `resources/js/pages/tasks/tasks-creation-page.tsx`
- `resources/js/components/tasks/task-form-input.tsx`

This implementation ensures proper role-based authorization while maintaining a good user experience for both admin and regular users.
