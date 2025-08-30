<?php

namespace App\Observers;

use App\Models\Client;
use App\Services\NotificationService;

class ClientObserver
{
    /**
     * Handle the Client "created" event.
     */
    public function created(Client $client): void
    {
        // Load relationships
        $client->load(['user']);
        
        // Notify about new client assignment
        if ($client->user) {
            NotificationService::clientAssigned($client, $client->user);
        }
    }

    /**
     * Handle the Client "updated" event.
     */
    public function updated(Client $client): void
    {
        // Load relationships
        $client->load(['user']);
        
        // Check if user assignment changed
        if ($client->isDirty('user_id') && $client->user) {
            NotificationService::clientAssigned($client, $client->user);
        }
        
        // Check if other important fields changed
        $changedFields = [];
        
        if ($client->isDirty('name')) {
            $changedFields['name'] = [
                'old' => $client->getOriginal('name'),
                'new' => $client->name
            ];
        }
        
        if ($client->isDirty('status')) {
            $changedFields['status'] = [
                'old' => $client->getOriginal('status'),
                'new' => $client->status
            ];
        }
        
        if ($client->isDirty('industry')) {
            $changedFields['industry'] = [
                'old' => $client->getOriginal('industry'),
                'new' => $client->industry
            ];
        }
        
        // Notify if important fields changed (excluding user assignment as it's handled above)
        if (!empty($changedFields) && !$client->isDirty('user_id')) {
            $this->notifyClientUpdated($client, $changedFields);
        }
    }

    /**
     * Handle the Client "deleted" event.
     */
    public function deleted(Client $client): void
    {
        // Notify assigned user about client deletion
        if ($client->user) {
            NotificationService::create(
                $client->user,
                'Client Deleted',
                "Client \"{$client->name}\" has been deleted",
                \App\Enums\NotificationType::WARNING,
                [
                    'client_name' => $client->name,
                    'deleted_at' => now()->toISOString(),
                ]
            );
        }
    }

    /**
     * Handle the Client "restored" event.
     */
    public function restored(Client $client): void
    {
        //
    }

    /**
     * Handle the Client "force deleted" event.
     */
    public function forceDeleted(Client $client): void
    {
        //
    }

    /**
     * Notify users about client updates
     */
    private function notifyClientUpdated(Client $client, array $changedFields): void
    {
        if (!$client->user) {
            return;
        }
        
        $changes = collect($changedFields)->map(function ($change, $field) {
            return ucfirst($field) . " changed from \"{$change['old']}\" to \"{$change['new']}\"";
        })->join(', ');
        
        NotificationService::create(
            $client->user,
            'Client Updated',
            "Client \"{$client->name}\" has been updated: {$changes}",
            \App\Enums\NotificationType::INFO,
            [
                'client_id' => $client->id,
                'client_name' => $client->name,
                'changes' => $changedFields,
                'updated_at' => now()->toISOString(),
            ]
        );
    }
}
