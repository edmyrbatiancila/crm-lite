<?php

namespace App\Observers;

use App\Models\Project;
use App\Services\NotificationService;

class ProjectObserver
{
    /**
     * Handle the Project "created" event.
     */
    public function created(Project $project): void
    {
        // Load relationships
        $project->load(['client', 'user']);
        
        // Notify team members about new project
        NotificationService::projectCreated($project);
    }

    /**
     * Handle the Project "updated" event.
     */
    public function updated(Project $project): void
    {
        // Load relationships
        $project->load(['client', 'user']);
        
        // Check if status was changed
        if ($project->isDirty('status')) {
            $oldStatus = $project->getOriginal('status');
            $newStatus = $project->status;
            
            NotificationService::projectStatusChanged($project, $oldStatus, $newStatus);
        }
        
        // Check if other important fields changed
        $changedFields = [];
        
        if ($project->isDirty('name')) {
            $changedFields['name'] = [
                'old' => $project->getOriginal('name'),
                'new' => $project->name
            ];
        }
        
        if ($project->isDirty('deadline')) {
            $changedFields['deadline'] = [
                'old' => $project->getOriginal('deadline'),
                'new' => $project->deadline
            ];
        }
        
        if ($project->isDirty('budget')) {
            $changedFields['budget'] = [
                'old' => $project->getOriginal('budget'),
                'new' => $project->budget
            ];
        }
        
        // Notify if important fields changed
        if (!empty($changedFields)) {
            $this->notifyProjectUpdated($project, $changedFields);
        }
    }

    /**
     * Handle the Project "deleted" event.
     */
    public function deleted(Project $project): void
    {
        // Notify team members about project deletion
        NotificationService::create(
            $project->user,
            'Project Deleted',
            "Project \"{$project->name}\" has been deleted",
            \App\Enums\NotificationType::WARNING,
            [
                'project_name' => $project->name,
                'deleted_at' => now()->toISOString(),
            ]
        );
    }

    /**
     * Handle the Project "restored" event.
     */
    public function restored(Project $project): void
    {
        //
    }

    /**
     * Handle the Project "force deleted" event.
     */
    public function forceDeleted(Project $project): void
    {
        //
    }

    /**
     * Notify users about project updates
     */
    private function notifyProjectUpdated(Project $project, array $changedFields): void
    {
        $changes = collect($changedFields)->map(function ($change, $field) {
            return ucfirst($field) . " changed from \"{$change['old']}\" to \"{$change['new']}\"";
        })->join(', ');
        
        NotificationService::create(
            $project->user,
            'Project Updated',
            "Project \"{$project->name}\" has been updated: {$changes}",
            \App\Enums\NotificationType::INFO,
            [
                'project_id' => $project->id,
                'project_name' => $project->name,
                'changes' => $changedFields,
                'updated_at' => now()->toISOString(),
            ]
        );
    }
}
