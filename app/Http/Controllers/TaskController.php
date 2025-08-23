<?php

namespace App\Http\Controllers;

use App\Enums\ModeStatus;
use App\Enums\TaskStatus;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Client;
use App\Models\Project;
use App\Models\User;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::with(['user', 'client', 'project'])->latest()->paginate(10);

        return Inertia::render('tasks/tasks-page', [
            'tasks' => $tasks
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::select(['id', 'first_name', 'last_name'])->get();
        $clients = Client::select(['id', 'name'])->get();
        $projects = Project::select(['id', 'title'])->get();
        $mode = ModeStatus::CREATE;

        $taskStatuses = collect(TaskStatus::cases())->map(function ($status) {
            return [
                'value' => $status->value,
                'label' => ucfirst(str_replace('_', ' ', $status->value))
            ];
        });

        return Inertia::render('tasks/tasks-creation-page', [
            'users' => $users,
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
        $users = User::select(['id', 'first_name', 'last_name'])->get();
        $clients = Client::select(['id', 'name'])->get();
        $projects = Project::select(['id', 'title'])->get();
        $mode = ModeStatus::EDIT;

        $taskStatuses = collect(TaskStatus::cases())->map(function ($status) {
            return [
                'value' => $status->value,
                'label' => ucfirst(str_replace('_', ' ', $status->value))
            ];
        });

        return Inertia::render('tasks/tasks-creation-page', [
            'task' => $task,
            'users' => $users,
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
