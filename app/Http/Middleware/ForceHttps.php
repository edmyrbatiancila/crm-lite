<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceHttps
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only enforce HTTPS in production or when explicitly configured
        if (app()->environment('production') || config('app.force_https')) {
            // Check if the request is not secure and not already HTTPS
            if (!$request->isSecure() && 
                !str_starts_with($request->url(), 'https://') &&
                !$request->header('X-Forwarded-Proto') === 'https') {
                
                // Redirect to HTTPS version
                return redirect()->secure($request->getRequestUri(), 301);
            }
        }

        return $next($request);
    }
}