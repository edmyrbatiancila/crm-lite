<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Client;
use App\Models\Project;
use App\Models\Task;
use App\Enums\TaskStatus;
use Carbon\Carbon;

class DashboardTestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Users
        $users = [
            ['first_name' => 'John', 'last_name' => 'Doe', 'email' => 'john@example.com', 'email_verified_at' => now(), 'password' => bcrypt('password'), 'created_at' => Carbon::now()->subMonths(6)],
            ['first_name' => 'Jane', 'last_name' => 'Smith', 'email' => 'jane@example.com', 'email_verified_at' => now(), 'password' => bcrypt('password'), 'created_at' => Carbon::now()->subMonths(4)],
            ['first_name' => 'Mike', 'last_name' => 'Johnson', 'email' => 'mike@example.com', 'email_verified_at' => now(), 'password' => bcrypt('password'), 'created_at' => Carbon::now()->subMonths(2)],
            ['first_name' => 'Sarah', 'last_name' => 'Wilson', 'email' => 'sarah@example.com', 'email_verified_at' => now(), 'password' => bcrypt('password'), 'created_at' => Carbon::now()->subMonth()],
            ['first_name' => 'David', 'last_name' => 'Brown', 'email' => 'david@example.com', 'email_verified_at' => now(), 'password' => bcrypt('password'), 'created_at' => Carbon::now()->subWeeks(2)],
        ];

        foreach ($users as $user) {
            User::firstOrCreate(['email' => $user['email']], $user);
        }

        // Create Clients
        $clients = [
            ['name' => 'Tech Corp', 'email' => 'contact@techcorp.com', 'phone' => '123-456-7890', 'created_at' => Carbon::now()->subMonths(5)],
            ['name' => 'Design Studio', 'email' => 'hello@designstudio.com', 'phone' => '234-567-8901', 'created_at' => Carbon::now()->subMonths(3)],
            ['name' => 'Marketing Plus', 'email' => 'info@marketingplus.com', 'phone' => '345-678-9012', 'created_at' => Carbon::now()->subMonths(2)],
            ['name' => 'Startup Inc', 'email' => 'team@startup.com', 'phone' => '456-789-0123', 'created_at' => Carbon::now()->subMonth()],
            ['name' => 'Enterprise Ltd', 'email' => 'contact@enterprise.com', 'phone' => '567-890-1234', 'created_at' => Carbon::now()->subWeeks(2)],
            ['name' => 'Local Business', 'email' => 'info@localbiz.com', 'phone' => '678-901-2345', 'created_at' => Carbon::now()->subWeek()],
        ];

        foreach ($clients as $client) {
            Client::firstOrCreate(['email' => $client['email']], $client);
        }

        // Create Projects
        $projects = [
            ['name' => 'Website Redesign', 'description' => 'Complete website overhaul', 'status' => 'completed', 'client_id' => 1, 'created_at' => Carbon::now()->subMonths(4)],
            ['name' => 'Mobile App', 'description' => 'iOS and Android app development', 'status' => 'ongoing', 'client_id' => 2, 'created_at' => Carbon::now()->subMonths(3)],
            ['name' => 'Marketing Campaign', 'description' => 'Social media marketing', 'status' => 'ongoing', 'client_id' => 3, 'created_at' => Carbon::now()->subMonths(2)],
            ['name' => 'E-commerce Platform', 'description' => 'Online store development', 'status' => 'pending', 'client_id' => 4, 'created_at' => Carbon::now()->subMonth()],
            ['name' => 'Brand Identity', 'description' => 'Logo and brand guidelines', 'status' => 'completed', 'client_id' => 5, 'created_at' => Carbon::now()->subWeeks(3)],
            ['name' => 'SEO Optimization', 'description' => 'Search engine optimization', 'status' => 'ongoing', 'client_id' => 6, 'created_at' => Carbon::now()->subWeeks(2)],
        ];

        foreach ($projects as $project) {
            if (Client::find($project['client_id'])) {
                Project::firstOrCreate(['name' => $project['name']], $project);
            }
        }

        // Create Tasks
        $tasks = [
            ['title' => 'Setup Database', 'description' => 'Configure database schema', 'status' => TaskStatus::CLOSED->value, 'project_id' => 2, 'user_id' => 1, 'client_id' => 4, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subMonths(3)],
            ['title' => 'Design UI', 'description' => 'Create user interface designs', 'status' => TaskStatus::CLOSED->value, 'project_id' => 2, 'user_id' => 2, 'client_id' => 4, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subMonths(3)],
            ['title' => 'Implement Authentication', 'description' => 'User login and registration', 'status' => TaskStatus::IN_PROGRESS->value, 'project_id' => 3, 'user_id' => 1, 'client_id' => 5, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subMonths(2)],
            ['title' => 'Create API', 'description' => 'RESTful API development', 'status' => TaskStatus::IN_PROGRESS->value, 'project_id' => 3, 'user_id' => 3, 'client_id' => 5, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subMonths(2)],
            ['title' => 'Content Creation', 'description' => 'Write blog posts and content', 'status' => TaskStatus::OPEN->value, 'project_id' => 4, 'user_id' => 4, 'client_id' => 6, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subMonth()],
            ['title' => 'Social Media Setup', 'description' => 'Setup social media accounts', 'status' => TaskStatus::CLOSED->value, 'project_id' => 4, 'user_id' => 4, 'client_id' => 6, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subMonth()],
            ['title' => 'Payment Integration', 'description' => 'Integrate payment gateway', 'status' => TaskStatus::PENDING->value, 'project_id' => 5, 'user_id' => 1, 'client_id' => 7, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subWeeks(3)],
            ['title' => 'Logo Design', 'description' => 'Create company logo', 'status' => TaskStatus::CLOSED->value, 'project_id' => 6, 'user_id' => 2, 'client_id' => 8, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subWeeks(2)],
            ['title' => 'Keyword Research', 'description' => 'Research target keywords', 'status' => TaskStatus::IN_PROGRESS->value, 'project_id' => 7, 'user_id' => 5, 'client_id' => 9, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subWeek()],
            ['title' => 'On-page SEO', 'description' => 'Optimize website pages', 'status' => TaskStatus::WAITING_CLIENT->value, 'project_id' => 7, 'user_id' => 5, 'client_id' => 9, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subWeek()],
            ['title' => 'Database Optimization', 'description' => 'Optimize database queries', 'status' => TaskStatus::BLOCKED->value, 'project_id' => 2, 'user_id' => 1, 'client_id' => 4, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subDays(5)],
            ['title' => 'User Testing', 'description' => 'Conduct user acceptance testing', 'status' => TaskStatus::OPEN->value, 'project_id' => 3, 'user_id' => 2, 'client_id' => 5, 'deadline_at' => Carbon::now()->addDays(30), 'created_at' => Carbon::now()->subDays(3)],
        ];

        foreach ($tasks as $task) {
            if (Project::find($task['project_id']) && User::find($task['user_id']) && Client::find($task['client_id'])) {
                Task::firstOrCreate(['title' => $task['title']], $task);
            }
        }

        $this->command->info('Dashboard test data seeded successfully!');
    }
}
