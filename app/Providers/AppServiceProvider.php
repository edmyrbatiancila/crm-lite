<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
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
        // Register model observers for dynamic notifications
        Task::observe(TaskObserver::class);
        Project::observe(ProjectObserver::class);
        Client::observe(ClientObserver::class);
        User::observe(UserObserver::class);
    }
}
