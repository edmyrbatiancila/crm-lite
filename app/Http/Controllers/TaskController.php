<?php

namespace App\Http\Controllers;

use App\Enums\ModeStatus;
use App\Enums\RoleEnum;
use App\Enums\TaskStatus;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Client;
use App\Models\Project;
use App\Models\User;
use App\Traits\HasSearchAndFilter;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    use AuthorizesRequests, HasSearchAndFilter;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Task::class);
        
        $query = Task::with(['user', 'client', 'project']);

        // Define searchable fields
        $searchableFields = ['title', 'description'];

        // Define filterable fields with their types
        $filterableFields = [
            'status' => ['type' => 'exact'],
            'priority' => ['type' => 'exact'],
            'category' => ['type' => 'exact'],
            'due_date' => ['type' => 'date'],
            'completed_at' => ['type' => 'date'],
            'user.first_name' => ['type' => 'like'],
            'client.name' => ['type' => 'like'],
            'project.name' => ['type' => 'like'],
            'created_at' => ['type' => 'date'],
        ];

        // Define sortable fields
        $sortableFields = [
            'title', 
            'status',
            'priority',
            'category',
            'due_date',
            'completed_at',
            'created_at', 
            'updated_at',
            'user.first_name',
            'client.name',
            'project.name'
        ];

        // Apply search, filter, and sort
        $query = $this->applySearchAndFilter(
            $query, 
            $request, 
            $searchableFields, 
            $filterableFields, 
            $sortableFields
        );

        // Paginate results
        $tasks = $query->paginate($request->input('per_page', 10));

        // Append query parameters to pagination links
        $tasks->appends($request->query());

        return Inertia::render('tasks/tasks-page', [
            'tasks' => $tasks,
            'filters' => [
                'search' => $request->input('search'),
                'filter' => $request->input('filter', []),
                'sort_by' => $request->input('sort_by', 'created_at'),
                'sort_direction' => $request->input('sort_direction', 'desc'),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Task::class);

        $currentUser = Auth::user();

        // If user is Admin, they can assign to any user except themselves
        // If user is regular user, they can only assign to themselves.
        if ($currentUser->role === 'admin') {
            $users = User::select('id', 'first_name', 'last_name')
                ->where('id', '!=', $currentUser->id)
                ->get();
        } else {
            // Regular users can only assign clients to themselves
            $users = User::select('id', 'first_name', 'last_name')
                ->where('id', $currentUser->id)
                ->get();
        }

        $clients = Client::select(['id', 'name'])->get();
        $projects = Project::select(['id', 'title'])->get();
        $mode = ModeStatus::CREATE->value;

        $taskStatuses = collect(TaskStatus::cases())->map(function ($status) {
            return [
                'value' => $status->value,
                'label' => ucfirst(str_replace('_', ' ', $status->value))
            ];
        });

        return Inertia::render('tasks/tasks-creation-page', [
            'users' => $users,
            'currentUser' => [
                'id' => $currentUser->id,
                'role' => $currentUser->role ?? RoleEnum::USER->value,
                'canAssignToOthers' => $currentUser->role === RoleEnum::ADMIN->value
            ],
            'clients' => $clients,
            'projects' => $projects,
            'taskStatuses' => $taskStatuses,
            'mode' => $mode
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $this->authorize('create', Task::class);
        
        Task::create($request->validated());

        return redirect()->route('tasks.index')->with('success', 'Task successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $this->authorize('update', $task);
        
        $currentUser = Auth::user();

        // If user is Admin, they can assign to any user except themselves
        // If user is regular user, they can only assign to themselves.
        if ($currentUser->role === 'admin') {
            $users = User::select('id', 'first_name', 'last_name')
                ->where('id', '!=', $currentUser->id)
                ->get();
        } else {
            // Regular users can only assign clients to themselves
            $users = User::select('id', 'first_name', 'last_name')
                ->where('id', $currentUser->id)
                ->get();
        }

        $clients = Client::select(['id', 'name'])->get();
        $projects = Project::select(['id', 'title'])->get();
        $mode = ModeStatus::EDIT->value;

        $taskStatuses = collect(TaskStatus::cases())->map(function ($status) {
            return [
                'value' => $status->value,
                'label' => ucfirst(str_replace('_', ' ', $status->value))
            ];
        });

        return Inertia::render('tasks/tasks-creation-page', [
            'task' => $task,
            'users' => $users,
            'currentUser' => [
                'id' => $currentUser->id,
                'role' => $currentUser->role ?? RoleEnum::USER->value,
                'canAssignToOthers' => $currentUser->role === RoleEnum::ADMIN->value
            ],
            'clients' => $clients,
            'projects' => $projects,
            'taskStatuses' => $taskStatuses,
            'mode' => $mode
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);
        
        $task->update($request->validated());

        return redirect()->route('tasks.index')->with('success', 'Task successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        
        $task->delete();

        return redirect()->route('tasks.index')->with('success', 'Task successfully deleted');
    }
}
