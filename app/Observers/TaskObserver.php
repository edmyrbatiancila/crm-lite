<?php

namespace App\Observers;

use App\Models\Task;
use App\Services\NotificationService;

class TaskObserver
{
    /**
     * Handle the Task "created" event.
     */
    public function created(Task $task): void
    {
        // Load relationships
        $task->load(['user', 'project', 'client']);
        
        // Notify assigned user about new task
        if ($task->user) {
            NotificationService::taskAssigned($task, $task->user);
        }
    }

    /**
     * Handle the Task "updated" event.
     */
    public function updated(Task $task): void
    {
        // Load relationships
        $task->load(['user', 'project', 'client']);
        
        // Check if status was changed
        if ($task->isDirty('status')) {
            $oldStatus = $task->getOriginal('status');
            $newStatus = $task->status;
            
            NotificationService::taskStatusChanged($task, $oldStatus, $newStatus);
        }
        
        // Check if user assignment changed
        if ($task->isDirty('user_id') && $task->user) {
            NotificationService::taskAssigned($task, $task->user);
        }
    }

    /**
     * Handle the Task "deleted" event.
     */
    public function deleted(Task $task): void
    {
        // Notify involved users about task deletion
        if ($task->user) {
            NotificationService::create(
                $task->user,
                'Task Deleted',
                "Task \"{$task->title}\" has been deleted",
                \App\Enums\NotificationType::WARNING,
                [
                    'task_title' => $task->title,
                    'deleted_at' => now()->toISOString(),
                ]
            );
        }
    }

    /**
     * Handle the Task "restored" event.
     */
    public function restored(Task $task): void
    {
        //
    }

    /**
     * Handle the Task "force deleted" event.
     */
    public function forceDeleted(Task $task): void
    {
        //
    }
}
