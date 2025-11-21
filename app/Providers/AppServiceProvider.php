<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use App\Models\Task;
use App\Models\Project;
use App\Models\Client;
use App\Models\User;
use App\Observers\TaskObserver;
use App\Observers\ProjectObserver;
use App\Observers\ClientObserver;
use App\Observers\UserObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production or when APP_URL is HTTPS
        if (app()->environment('production') || 
            (config('app.url') && str_starts_with(config('app.url'), 'https://')) ||
            (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
            (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
        ) {
            URL::forceScheme('https');
            URL::forceRootUrl(config('app.url'));
        }
        
        // Register model observers for dynamic notifications
        Task::observe(TaskObserver::class);
        Project::observe(ProjectObserver::class);
        Client::observe(ClientObserver::class);
        User::observe(UserObserver::class);
    }
}
