<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ShareNotificationData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            $unreadNotifications = auth()->user()->customNotifications()
                ->where('is_read', false)
                ->latest()
                ->limit(5)
                ->get()
                ->map(function ($notification) {
                    return [
                        'id' => $notification->id,
                        'user_id' => $notification->user_id,
                        'title' => $notification->title,
                        'message' => $notification->message,
                        'type' => $notification->type,
                        'data' => $notification->data,
                        'is_read' => $notification->is_read,
                        'created_at' => $notification->created_at,
                        'updated_at' => $notification->updated_at,
                        'formatted_created_at' => $notification->created_at->diffForHumans(),
                    ];
                });

            Inertia::share([
                'unreadNotifications' => $unreadNotifications,
                'unreadCount' => $unreadNotifications->count(),
            ]);
        } else {
            Inertia::share([
                'unreadNotifications' => [],
                'unreadCount' => 0,
            ]);
        }

        return $next($request);
    }
}
