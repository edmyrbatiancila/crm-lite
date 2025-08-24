<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Models\Client;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Client::class);
        
        $clients = Client::with(['leads', 'contacts', 'assignedTo'])->latest()->paginate(10);

        return Inertia::render('admin/client/client-page', [
            'clients' => $clients
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
