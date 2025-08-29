<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Enums\TaskStatus;
use App\Models\Client;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get current month and year
        $currentMonth = Carbon::now()->startOfMonth();
        $startOfMonth = $currentMonth->copy();
        $endOfMonth = $currentMonth->copy()->endOfMonth();

        // Client Statistics
        $totalClients = Client::count();
        $newClientsThisMonth = Client::whereBetween('created_at', [$startOfMonth, $endOfMonth])->count();

        // Project Statistics
        $totalProjects = Project::count();
        $openProjects = Project::where('status', ProjectStatus::OPEN)->count();
        $inProgressProjects = Project::where('status', ProjectStatus::IN_PROGRESS)->count();
        $blockedProjects = Project::where('status', ProjectStatus::BLOCKED)->count();
        $cancelledProjects = Project::where('status', ProjectStatus::CANCELLED)->count();
        $completedProjects = Project::where('status', ProjectStatus::COMPLETED)->count();

        // Task Statistics by Status
        $tasksByStatus = [
            'pending' => Task::where('status', TaskStatus::PENDING)->count(),
            'in_progress' => Task::where('status', TaskStatus::IN_PROGRESS)->count(),
            'waiting_client' => Task::where('status', TaskStatus::WAITING_CLIENT)->count(),
            'open' => Task::where('status', TaskStatus::OPEN)->count(),
            'pending' => Task::where('status', TaskStatus::PENDING)->count(),
            'blocked' => Task::where('status', TaskStatus::BLOCKED)->count(),
            'closed' => Task::where('status', TaskStatus::CLOSED)->count()
        ];

        // User Statistics
        $totalUsers = User::count();
        $activeUsers = User::where('updated_at', '>=', Carbon::now()->subDays(30))->count();

        // Monthly data for trends (last 6 months)
        $monthlyData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $monthStart = $month->copy()->startOfMonth();
            $monthEnd = $month->copy()->endOfMonth();
            
            $monthlyData[] = [
                'month' => $month->format('M'),
                'fullMonth' => $month->format('F Y'),
                'clients' => Client::whereBetween('created_at', [$monthStart, $monthEnd])->count(),
                'projects' => Project::whereBetween('created_at', [$monthStart, $monthEnd])->count(),
                'tasks' => Task::whereBetween('created_at', [$monthStart, $monthEnd])->count(),
                'users' => User::whereBetween('created_at', [$monthStart, $monthEnd])->count(),
            ];
        }

        return Inertia::render('dashboard', [
            'stats' => [
                'clients' => [
                    'total' => $totalClients,
                    'newThisMonth' => $newClientsThisMonth,
                    'previousMonth' => Client::whereBetween('created_at', [
                        $startOfMonth->copy()->subMonth(),
                        $startOfMonth->copy()->subMonth()->endOfMonth()
                    ])->count(),
                ],
                'projects' => [
                    'total' => $totalProjects,
                    'open' => $openProjects,
                    'in_progress' => $inProgressProjects,
                    'blocked' => $blockedProjects,
                    'cancelled' => $cancelledProjects,
                    'completed' => $completedProjects,
                ],
                'tasks' => $tasksByStatus,
                'users' => [
                    'total' => $totalUsers,
                    'active' => $activeUsers,
                    'inactive' => $totalUsers - $activeUsers,
                ],
            ],
            'monthlyData' => $monthlyData,
        ]);
    }
}
