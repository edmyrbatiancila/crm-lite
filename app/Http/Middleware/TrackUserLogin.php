<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Services\NotificationService;

class TrackUserLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only track for authenticated users
        if (Auth::check()) {
            /** @var \App\Models\User $user */
            $user = Auth::user();
            
            // Check if this is the user's first login
            if (is_null($user->first_login_at)) {
                // Update first login timestamp
                $user->update([
                    'first_login_at' => now(),
                    'last_login_at' => now(),
                ]);
                
                // Send first login welcome notification
                NotificationService::firstLoginWelcome($user);
            } else {
                // Update last login timestamp
                $user->update([
                    'last_login_at' => now(),
                ]);
            }
        }

        return $response;
    }
}
