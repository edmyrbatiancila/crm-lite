<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class UserController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $this->authorize('viewAny', User::class);
        
        // $users = User::select('id', 'first_name', 'last_name', 'email', 'created_at')->latest()->get();
        $users = User::latest()->paginate(10);

        return Inertia::render('users/users-page', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $this->authorize('create', User::class);
        
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
        // $this->authorize('create', User::class);
        
        // $request->validate([
        //     'first_name' => 'required|string|max:255',
        //     'last_name' => 'required|string|max:255',
        //     'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        //     'password' => 'required|string|min:8',
        // ]);

        // User::create([
        //     'first_name' => $request->first_name,
        //     'last_name' => $request->last_name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->password),
        // ]);
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
        // $this->authorize('update', $user);
        
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
        // $this->authorize('update', $user);
        
        // $rules = [
        //     'first_name' => 'required|string|max:255',
        //     'last_name' => 'required|string|max:255',
        //     'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
        // ];

        // // Only validate password if it's provided
        // if ($request->filled('password')) {
        //     $rules['password'] = 'string|min:8';
        // }

        // $validated = $request->validate($rules);

        // $updateData = [
        //     'first_name' => $validated['first_name'],
        //     'last_name' => $validated['last_name'],
        //     'email' => $validated['email'],
        // ];

        // // Only update password if provided
        // if ($request->filled('password')) {
        //     $updateData['password'] = Hash::make($validated['password']);
        // }

        $user->update($request->validated());

        return redirect()->route('users.index')->with('success', 'User successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        // $this->authorize('delete', $user);
        
        if (Auth::user()->id === $user->id) {
            return redirect()->route('users.index')->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('users.index')->with('success', 'User successfully deleted');
    }
}
