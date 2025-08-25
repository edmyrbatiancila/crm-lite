<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Carbon\Carbon;

trait HasSearchAndFilter
{
    /**
     * Apply search, filter, and sort to a query builder
     *
     * @param Builder $query
     * @param Request $request
     * @param array $searchableFields
     * @param array $filterableFields
     * @param array $sortableFields
     * @return Builder
     */
    protected function applySearchAndFilter(
        Builder $query,
        Request $request,
        array $searchableFields = [],
        array $filterableFields = [],
        array $sortableFields = []
    ): Builder {
        // Apply search
        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchableFields, $searchTerm) {
                foreach ($searchableFields as $field) {
                    if (str_contains($field, '.')) {
                        // Handle relationship fields
                        $parts = explode('.', $field);
                        $relation = $parts[0];
                        $column = $parts[1];
                        $q->orWhereHas($relation, function ($subQuery) use ($column, $searchTerm) {
                            $subQuery->where($column, 'LIKE', "%{$searchTerm}%");
                        });
                    } else {
                        // Handle direct model fields
                        $q->orWhere($field, 'LIKE', "%{$searchTerm}%");
                    }
                }
            });
        }

        // Apply filters
        foreach ($filterableFields as $field => $config) {
            $filterValue = $request->input("filter.{$field}");
            
            if (!empty($filterValue)) {
                switch ($config['type']) {
                    case 'exact':
                        if (str_contains($field, '.')) {
                            // Handle relationship fields
                            $parts = explode('.', $field);
                            $relation = $parts[0];
                            $column = $parts[1];
                            $query->whereHas($relation, function ($subQuery) use ($column, $filterValue) {
                                $subQuery->where($column, $filterValue);
                            });
                        } else {
                            $query->where($field, $filterValue);
                        }
                        break;

                    case 'like':
                        if (str_contains($field, '.')) {
                            // Handle relationship fields
                            $parts = explode('.', $field);
                            $relation = $parts[0];
                            $column = $parts[1];
                            $query->whereHas($relation, function ($subQuery) use ($column, $filterValue) {
                                $subQuery->where($column, 'LIKE', "%{$filterValue}%");
                            });
                        } else {
                            $query->where($field, 'LIKE', "%{$filterValue}%");
                        }
                        break;

                    case 'date':
                        try {
                            $date = Carbon::parse($filterValue)->format('Y-m-d');
                            $query->whereDate($field, $date);
                        } catch (\Exception $e) {
                            // Invalid date format, skip filter
                        }
                        break;

                    case 'date_range':
                        try {
                            $startDate = Carbon::parse($filterValue['start'])->format('Y-m-d');
                            $endDate = Carbon::parse($filterValue['end'])->format('Y-m-d');
                            $query->whereBetween($field, [$startDate, $endDate]);
                        } catch (\Exception $e) {
                            // Invalid date format, skip filter
                        }
                        break;

                    case 'numeric_range':
                        if (is_array($filterValue) && isset($filterValue['min'], $filterValue['max'])) {
                            $query->whereBetween($field, [$filterValue['min'], $filterValue['max']]);
                        }
                        break;

                    case 'boolean':
                        $query->where($field, filter_var($filterValue, FILTER_VALIDATE_BOOLEAN));
                        break;

                    case 'in':
                        if (is_array($filterValue)) {
                            $query->whereIn($field, $filterValue);
                        } else {
                            $query->where($field, $filterValue);
                        }
                        break;

                    case 'custom':
                        // Allow custom filter logic via callback
                        if (isset($config['callback']) && is_callable($config['callback'])) {
                            $config['callback']($query, $filterValue);
                        }
                        break;
                }
            }
        }

        // Apply sorting
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        // Validate sort field
        if (in_array($sortBy, $sortableFields)) {
            if (str_contains($sortBy, '.')) {
                // Handle relationship sorting
                $parts = explode('.', $sortBy);
                $relation = $parts[0];
                $column = $parts[1];
                
                $query->with($relation)->orderBy(
                    $relation::select($column)
                        ->whereColumn("{$relation}.id", $query->getModel()->getTable() . ".{$relation}_id")
                        ->limit(1),
                    $sortDirection
                );
            } else {
                $query->orderBy($sortBy, $sortDirection);
            }
        }

        return $query;
    }

    /**
     * Get the pagination data with meta information
     *
     * @param $paginatedData
     * @param Request $request
     * @return array
     */
    protected function getPaginationData($paginatedData, Request $request): array
    {
        return [
            'data' => $paginatedData->items(),
            'current_page' => $paginatedData->currentPage(),
            'first_page_url' => $paginatedData->url(1),
            'from' => $paginatedData->firstItem(),
            'last_page' => $paginatedData->lastPage(),
            'last_page_url' => $paginatedData->url($paginatedData->lastPage()),
            'links' => $paginatedData->linkCollection(),
            'next_page_url' => $paginatedData->nextPageUrl(),
            'path' => $paginatedData->path(),
            'per_page' => $paginatedData->perPage(),
            'prev_page_url' => $paginatedData->previousPageUrl(),
            'to' => $paginatedData->lastItem(),
            'total' => $paginatedData->total(),
            'meta' => [
                'search' => $request->input('search'),
                'filters' => $request->input('filter', []),
                'sort_by' => $request->input('sort_by'),
                'sort_direction' => $request->input('sort_direction'),
            ]
        ];
    }
}
