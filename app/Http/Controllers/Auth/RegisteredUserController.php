<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        try {
            // Create the user
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Assign default user role with error handling
            try {
                $user->assignRole('user');
            } catch (\Exception $roleException) {
                Log::warning('Failed to assign role during registration: ' . $roleException->getMessage(), [
                    'user_id' => $user->id,
                    'email' => $user->email
                ]);
                // Continue without failing - role can be assigned later by admin
            }

            // Fire the registered event (this will trigger UserObserver)
            try {
                event(new Registered($user));
            } catch (\Exception $eventException) {
                Log::warning('Failed to fire registered event: ' . $eventException->getMessage(), [
                    'user_id' => $user->id,
                    'email' => $user->email
                ]);
                // Continue without failing - notifications are not critical for registration
            }

            // Login the user
            Auth::login($user);

            return redirect()->intended(route('dashboard', absolute: false));
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('User registration failed: ' . $e->getMessage(), [
                'email' => $request->email,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'exception' => $e->getTraceAsString()
            ]);

            // Return with error message
            return back()->withErrors([
                'email' => 'Registration failed. Please try again later.'
            ])->withInput($request->except('password', 'password_confirmation'));
        }
    }
}
