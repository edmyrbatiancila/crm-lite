<?php

namespace App\Services;

use App\Enums\NotificationType;
use App\Models\Notification;
use App\Models\User;
use App\Models\Task;
use App\Models\Project;
use App\Models\Client;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Create a notification for a user
     */
    public static function create(
        User $user,
        string $title,
        string $message,
        NotificationType $type,
        array $data = []
    ): Notification {
        return Notification::create([
            'user_id' => $user->id,
            'title' => $title,
            'message' => $message,
            'type' => $type->value,
            'data' => json_encode($data),
            'is_read' => false,
        ]);
    }

    /**
     * Create multiple notifications for multiple users
     */
    public static function createForUsers(
        array $users,
        string $title,
        string $message,
        NotificationType $type,
        array $data = []
    ): void {
        foreach ($users as $user) {
            self::create($user, $title, $message, $type, $data);
        }
    }

    /**
     * Task-related notifications
     */
    public static function taskAssigned(Task $task, User $assignedTo): Notification
    {
        return self::create(
            $assignedTo,
            'New Task Assigned',
            "You have been assigned a new task: \"{$task->title}\"",
            NotificationType::TASK_ASSIGNED,
            [
                'task_id' => $task->id,
                'task_title' => $task->title,
                'project_id' => $task->project_id,
                'client_id' => $task->client_id,
            ]
        );
    }

    public static function taskStatusChanged(Task $task, string $oldStatus, string $newStatus): void
    {
        $users = collect();
        
        // Notify the task assignee
        if ($task->user) {
            $users->push($task->user);
        }
        
        // Notify project manager if different from assignee
        if ($task->project && $task->project->user && $task->project->user->id !== $task->user_id) {
            $users->push($task->project->user);
        }

        $users->unique('id')->each(function ($user) use ($task, $oldStatus, $newStatus) {
            self::create(
                $user,
                'Task Status Updated',
                "Task \"{$task->title}\" status changed from {$oldStatus} to {$newStatus}",
                NotificationType::INFO,
                [
                    'task_id' => $task->id,
                    'task_title' => $task->title,
                    'old_status' => $oldStatus,
                    'new_status' => $newStatus,
                ]
            );
        });
    }

    public static function taskDeadlineReminder(Task $task): void
    {
        if ($task->user) {
            self::create(
                $task->user,
                'Task Deadline Reminder',
                "Task \"{$task->title}\" is due soon. Deadline: {$task->deadline_at}",
                NotificationType::DEADLINE_REMINDER,
                [
                    'task_id' => $task->id,
                    'task_title' => $task->title,
                    'deadline' => $task->deadline_at,
                ]
            );
        }
    }

    /**
     * Project-related notifications
     */
    public static function projectCreated(Project $project): void
    {
        // Notify project manager
        if ($project->user) {
            self::create(
                $project->user,
                'New Project Created',
                "Project \"{$project->title}\" has been created and assigned to you",
                NotificationType::PROJECT_UPDATED,
                [
                    'project_id' => $project->id,
                    'project_title' => $project->title,
                    'client_id' => $project->client_id,
                ]
            );
        }

        // Notify client
        if ($project->client && $project->client->assigned_to) {
            $clientUser = User::find($project->client->assigned_to);
            if ($clientUser) {
                self::create(
                    $clientUser,
                    'New Project Started',
                    "A new project \"{$project->title}\" has been started for client {$project->client->name}",
                    NotificationType::PROJECT_UPDATED,
                    [
                        'project_id' => $project->id,
                        'project_title' => $project->title,
                        'client_id' => $project->client_id,
                        'client_name' => $project->client->name,
                    ]
                );
            }
        }
    }

    public static function projectStatusChanged(Project $project, string $oldStatus, string $newStatus): void
    {
        $users = collect();
        
        // Notify project manager
        if ($project->user) {
            $users->push($project->user);
        }
        
        // Notify client account manager
        if ($project->client && $project->client->assigned_to) {
            $clientUser = User::find($project->client->assigned_to);
            if ($clientUser && $clientUser->id !== $project->user_id) {
                $users->push($clientUser);
            }
        }

        $users->unique('id')->each(function ($user) use ($project, $oldStatus, $newStatus) {
            self::create(
                $user,
                'Project Status Updated',
                "Project \"{$project->title}\" status changed from {$oldStatus} to {$newStatus}",
                NotificationType::PROJECT_UPDATED,
                [
                    'project_id' => $project->id,
                    'project_title' => $project->title,
                    'old_status' => $oldStatus,
                    'new_status' => $newStatus,
                ]
            );
        });
    }

    public static function projectCompleted(Project $project): void
    {
        $users = collect();
        
        // Notify project manager
        if ($project->user) {
            $users->push($project->user);
        }
        
        // Notify client account manager
        if ($project->client && $project->client->assigned_to) {
            $clientUser = User::find($project->client->assigned_to);
            if ($clientUser) {
                $users->push($clientUser);
            }
        }

        $users->unique('id')->each(function ($user) use ($project) {
            self::create(
                $user,
                'Project Completed!',
                "Congratulations! Project \"{$project->title}\" has been completed successfully",
                NotificationType::SUCCESS,
                [
                    'project_id' => $project->id,
                    'project_title' => $project->title,
                    'client_name' => $project->client->name ?? 'Unknown',
                ]
            );
        });
    }

    /**
     * Client-related notifications
     */
    public static function clientAssigned(Client $client, User $assignedTo): Notification
    {
        return self::create(
            $assignedTo,
            'New Client Assigned',
            "You have been assigned a new client: {$client->name}",
            NotificationType::CLIENT_MESSAGE,
            [
                'client_id' => $client->id,
                'client_name' => $client->name,
                'client_email' => $client->email,
            ]
        );
    }

    public static function newClientRegistered(Client $client): void
    {
        // Notify all admins about new client
        $admins = User::role('admin')->get();
        
        $admins->each(function ($admin) use ($client) {
            self::create(
                $admin,
                'New Client Registered',
                "A new client \"{$client->name}\" has been registered in the system",
                NotificationType::INFO,
                [
                    'client_id' => $client->id,
                    'client_name' => $client->name,
                    'client_email' => $client->email,
                ]
            );
        });
    }

    /**
     * System notifications
     */
    public static function welcomeNewUser(User $user): Notification
    {
        return self::create(
            $user,
            'Welcome to CRM Lite!',
            "Welcome {$user->first_name}! Your account has been created successfully. Start exploring your dashboard and managing your projects.",
            NotificationType::SUCCESS,
            [
                'user_id' => $user->id,
                'welcome_date' => now()->toDateString(),
            ]
        );
    }

    public static function userWelcome(User $user): Notification
    {
        return self::create(
            $user,
            '🎉 Welcome to CRM Lite!',
            "Hello {$user->first_name}! Your account has been successfully created. We're excited to have you on board! Start by exploring your dashboard, creating your first project, or managing your clients.",
            NotificationType::SUCCESS,
            [
                'user_id' => $user->id,
                'user_name' => $user->first_name . ' ' . $user->last_name,
                'welcome_date' => now()->toDateString(),
                'getting_started' => true,
                'features' => [
                    'dashboard' => 'View your overview and statistics',
                    'projects' => 'Create and manage projects',
                    'tasks' => 'Track your daily tasks',
                    'clients' => 'Manage client relationships'
                ]
            ]
        );
    }

    public static function firstLoginWelcome(User $user): Notification
    {
        return self::create(
            $user,
            '👋 Welcome back! First time logging in?',
            "Great to see you, {$user->first_name}! This is your first login. Take a tour of your new CRM dashboard and discover all the features available to help you manage your work efficiently.",
            NotificationType::INFO,
            [
                'user_id' => $user->id,
                'first_login' => true,
                'login_date' => now()->toDateString(),
                'quick_tips' => [
                    'Create your first project to get started',
                    'Add clients to organize your work',
                    'Set up tasks to track your progress',
                    'Check notifications to stay updated'
                ]
            ]
        );
    }

    public static function newUserRegistered(User $user): void
    {
        try {
            // First try to get admins by role
            $admins = collect();
            
            try {
                $admins = User::role('admin')->get();
            } catch (\Exception $e) {
                // If role-based query fails, try to find users with admin in email or fallback to first user
                Log::info('Role-based admin lookup failed, trying alternative method');
                $admins = User::where('email', 'like', '%admin%')->get();
                
                // If no admin-like users found, notify the first user in the system
                if ($admins->isEmpty()) {
                    $firstUser = User::orderBy('created_at')->first();
                    if ($firstUser && $firstUser->id !== $user->id) {
                        $admins = collect([$firstUser]);
                    }
                }
            }
            
            $admins->each(function ($admin) use ($user) {
                self::create(
                    $admin,
                    'New User Registered',
                    "A new user {$user->first_name} {$user->last_name} ({$user->email}) has registered to the system.",
                    NotificationType::INFO,
                    [
                        'new_user_id' => $user->id,
                        'new_user_name' => $user->first_name . ' ' . $user->last_name,
                        'new_user_email' => $user->email,
                        'registration_date' => now()->toDateString(),
                        'action_required' => false
                    ]
                );
            });
        } catch (\Exception $e) {
            // If everything fails, just log and continue
            Log::warning('Failed to notify about new user registration: ' . $e->getMessage(), [
                'user_id' => $user->id,
                'user_email' => $user->email
            ]);
        }
    }

    public static function userAccountDeleted(User $user): void
    {
        // Notify admins about user account deletion
        $admins = User::role('admin')->get();
        
        $admins->each(function ($admin) use ($user) {
            self::create(
                $admin,
                'User Account Deleted',
                "User account for {$user->first_name} {$user->last_name} ({$user->email}) has been deleted from the system.",
                NotificationType::WARNING,
                [
                    'deleted_user_id' => $user->id,
                    'deleted_user_name' => $user->first_name . ' ' . $user->last_name,
                    'deleted_user_email' => $user->email,
                    'deletion_date' => now()->toDateString(),
                ]
            );
        });
    }

    public static function systemMaintenance(string $message, \DateTime $scheduledTime): void
    {
        $users = User::all();
        
        $users->each(function ($user) use ($message, $scheduledTime) {
            self::create(
                $user,
                'System Maintenance Scheduled',
                $message,
                NotificationType::SYSTEM,
                [
                    'scheduled_time' => $scheduledTime->format('Y-m-d H:i:s'),
                    'maintenance_type' => 'scheduled',
                ]
            );
        });
    }

    public static function criticalError(string $error, array $context = []): void
    {
        $admins = User::role('admin')->get();
        
        $admins->each(function ($admin) use ($error, $context) {
            self::create(
                $admin,
                'Critical System Error',
                "A critical error has occurred: {$error}",
                NotificationType::ERROR,
                [
                    'error_message' => $error,
                    'context' => $context,
                    'timestamp' => now()->toISOString(),
                ]
            );
        });
    }

    /**
     * Deadline and reminder notifications
     */
    public static function sendDeadlineReminders(): void
    {
        // Send reminders for tasks due in the next 24 hours
        $upcomingTasks = Task::where('deadline_at', '>=', now())
            ->where('deadline_at', '<=', now()->addDay())
            ->whereNotIn('status', ['closed', 'completed'])
            ->with(['user', 'project'])
            ->get();

        $upcomingTasks->each(function ($task) {
            self::taskDeadlineReminder($task);
        });

        // Send reminders for projects due in the next 3 days
        $upcomingProjects = Project::where('deadline_at', '>=', now())
            ->where('deadline_at', '<=', now()->addDays(3))
            ->whereNotIn('status', ['completed', 'cancelled'])
            ->with(['user', 'client'])
            ->get();

        $upcomingProjects->each(function ($project) {
            if ($project->user) {
                self::create(
                    $project->user,
                    'Project Deadline Reminder',
                    "Project \"{$project->title}\" is due soon. Deadline: {$project->deadline_at}",
                    NotificationType::DEADLINE_REMINDER,
                    [
                        'project_id' => $project->id,
                        'project_title' => $project->title,
                        'deadline' => $project->deadline_at,
                    ]
                );
            }
        });
    }

    /**
     * Client-related notifications
     */
    public static function clientUpdated(Client $client, User $updatedBy, array $changes = []): void
    {
        // Only notify if client is assigned to someone other than the person who made the update
        if ($client->assigned_to && $client->assigned_to != $updatedBy->id) {
            $assignedUser = User::find($client->assigned_to);
            
            if ($assignedUser) {
                // Create a readable list of changes
                $changesList = '';
                if (!empty($changes)) {
                    $readableChanges = [];
                    foreach ($changes as $field => $change) {
                        switch ($field) {
                            case 'name':
                                $readableChanges[] = "name changed from \"{$change['old']}\" to \"{$change['new']}\"";
                                break;
                            case 'email':
                                $readableChanges[] = "email changed from \"{$change['old']}\" to \"{$change['new']}\"";
                                break;
                            case 'phone':
                                $readableChanges[] = "phone changed from \"{$change['old']}\" to \"{$change['new']}\"";
                                break;
                            case 'mobile_no':
                                $readableChanges[] = "mobile number changed from \"{$change['old']}\" to \"{$change['new']}\"";
                                break;
                            case 'address':
                                $readableChanges[] = "address was updated";
                                break;
                            case 'notes':
                                $readableChanges[] = "notes were updated";
                                break;
                            case 'assigned_to':
                                $oldUser = User::find($change['old']);
                                $newUser = User::find($change['new']);
                                $readableChanges[] = "assigned user changed from \"{$oldUser?->first_name} {$oldUser?->last_name}\" to \"{$newUser?->first_name} {$newUser?->last_name}\"";
                                break;
                            default:
                                $readableChanges[] = "{$field} was updated";
                        }
                    }
                    $changesList = '. Changes: ' . implode(', ', $readableChanges);
                }

                self::create(
                    $assignedUser,
                    'Client Information Updated',
                    "Your client \"{$client->name}\" has been updated by {$updatedBy->first_name} {$updatedBy->last_name}{$changesList}",
                    NotificationType::CLIENT_UPDATED,
                    [
                        'client_id' => $client->id,
                        'client_name' => $client->name,
                        'updated_by' => $updatedBy->id,
                        'updated_by_name' => "{$updatedBy->first_name} {$updatedBy->last_name}",
                        'changes' => $changes,
                    ]
                );
            }
        }
    }

    public static function clientAssignmentChanged(Client $client, ?User $oldAssignee = null, ?User $newAssignee = null, ?User $changedBy = null): void
    {
        // Notify old assignee if they're being removed
        if ($oldAssignee && $oldAssignee->id !== $changedBy?->id) {
            self::create(
                $oldAssignee,
                'Client Assignment Removed',
                "Client \"{$client->name}\" has been reassigned from you" . ($changedBy ? " by {$changedBy->first_name} {$changedBy->last_name}" : ""),
                NotificationType::CLIENT_UPDATED,
                [
                    'client_id' => $client->id,
                    'client_name' => $client->name,
                    'action' => 'removed',
                    'changed_by' => $changedBy?->id,
                    'changed_by_name' => $changedBy ? "{$changedBy->first_name} {$changedBy->last_name}" : null,
                ]
            );
        }

        // Notify new assignee if they're being assigned
        if ($newAssignee && $newAssignee->id !== $changedBy?->id) {
            self::create(
                $newAssignee,
                'New Client Assigned',
                "Client \"{$client->name}\" has been assigned to you" . ($changedBy ? " by {$changedBy->first_name} {$changedBy->last_name}" : ""),
                NotificationType::CLIENT_UPDATED,
                [
                    'client_id' => $client->id,
                    'client_name' => $client->name,
                    'action' => 'assigned',
                    'changed_by' => $changedBy?->id,
                    'changed_by_name' => $changedBy ? "{$changedBy->first_name} {$changedBy->last_name}" : null,
                ]
            );
        }
    }
}
