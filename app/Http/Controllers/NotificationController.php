<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Http\Requests\StoreNotificationRequest;
use App\Http\Requests\UpdateNotificationRequest;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = auth()->user()->customNotifications()
            ->latest()
            ->paginate(15)
            ->through(function ($notification) {
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

        return Inertia::render('notifications/index', [
            'notifications' => $notifications,
        ]);
    }

    public function unread(): Response
    {
        $unreadNotifications = auth()->user()->customNotifications()
            ->where('is_read', false)
            ->latest()
            ->paginate(10);

        return Inertia::render('notifications/unread-notifications', [
            'notifications' => $unreadNotifications
        ]);
    }

    public function markAsRead(Notification $notification)
    {
        // Ensure user can only mark their own notifications as read
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }

        $notification->update(['is_read' => true]);

        return back()->with('success', 'Notification marked as read.');
    }

    public function markAllAsRead()
    {
        auth()->user()->customNotifications()
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return back()->with('success', 'All notifications marked as read.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNotificationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNotificationRequest $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        // Ensure user can only delete their own notifications
        if ($notification->user_id !== auth()->id()) {
            abort(403);
        }

        $notification->delete();

        return back()->with('success', 'Notification deleted');
    }

    public function destroyAll()
    {
        auth()->user()->customNotifications()->delete();

        return back()->with('success', 'All notifications deleted');
    }

    /**
     * Get notification data for header component
     */
    public static function getHeaderData()
    {
        if (!auth()->check()) {
            return [
                'unreadNotifications' => [],
                'unreadCount' => 0,
            ];
        }

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

        return [
            'unreadNotifications' => $unreadNotifications,
            'unreadCount' => $unreadNotifications->count(),
        ];
    }
}
