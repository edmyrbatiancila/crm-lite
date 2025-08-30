# Dynamic Notification System

This CRM application features a comprehensive dynamic notification system that automatically creates notifications based on application events.

## Overview

The notification system consists of:

1. **NotificationService** - Central service for creating notifications
2. **Model Observers** - Automatically trigger notifications when models are created/updated/deleted
3. **Scheduled Commands** - Send deadline reminders and other periodic notifications
4. **Frontend UI** - Header dropdown and full-page notification interface

## How It Works

### Automatic Event-Based Notifications

The system uses Laravel Model Observers to automatically create notifications when certain events occur:

#### Task Events
- **Task Created**: Notifies assigned user when a new task is created
- **Task Status Changed**: Notifies when task status changes (pending → in_progress → completed)
- **Task Assignment Changed**: Notifies when a task is reassigned to a different user
- **Task Deleted**: Notifies when a task is deleted

#### Project Events
- **Project Created**: Notifies team members about new projects
- **Project Status Changed**: Notifies when project status changes
- **Project Updated**: Notifies when important fields like name, deadline, or budget change
- **Project Deleted**: Notifies when a project is deleted

#### Client Events
- **Client Assigned**: Notifies user when assigned to a client
- **Client Updated**: Notifies when client information changes
- **Client Deleted**: Notifies when a client is deleted

### Scheduled Notifications

The system includes scheduled commands that run automatically:

#### Deadline Reminders
- **Daily at 9:00 AM**: Sends deadline reminder notifications for upcoming tasks and projects
- **Command**: `php artisan notifications:send-deadline-reminders`

### Notification Types

The system supports different notification types:
- `SUCCESS` - Green notifications for positive actions
- `INFO` - Blue notifications for informational messages
- `WARNING` - Orange notifications for warnings
- `ERROR` - Red notifications for errors

## Frontend Integration

### Header Notification Bell
- Shows unread notification count
- Dropdown displays recent notifications
- Real-time updates via Inertia.js
- Animated with Framer Motion

### Full Notification Page
- Complete list of all notifications
- Mark individual notifications as read
- Mark all notifications as read
- Filter and search functionality
- Professional animations and transitions

## Usage Examples

### Manual Notification Creation
```php
use App\Services\NotificationService;
use App\Enums\NotificationType;

// Create a custom notification
NotificationService::create(
    $user,
    'Custom Title',
    'Your custom message here',
    NotificationType::INFO,
    ['additional' => 'data']
);
```

### Automatic Notifications
Notifications are automatically created when you:

```php
// This will trigger TaskObserver and create notifications
Task::create([
    'title' => 'New Task',
    'user_id' => $userId,
    'status' => TaskStatus::PENDING
]);

// This will trigger ProjectObserver
$project = Project::find(1);
$project->status = ProjectStatus::COMPLETED;
$project->save(); // Automatically creates notification

// This will trigger ClientObserver
Client::create([
    'name' => 'New Client',
    'user_id' => $userId
]);
```

## Configuration

### Observer Registration
Observers are automatically registered in `App\Providers\AppServiceProvider`:

```php
Task::observe(TaskObserver::class);
Project::observe(ProjectObserver::class);
Client::observe(ClientObserver::class);
```

### Scheduled Commands
Scheduled in `routes/console.php`:

```php
Schedule::command('notifications:send-deadline-reminders')
    ->dailyAt('09:00')
    ->description('Send daily deadline reminder notifications');
```

### Frontend Sharing
Notifications are automatically shared with all frontend pages via `ShareNotificationData` middleware.

## Testing

### Test Routes
A test route is available for development:
- **URL**: `/test-notifications`
- **Purpose**: Creates a test notification to verify the system works
- **Note**: Remove this route in production

### Manual Testing
```bash
# Test deadline reminders
php artisan notifications:send-deadline-reminders

# Clear caches after changes
php artisan config:clear && php artisan route:clear
```

## Customization

### Adding New Notification Types
1. Add new cases to `App\Enums\NotificationType`
2. Create new methods in `NotificationService`
3. Update observers or create new ones
4. Add frontend styling for new types

### Creating New Observers
```bash
php artisan make:observer YourModelObserver --model=YourModel
```

Then register in `AppServiceProvider`:
```php
YourModel::observe(YourModelObserver::class);
```

## Benefits

1. **Automatic**: No need to manually create notifications in controllers
2. **Consistent**: All notifications follow the same format and structure
3. **Flexible**: Easy to customize and extend
4. **Real-time**: Users get immediate feedback on important events
5. **Professional**: Clean UI with animations and proper UX
6. **Scalable**: Easy to add new notification types and events

The dynamic notification system ensures users stay informed about important activities in the CRM without requiring manual intervention from developers.
