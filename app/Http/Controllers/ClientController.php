<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Models\Client;
use App\Models\User;
use App\Traits\HasSearchAndFilter;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    use AuthorizesRequests, HasSearchAndFilter;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Client::class);
        
        $query = Client::with(['leads', 'contacts', 'assignedTo']);

        // Define searchable fields
        $searchableFields = ['name', 'email', 'phone', 'mobile_no'];

        // Define filterable fields with their types
        $filterableFields = [
            'status' => ['type' => 'exact'],
            'industry' => ['type' => 'exact'],
            'company_size' => ['type' => 'exact'],
            'assignedTo.first_name' => ['type' => 'like'],
            'created_at' => ['type' => 'date'],
        ];

        // Define sortable fields
        $sortableFields = [
            'name', 
            'email', 
            'phone', 
            'mobile_no',
            'created_at', 
            'updated_at',
            'assignedTo.first_name'
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
        $clients = $query->paginate($request->input('per_page', 10));

        // Append query parameters to pagination links
        $clients->appends($request->query());

        return Inertia::render('admin/client/client-page', [
            'clients' => $clients,
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
        $this->authorize('create', Client::class);
        
        $users = User::select('id', 'first_name')->get();

        return Inertia::render('admin/client/client-form-page', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ClientRequest $request, Client $client)
    {
        $this->authorize('create', Client::class);

        Client::create($request->validated());

        return redirect()->route('clients.index')->with('success', 'Client successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        $this->authorize('update', $client);
        
        $users = User::select('id', 'first_name')->get();

        return Inertia::render('admin/client/client-form-page', [
            'users' => $users,
            'client' => $client,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ClientRequest $request, Client $client)
    {
        $this->authorize('update', $client);

        $client->update($request->validated());

        return redirect()->route('clients.index')->with('success', 'Client successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $this->authorize('delete', $client);
        
        $client->delete();

        return redirect()->route('clients.index')->with('success', 'Client successfully deleted');
    }
}
