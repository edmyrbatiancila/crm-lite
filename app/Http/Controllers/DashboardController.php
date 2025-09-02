<?php

namespace App\Http\Controllers;

use App\Enums\ProjectStatus;
use App\Enums\TaskStatus;
use App\Models\Client;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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
        
        // Previous month client statistics
        $previousMonth = Carbon::now()->subMonth();
        $previousMonthStart = $previousMonth->copy()->startOfMonth();
        $previousMonthEnd = $previousMonth->copy()->endOfMonth();
        $newClientsPreviousMonth = Client::whereBetween('created_at', [$previousMonthStart, $previousMonthEnd])->count();

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

        $user = Auth::user();
        
        $userRole = $user->role ?? 'user';
        if ($userRole === 'admin' || $userRole === 'administrator') {
            $today = Carbon::today();
            $adminData = [
                'stats' => [
                    'newUsersToday' => User::whereDate('created_at', $today)->count(),
                    'newClientsToday' => Client::whereDate('created_at', $today)->count(),
                    'newProjectsToday' => Project::whereDate('created_at', $today)->count(),
                    'newTasksToday' => Task::whereDate('created_at', $today)->count(),
                    'totalUsers' => $totalUsers,
                    'totalClients' => $totalClients,
                    'totalProjects' => $totalProjects,
                    'totalTasks' => Task::count(),
                ],
                'recentUpdates' => $this->getRecentUpdates()
            ];
            return Inertia::render('dashboard', [
                'stats' => [
                    'clients' => [
                        'total' => $totalClients,
                        'newThisMonth' => $newClientsThisMonth,
                        'previousMonth' => $newClientsPreviousMonth,
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
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'role' => $user->role ?? 'user',
                    'first_login_at' => $user->first_login_at?->toISOString(),
                    'last_login_at' => $user->last_login_at?->toISOString(),
                    'created_at' => $user->created_at->toISOString(),
                ],
                'adminData' => $adminData,
            ]);
        } else {
            // User-specific dashboard data
            $userId = $user->id;
            $clientsCount = Client::where('assigned_to', $userId)->count();
            $userTasks = Task::where('user_id', $userId);
            $userProjects = Project::whereHas('tasks', function($q) use ($userId) {
                $q->where('user_id', $userId);
            });

            // Task status breakdown for this user
            $taskStatuses = [
                'pending', 'in_progress', 'closed', 'waiting_client', 'blocked', 'open'
            ];
            $userTasksByStatus = [];
            foreach ($taskStatuses as $status) {
                $userTasksByStatus[$status] = (clone $userTasks)->where('status', $status)->count();
            }

            // Project status breakdown for this user
            $projectStatuses = [
                'open', 'in_progress', 'blocked', 'cancelled', 'completed'
            ];
            $userProjectsByStatus = [];
            foreach ($projectStatuses as $status) {
                $userProjectsByStatus[$status] = (clone $userProjects)->where('status', $status)->count();
            }

            return Inertia::render('user-dashboard', [
                'stats' => [
                    'clients' => $clientsCount,
                    'tasks' => $userTasksByStatus,
                    'projects' => $userProjectsByStatus,
                ],
                'user' => [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'role' => $user->role ?? 'user',
                ],
                'taskStatusLabels' => [
                    ['value' => 'pending', 'label' => 'Pending'],
                    ['value' => 'in_progress', 'label' => 'In Progress'],
                    ['value' => 'closed', 'label' => 'Closed'],
                    ['value' => 'waiting_client', 'label' => 'Waiting for Client'],
                    ['value' => 'blocked', 'label' => 'Blocked'],
                    ['value' => 'open', 'label' => 'Open'],
                ],
                'projectStatusLabels' => [
                    ['value' => 'open', 'label' => 'Open'],
                    ['value' => 'in_progress', 'label' => 'In Progress'],
                    ['value' => 'blocked', 'label' => 'Blocked'],
                    ['value' => 'cancelled', 'label' => 'Cancelled'],
                    ['value' => 'completed', 'label' => 'Completed'],
                ],
            ]);
        }
    }

    private function getRecentUpdates()
    {
        $recentUpdates = collect();
        $today = Carbon::today();
        $lastWeek = Carbon::now()->subWeek();

        // Recent users
        $recentUsers = User::where('created_at', '>=', $lastWeek)
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'type' => 'user',
                    'title' => 'New User Registered',
                    'description' => "{$user->first_name} {$user->last_name} joined the system",
                    'created_at' => $user->created_at->toISOString(),
                    'user_name' => "{$user->first_name} {$user->last_name}",
                ];
            });

        // Recent clients
        $recentClients = Client::where('created_at', '>=', $lastWeek)
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($client) {
                return [
                    'id' => $client->id,
                    'type' => 'client',
                    'title' => 'New Client Added',
                    'description' => "Client '{$client->name}' was added to the system",
                    'created_at' => $client->created_at->toISOString(),
                ];
            });

        // Recent projects
        $recentProjects = Project::where('created_at', '>=', $lastWeek)
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'type' => 'project',
                    'title' => 'New Project Created',
                    'description' => "Project '{$project->name}' was created",
                    'created_at' => $project->created_at->toISOString(),
                    'status' => $project->status->value,
                ];
            });

        // Recent tasks
        $recentTasks = Task::where('created_at', '>=', $lastWeek)
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($task) {
                return [
                    'id' => $task->id,
                    'type' => 'task',
                    'title' => 'New Task Created',
                    'description' => "Task '{$task->title}' was created",
                    'created_at' => $task->created_at->toISOString(),
                    'status' => $task->status->value,
                ];
            });

        // Merge and sort all updates
        $allUpdates = $recentUpdates
            ->concat($recentUsers)
            ->concat($recentClients)
            ->concat($recentProjects)
            ->concat($recentTasks)
            ->sortByDesc('created_at')
            ->take(10)
            ->values();

        return $allUpdates;
    }
}
