<?php

namespace App\Http\Controllers;

use App\Traits\HasSearchAndFilter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    use HasSearchAndFilter;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Activity::with(['causer', 'subject']);

        // Define searchable fields
        $searchableFields = ['description', 'log_name', 'event'];

        // Define filterable fields with their types
        $filterableFields = [
            'log_name' => ['type' => 'exact'],
            'event' => ['type' => 'exact'],
            'subject_type' => ['type' => 'exact'],
            'causer.first_name' => ['type' => 'like'],
            'created_at' => ['type' => 'date'],
        ];

        // Define sortable fields
        $sortableFields = [
            'description',
            'log_name',
            'event',
            'subject_type',
            'created_at',
            'causer.first_name'
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
        $activities = $query->paginate($request->input('per_page', 15));

        // Transform the data to include human-readable information
        $activities->getCollection()->transform(function ($activity) {
            return [
                'id' => $activity->id,
                'description' => $activity->description,
                'log_name' => $activity->log_name,
                'event' => $activity->event,
                'subject_type' => $activity->subject_type,
                'subject_id' => $activity->subject_id,
                'causer_type' => $activity->causer_type,
                'causer_id' => $activity->causer_id,
                'properties' => $activity->properties,
                'created_at' => $activity->created_at,
                'updated_at' => $activity->updated_at,
                'causer' => $activity->causer ? [
                    'id' => $activity->causer->id,
                    'name' => $activity->causer->first_name . ' ' . $activity->causer->last_name,
                    'email' => $activity->causer->email,
                ] : null,
                'subject' => $activity->subject,
                'human_readable' => $this->getHumanReadableDescription($activity),
            ];
        });

        // Append query parameters to pagination links
        $activities->appends($request->query());

        return Inertia::render('admin/activity-logs/activity-logs-page', [
            'activities' => $activities,
            'filters' => [
                'search' => $request->input('search'),
                'filter' => $request->input('filter', []),
                'sort_by' => $request->input('sort_by', 'created_at'),
                'sort_direction' => $request->input('sort_direction', 'desc'),
            ]
        ]);
    }

    /**
     * Generate human-readable description for activity
     */
    private function getHumanReadableDescription(Activity $activity): string
    {
        $causer = $activity->causer;
        $subject = $activity->subject;
        
        $causerName = $causer ? ($causer->first_name . ' ' . $causer->last_name) : 'System';
        $subjectName = $this->getSubjectName($subject, $activity->subject_type);
        $action = $this->getActionText($activity->event);
        
        $timestamp = $activity->created_at->format('Y-m-d H:i A');
        
        return "{$causerName} {$action} {$subjectName} at {$timestamp}";
    }

    /**
     * Get subject name based on model type
     */
    private function getSubjectName($subject, string $subjectType): string
    {
        if (!$subject) {
            return class_basename($subjectType) . ' (deleted)';
        }

        switch ($subjectType) {
            case 'App\\Models\\User':
                return "User \"{$subject->first_name} {$subject->last_name}\"";
            case 'App\\Models\\Client':
                return "Client \"{$subject->name}\"";
            case 'App\\Models\\Project':
                return "Project \"{$subject->title}\"";
            case 'App\\Models\\Task':
                return "Task \"{$subject->title}\"";
            default:
                return class_basename($subjectType);
        }
    }

    /**
     * Convert event to human-readable action
     */
    private function getActionText(string $event): string
    {
        return match($event) {
            'created' => 'created',
            'updated' => 'updated',
            'deleted' => 'deleted',
            'restored' => 'restored',
            default => $event,
        };
    }
}
