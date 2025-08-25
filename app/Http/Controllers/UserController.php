<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Traits\HasSearchAndFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class UserController extends Controller
{
    use AuthorizesRequests, HasSearchAndFilter;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);
        
        $query = User::query();

        // Define searchable fields
        $searchableFields = ['first_name', 'last_name', 'email'];

        // Define filterable fields with their types
        $filterableFields = [
            'role' => ['type' => 'exact'],
            'status' => ['type' => 'exact'],
            'created_at' => ['type' => 'date'],
            'department' => ['type' => 'like'],
            'email_verified_at' => ['type' => 'boolean'],
        ];

        // Define sortable fields
        $sortableFields = [
            'first_name', 
            'last_name', 
            'email', 
            'created_at', 
            'updated_at',
            'email_verified_at'
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
        $users = $query->paginate($request->input('per_page', 10));

        // Append query parameters to pagination links
        $users->appends($request->query());

        return Inertia::render('users/users-page', [
            'users' => $users,
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
        $this->authorize('create', User::class);
        
        $mode = 'create';
        return Inertia::render('users/users-creation-page', [
            'mode' => $mode
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $this->authorize('create', User::class);
        User::create($request->validated());

        return redirect()->route('users.index')->with('success', 'User successfully created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $this->authorize('update', $user);
        
        $mode = 'edit';
        return Inertia::render('users/users-creation-page', [
            'user' => $user,
            'mode' => $mode
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $this->authorize('update', $user);

        $user->update($request->validated());

        return redirect()->route('users.index')->with('success', 'User successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->authorize('delete', $user);
        
        if (Auth::user()->id === $user->id) {
            return redirect()->route('users.index')->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User successfully deleted');
    }
}
