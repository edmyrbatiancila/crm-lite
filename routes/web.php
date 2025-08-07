<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Client Page:
    Route::get('clients', [ClientController::class, 'index'])->name('clients.index'); // index ClientPage
    Route::get('clients/create', [ClientController::class, 'create'])->name('clients.create'); // Page in creating new clients.
    Route::post('/clients/store', [ClientController::class, 'store'])->name('clients.store'); // Store new Client.
    Route::get('clients/{client}/edit', [ClientController::class, 'edit'])->name('clients.edit'); // Editing certain client.
    Route::put('clients/{client}/update', [ClientController::class, 'update'])->name('clients.update'); // Updating certian client.
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
