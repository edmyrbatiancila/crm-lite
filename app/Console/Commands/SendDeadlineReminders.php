<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\NotificationService;

class SendDeadlineReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:send-deadline-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send deadline reminder notifications for upcoming tasks and projects';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Sending deadline reminder notifications...');
        
        try {
            // Send deadline reminders using the NotificationService
            NotificationService::sendDeadlineReminders();
            
            $this->info('Deadline reminder notifications sent successfully!');
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Failed to send deadline reminders: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
