<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Users Page:
    Route::get('/users', [UserController::class, 'index'])->name('users.index'); // Index page for Users.
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users/store', [UserController::class, 'store'])->name('users.store'); // Store new User.
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit'); // Editing certain user.
    Route::put('/users/{user}/update', [UserController::class, 'update'])->name('users.update'); // Updating certain user.

    // Client Page:
    Route::get('clients', [ClientController::class, 'index'])->name('clients.index'); // index ClientPage
    Route::get('clients/create', [ClientController::class, 'create'])->name('clients.create'); // Page in creating new clients.
    Route::post('/clients/store', [ClientController::class, 'store'])->name('clients.store'); // Store new Client.
    Route::get('clients/{client}/edit', [ClientController::class, 'edit'])->name('clients.edit'); // Editing certain client.
    Route::put('clients/{client}/update', [ClientController::class, 'update'])->name('clients.update'); // Updating certian client.
    Route::delete('/clients/{id}', [ClientController::class, 'destroy'])->name('clients.destroy'); // deleting client.

    // Leads Page:
    Route::get('leads', [LeadController::class, 'index'])->name('leads.index'); // index page for Leads.
    Route::get('leads/create', [LeadController::class, 'create'])->name('leads.create'); // Page in creating new leads.
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
