import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, User, FileText, Calendar, Database } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import SearchAndFilter from '@/components/shared/search-and-filter';
import { useSearchAndFilter } from '@/hooks/use-search-and-filter';
import { activityLogFilterOptions, activityLogSortOptions } from '@/config/filters/activity-log-filters';

interface ActivityLog {
    id: number;
    description: string;
    log_name: string;
    event: string;
    subject_type: string;
    subject_id: number | null;
    causer_type: string | null;
    causer_id: number | null;
    properties: Record<string, unknown>;
    created_at: string;
    updated_at: string;
    causer: {
        id: number;
        name: string;
        email: string;
    } | null;
    subject: Record<string, unknown> | null;
    human_readable: string;
}

interface Props {
    activities: {
        data: ActivityLog[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: Array<{
        url: string | null;
        label: string;
        active: boolean;
        }>;
    };
    filters: {
        search: string;
        filter: Record<string, unknown>;
        sort_by: string;
        sort_direction: 'asc' | 'desc';
    };
}

const ActivityLogsPage: React.FC<Props> = ({ activities, filters }) => {
    const {
        searchValue,
        activeFilters,
        sortValue,
        sortDirection,
        handleFilterChange,
        handleSortChange,
        handleSearchChange,
        handleReset,
        hasActiveFilters,
    } = useSearchAndFilter({
        initialSearch: filters.search || '',
        initialFilters: filters.filter as Record<string, string | Date | null | undefined> || {},
        initialSort: filters.sort_by || 'created_at',
        initialSortDirection: filters.sort_direction || 'desc',
    });

    const getEventColor = (event: string) => {
        switch (event) {
            case 'created':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'updated':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'deleted':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'restored':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getSubjectIcon = (subjectType: string) => {
        switch (subjectType) {
            case 'App\\Models\\User':
                return <User className="h-4 w-4" />;
            case 'App\\Models\\Client':
                return <FileText className="h-4 w-4" />;
            case 'App\\Models\\Project':
                return <Database className="h-4 w-4" />;
            case 'App\\Models\\Task':
                return <Calendar className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    const renderActivityCard = (activity: ActivityLog) => (
        <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex items-center gap-2">
                                    {getSubjectIcon(activity.subject_type)}
                                    <Badge variant="outline" className={getEventColor(activity.event)}>
                                        {activity.event}
                                    </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {activity.log_name}
                                </div>
                            </div>
                        
                            <p className="text-sm text-foreground mb-3">
                                {activity.human_readable}
                            </p>

                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatDate(activity.created_at)}
                                </div>
                            {activity.causer && (
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-xs">
                                            {activity.causer.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>{activity.causer.name}</span>
                                </div>
                            )}
                            </div>
                        </div>

                        {Object.keys(activity.properties).length > 0 && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="text-xs bg-muted rounded p-2 cursor-help">
                                        <Database className="h-4 w-4" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="left" className="max-w-md">
                                    <pre className="text-xs">
                                        {JSON.stringify(activity.properties, null, 2)}
                                    </pre>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    return (
        <AppLayout>
            <Head title="Activity Logs" />
        
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
                        <p className="text-muted-foreground">
                            Track all system activities and changes
                        </p>
                    </div>
                </div>

                <SearchAndFilter
                    searchValue={searchValue}
                    onSearchChange={handleSearchChange}
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    sortValue={sortValue}
                    sortDirection={sortDirection}
                    onSortChange={handleSortChange}
                    onReset={handleReset}
                    filterOptions={activityLogFilterOptions}
                    sortOptions={activityLogSortOptions}
                    placeholder="Search activities..."
                />

            {activities.data.length === 0 ? (
                <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchValue.length > 0 || hasActiveFilters ? "No activities found" : "No Activity Logs"}
                    </h3>
                    <p className="text-gray-500 mb-4">
                    {searchValue.length > 0 || hasActiveFilters 
                        ? "Try adjusting your search or filter criteria."
                        : "No activities have been recorded yet."
                    }
                    </p>
                    {(searchValue.length > 0 || hasActiveFilters) && (
                    <Button onClick={handleReset} variant="outline">
                        Clear filters
                    </Button>
                    )}
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                    {activities.data.map(renderActivityCard)}
                    </div>

                    {activities.last_page > 1 && (
                    <div className="mt-8">
                        <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">
                            Showing {activities.from} to {activities.to} of {activities.total} results
                        </p>
                        </div>
                    </div>
                    )}
                </>
            )}
            </div>
        </AppLayout>
    );
};

export default ActivityLogsPage;
