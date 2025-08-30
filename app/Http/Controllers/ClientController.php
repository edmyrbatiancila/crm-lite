<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Models\Client;
use App\Models\User;
use App\Services\NotificationService;
use App\Traits\HasSearchAndFilter;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        
        $currentUser = Auth::user();
        
        // If user is admin, they can assign to any user except themselves
        // If user is regular user, they can only assign to themselves
        if ($currentUser->role === 'admin') {
            $users = User::select('id', 'first_name', 'last_name')
                ->where('id', '!=', $currentUser->id) // Exclude admin from assignment options
                ->get();
        } else {
            // Regular users can only assign clients to themselves
            $users = User::select('id', 'first_name', 'last_name')
                ->where('id', $currentUser->id)
                ->get();
        }

        return Inertia::render('admin/client/client-form-page', [
            'users' => $users,
            'currentUser' => [
                'id' => $currentUser->id,
                'role' => $currentUser->role ?? 'user',
                'canAssignToOthers' => $currentUser->role === 'admin'
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ClientRequest $request, Client $client)
    {
        $this->authorize('create', Client::class);

        $currentUser = Auth::user();
        $validatedData = $request->validated();

        // If user is not admin and trying to assign to someone else, override assignment
        if ($currentUser->role !== 'admin' && $validatedData['assigned_to'] != $currentUser->id) {
            $validatedData['assigned_to'] = $currentUser->id;
        }

        // If user is admin and trying to assign to themselves, this should not be allowed
        if ($currentUser->role === 'admin' && $validatedData['assigned_to'] == $currentUser->id) {
            return redirect()->back()->withErrors(['assigned_to' => 'Admins cannot assign clients to themselves.']);
        }

        $client = Client::create($validatedData);

        // Send notification to assigned user if admin created the client for someone else
        if ($currentUser->role === 'admin' && $validatedData['assigned_to'] && $validatedData['assigned_to'] != $currentUser->id) {
            $assignedUser = User::find($validatedData['assigned_to']);
            if ($assignedUser) {
                NotificationService::clientAssignmentChanged($client, null, $assignedUser, $currentUser);
            }
        }

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
        
        $currentUser = Auth::user();
        
        // If user is admin, they can assign to any user except themselves
        // If user is regular user, they can only assign to themselves
        if ($currentUser->role === 'admin') {
            $users = User::select('id', 'first_name', 'last_name')
                ->where('id', '!=', $currentUser->id) // Exclude admin from assignment options
                ->get();
        } else {
            // Regular users can only assign clients to themselves
            $users = User::select('id', 'first_name', 'last_name')
                ->where('id', $currentUser->id)
                ->get();
        }

        return Inertia::render('admin/client/client-form-page', [
            'users' => $users,
            'client' => $client,
            'currentUser' => [
                'id' => $currentUser->id,
                'role' => $currentUser->role ?? 'user',
                'canAssignToOthers' => $currentUser->role === 'admin'
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ClientRequest $request, Client $client)
    {
        $this->authorize('update', $client);

        $currentUser = Auth::user();
        $validatedData = $request->validated();

        // If user is not admin and trying to assign to someone else, override assignment
        if ($currentUser->role !== 'admin' && $validatedData['assigned_to'] != $currentUser->id) {
            $validatedData['assigned_to'] = $currentUser->id;
        }

        // If user is admin and trying to assign to themselves, this should not be allowed
        if ($currentUser->role === 'admin' && $validatedData['assigned_to'] == $currentUser->id) {
            return redirect()->back()->withErrors(['assigned_to' => 'Admins cannot assign clients to themselves.']);
        }

        // Track changes for notifications
        $originalClient = $client->getOriginal();
        $changes = [];
        $assignmentChanged = false;
        $oldAssignee = null;
        $newAssignee = null;

        // Check for field changes
        $trackableFields = ['name', 'email', 'phone', 'mobile_no', 'address', 'notes'];
        foreach ($trackableFields as $field) {
            if (isset($validatedData[$field]) && $originalClient[$field] !== $validatedData[$field]) {
                $changes[$field] = [
                    'old' => $originalClient[$field],
                    'new' => $validatedData[$field]
                ];
            }
        }

        // Check for assignment changes
        if (isset($validatedData['assigned_to']) && $originalClient['assigned_to'] != $validatedData['assigned_to']) {
            $assignmentChanged = true;
            $oldAssignee = $originalClient['assigned_to'] ? User::find($originalClient['assigned_to']) : null;
            $newAssignee = $validatedData['assigned_to'] ? User::find($validatedData['assigned_to']) : null;
            
            $changes['assigned_to'] = [
                'old' => $originalClient['assigned_to'],
                'new' => $validatedData['assigned_to']
            ];
        }

        // Update the client
        $client->update($validatedData);

        // Send notifications for general updates (excluding assignment changes)
        if (!empty($changes) && !$assignmentChanged) {
            NotificationService::clientUpdated($client, $currentUser, $changes);
        } elseif (!empty($changes) && $assignmentChanged) {
            // Send notifications for both updates and assignment change
            $nonAssignmentChanges = array_filter($changes, function($key) {
                return $key !== 'assigned_to';
            }, ARRAY_FILTER_USE_KEY);
            
            if (!empty($nonAssignmentChanges)) {
                NotificationService::clientUpdated($client, $currentUser, $nonAssignmentChanges);
            }
        }

        // Send assignment change notifications
        if ($assignmentChanged) {
            NotificationService::clientAssignmentChanged($client, $oldAssignee, $newAssignee, $currentUser);
        }

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
