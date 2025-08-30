<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule deadline reminder notifications
Schedule::command('notifications:send-deadline-reminders')
    ->dailyAt('09:00')
    ->description('Send daily deadline reminder notifications');

// You can also add more scheduled tasks here:
// Schedule::command('notifications:send-deadline-reminders')->twiceDaily(9, 17);
// Schedule::command('notifications:send-deadline-reminders')->weekdays();
