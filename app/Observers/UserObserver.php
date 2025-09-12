<?php

namespace App\Observers;

use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Support\Facades\Log;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        try {
            // Send welcome notification to the newly created user
            NotificationService::userWelcome($user);
            
            // Notify admins about new user registration
            NotificationService::newUserRegistered($user);
        } catch (\Exception $e) {
            // Log the error but don't fail the user creation
            Log::error('Failed to create user notifications: ' . $e->getMessage(), [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'exception' => $e->getTraceAsString()
            ]);
        }
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        // Check if important profile fields were updated
        $changedFields = [];
        
        if ($user->isDirty('first_name') || $user->isDirty('last_name')) {
            $changedFields['name'] = [
                'old' => $user->getOriginal('first_name') . ' ' . $user->getOriginal('last_name'),
                'new' => $user->first_name . ' ' . $user->last_name
            ];
        }
        
        if ($user->isDirty('email')) {
            $changedFields['email'] = [
                'old' => $user->getOriginal('email'),
                'new' => $user->email
            ];
        }
        
        // Notify user about profile updates
        if (!empty($changedFields)) {
            $this->notifyProfileUpdated($user, $changedFields);
        }
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        // Notify admins about user account deletion
        NotificationService::userAccountDeleted($user);
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        // Notify user that their account has been restored
        NotificationService::create(
            $user,
            'Account Restored',
            'Your account has been successfully restored. Welcome back!',
            \App\Enums\NotificationType::SUCCESS,
            [
                'restored_at' => now()->toISOString(),
                'action' => 'account_restored'
            ]
        );
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }

    /**
     * Notify user about profile updates
     */
    private function notifyProfileUpdated(User $user, array $changedFields): void
    {
        $changes = collect($changedFields)->map(function ($change, $field) {
            return ucfirst($field) . " updated";
        })->join(', ');
        
        NotificationService::create(
            $user,
            'Profile Updated',
            "Your profile has been updated: {$changes}",
            \App\Enums\NotificationType::INFO,
            [
                'user_id' => $user->id,
                'changes' => $changedFields,
                'updated_at' => now()->toISOString(),
            ]
        );
    }
}
