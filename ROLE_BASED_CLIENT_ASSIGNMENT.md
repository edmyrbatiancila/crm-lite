# Role-Based Client Assignment System

## Overview

This implementation adds role-based restrictions to client assignment functionality. Users with different roles have different assignment permissions:

- **Admin users**: Can assign clients to any user in the system
- **Regular users**: Can only assign clients to themselves

## Implementation Details

### Backend Changes

#### 1. ClientController Updates

**File**: `app/Http/Controllers/ClientController.php`

**Changes Made**:
- Added `Auth` facade import for user authentication
- Modified `create()` method to filter available users based on current user's role
- Modified `edit()` method with same role-based filtering
- Updated `store()` method to enforce assignment restrictions on form submission
- Updated `update()` method to enforce assignment restrictions on form updates
- Added `currentUser` data to Inertia responses

**Key Logic**:
```php
$currentUser = Auth::user();

// If user is admin, they can assign to any user
// If user is regular user, they can only assign to themselves
if ($currentUser->role === 'admin') {
    $users = User::select('id', 'first_name', 'last_name')->get();
} else {
    // Regular users can only assign clients to themselves
    $users = User::select('id', 'first_name', 'last_name')
        ->where('id', $currentUser->id)
        ->get();
}
```

**Security Enforcement**:
```php
// If user is not admin and trying to assign to someone else, override assignment
if ($currentUser->role !== 'admin' && $validatedData['assigned_to'] != $currentUser->id) {
    $validatedData['assigned_to'] = $currentUser->id;
}
```

### Frontend Changes

#### 1. Type Definitions

**File**: `resources/js/types/clients/IClients.ts`

**Changes Made**:
- Extended `User` interface to include `last_name`
- Added new `CurrentUser` interface for role information

```typescript
export interface CurrentUser {
    id: number;
    role: string;
    canAssignToOthers: boolean;
}
```

#### 2. Client Form Page

**File**: `resources/js/pages/admin/client/client-form-page.tsx`

**Changes Made**:
- Added `currentUser` prop to component interface
- Updated form default values to auto-assign to current user for non-admins
- Passed `currentUser` data to `FormInput` component

```typescript
assigned_to: client?.assigned_to ?? (!currentUser.canAssignToOthers ? currentUser.id : null)
```

#### 3. Form Input Component

**File**: `resources/js/components/clients/form-input.tsx`

**Changes Made**:
- Added `currentUser` prop to component interface
- Disabled user selection dropdown for non-admin users
- Added informational message for restricted users

```tsx
disabled={processing || !currentUser.canAssignToOthers}

{!currentUser.canAssignToOthers && (
    <p className="text-sm text-muted-foreground mt-1">
        <span className="text-amber-600">Note:</span> As a regular user, you can only assign clients to yourself.
    </p>
)}
```

## User Experience

### For Admin Users
- See all users in the "Assign To" dropdown
- Can freely assign clients to any user
- No restrictions on client management

### For Regular Users
- "Assign To" dropdown is disabled and pre-filled with their own name
- See a helpful note explaining the restriction
- Clients are automatically assigned to them
- Cannot reassign existing clients to other users

## Security Features

1. **Frontend Restrictions**: Prevents users from seeing/selecting assignment options they don't have permission for
2. **Backend Validation**: Enforces assignment rules regardless of frontend manipulation
3. **Data Filtering**: Only shows relevant users based on permissions
4. **Automatic Override**: Forces correct assignment if invalid data is submitted

## Database Requirements

The implementation requires a `role` column in the `users` table:

```sql
ALTER TABLE users ADD COLUMN role VARCHAR(255) DEFAULT 'user' AFTER email;
```

## Testing

### Test Users
Create test users with different roles:

```php
// Admin user
User::create([
    'first_name' => 'Admin',
    'last_name' => 'User',
    'email' => 'admin@test.com',
    'password' => bcrypt('password'),
    'role' => 'admin'
]);

// Regular user
User::create([
    'first_name' => 'Regular',
    'last_name' => 'User',
    'email' => 'user@test.com',
    'password' => bcrypt('password'),
    'role' => 'user'
]);
```

### Test Scenarios

1. **Admin User Test**:
   - Login as admin@test.com
   - Navigate to `/clients/create`
   - Verify dropdown shows all users
   - Can select any user for assignment

2. **Regular User Test**:
   - Login as user@test.com
   - Navigate to `/clients/create`
   - Verify dropdown is disabled
   - See only own name in assignment field
   - See informational note

3. **Security Test**:
   - Login as regular user
   - Try to manipulate form data via browser dev tools
   - Submit form with different assignment
   - Verify backend overrides and assigns to current user

## Benefits

1. **Security**: Prevents unauthorized assignment of clients
2. **User Experience**: Clear indication of permissions and restrictions
3. **Data Integrity**: Ensures consistent assignment rules
4. **Flexibility**: Easy to extend for additional roles
5. **Performance**: Efficient user filtering reduces unnecessary data loading

## Future Enhancements

1. **Role Permissions**: Integration with more sophisticated permission systems
2. **Team-Based Assignment**: Allow assignment within user teams/groups
3. **Client Categories**: Different assignment rules for different client types
4. **Audit Trail**: Log assignment changes for accountability

## Files Modified

### Backend
- `app/Http/Controllers/ClientController.php`

### Frontend
- `resources/js/types/clients/IClients.ts`
- `resources/js/pages/admin/client/client-form-page.tsx`
- `resources/js/components/clients/form-input.tsx`

### Database
- Added `role` column to `users` table

## Conclusion

This implementation provides a secure, user-friendly way to enforce role-based client assignment restrictions while maintaining flexibility for future enhancements. The solution includes both frontend UX improvements and backend security enforcement to ensure data integrity.
