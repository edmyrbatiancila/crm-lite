<?php

namespace App\Http\Controllers;

use App\Enums\ModeStatus;
use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Client;
use App\Models\User;
use App\Traits\HasSearchAndFilter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    use HasSearchAndFilter;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Project::with(['user', 'client']);

        // Define searchable fields
        $searchableFields = ['name', 'description'];

        // Define filterable fields with their types
        $filterableFields = [
            'status' => ['type' => 'exact'],
            'priority' => ['type' => 'exact'],
            'budget' => ['type' => 'range'],
            'start_date' => ['type' => 'date'],
            'end_date' => ['type' => 'date'],
            'user.first_name' => ['type' => 'like'],
            'client.name' => ['type' => 'like'],
            'created_at' => ['type' => 'date'],
        ];

        // Define sortable fields
        $sortableFields = [
            'name', 
            'status',
            'priority',
            'budget',
            'start_date',
            'end_date',
            'created_at', 
            'updated_at',
            'user.first_name',
            'client.name'
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
        $projects = $query->paginate($request->input('per_page', 10));

        // Append query parameters to pagination links
        $projects->appends($request->query());

        return Inertia::render('projects/project-page', [
            'projects' => $projects,
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
        $users = User::select(['id', 'first_name', 'last_name'])->get();
        $clients = Client::select(['id', 'name'])->get();
        $mode = ModeStatus::CREATE;

        // Get project statuses from enum
        $projectStatuses = collect(ProjectStatus::cases())->map(function ($status) {
            return [
                'value' => $status->value,
                'label' => ucfirst(str_replace('_', ' ', $status->value))
            ];
        });

        return Inertia::render('projects/project-creation-page', [
            'users' => $users,
            'clients' => $clients,
            'projectStatuses' => $projectStatuses,
            'mode' => $mode
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        Project::create($request->validated());

        return redirect()->route('projects.index')->with('success', 'Project successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $users = User::select(['id', 'first_name', 'last_name'])->get();
        $clients = Client::select(['id', 'name'])->get();
        $mode = ModeStatus::EDIT;

        // Get project statuses from enum
        $projectStatuses = collect(ProjectStatus::cases())->map(function ($status) {
            return [
                'value' => $status->value,
                'label' => ucfirst(str_replace('_', ' ', $status->value))
            ];
        });

        return Inertia::render('projects/project-creation-page', [
            'project' => $project,
            'users' => $users,
            'clients' => $clients,
            'projectStatuses' => $projectStatuses,
            'mode' => $mode
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

        return redirect()->route('projects.index')->with('success', 'Project successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project successfully deleted');
    }
}
