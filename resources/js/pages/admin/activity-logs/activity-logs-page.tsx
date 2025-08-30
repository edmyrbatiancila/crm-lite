import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Clock, 
    Database, 
    Activity, 
    Calendar,
    User as UserIcon,
    RotateCcw,
    FileText,
    Eye
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Breadcrumbs } from '@/components/breadcrumbs';
import SearchAndFilter from '@/components/shared/search-and-filter';
import ResponsivePagination from '@/components/shared/responsive-pagination';
import { useSearchAndFilter } from '@/hooks/use-search-and-filter';
import { activityLogFilterOptions, activityLogSortOptions } from '@/config/filters/activity-log-filters';
import { Activities, ActivityFilters, ActivityLog } from '@/types/activity-log/IActivityLog';
import { getEventColor } from '@/hooks/activity-logs/activity-logs-hooks';
import { BreadcrumbItem } from '@/types';

interface IActivityLogsPageProps {
    activities: Activities;
    filters: ActivityFilters;
}

const ActivityLogsPage = ({ activities, filters }: IActivityLogsPageProps) => {
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

    // const breadcrumbs = [
    //     { title: 'Dashboard', href: '/' },
    //     { title: 'System', href: '#' },
    //     { title: 'Activity Logs', href: '/activity-logs' },
    // ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            full: date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
            relative: getRelativeTime(date)
        };
    };

    const getRelativeTime = (date: Date) => {
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays < 7) return `${diffInDays}d ago`;
        return date.toLocaleDateString();
    };

    const getActivityIcon = (activity: ActivityLog) => {
        const iconClass = "h-4 w-4";
        
        switch (activity.subject_type) {
            case 'App\\Models\\User':
                return <UserIcon className={iconClass} />;
            case 'App\\Models\\Client':
                return <FileText className={iconClass} />;
            case 'App\\Models\\Project':
                return <Database className={iconClass} />;
            case 'App\\Models\\Task':
                return <Calendar className={iconClass} />;
            default:
                return <Activity className={iconClass} />;
        }
    };

    const getSubjectTypeName = (subjectType: string) => {
        switch (subjectType) {
            case 'App\\Models\\User':
                return 'User';
            case 'App\\Models\\Client':
                return 'Client';
            case 'App\\Models\\Project':
                return 'Project';
            case 'App\\Models\\Task':
                return 'Task';
            default:
                return 'System';
        }
    };

    const renderActivityCard = (activity: ActivityLog, index: number) => {
        const dateInfo = formatDate(activity.created_at);
        
        return (
            <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
            >
                <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary/20">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            {/* Avatar & Icon Section */}
                            <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    {getActivityIcon(activity)}
                                </div>
                                {activity.causer && (
                                    <Avatar className="h-8 w-8 sm:h-6 sm:w-6">
                                        <AvatarFallback className="text-xs font-medium">
                                            {activity.causer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 min-w-0">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge 
                                            variant="outline" 
                                            className={`${getEventColor(activity.event)} font-medium`}
                                        >
                                            {activity.event.charAt(0).toUpperCase() + activity.event.slice(1)}
                                        </Badge>
                                        <Badge variant="secondary" className="text-xs">
                                            {getSubjectTypeName(activity.subject_type)}
                                        </Badge>
                                        {activity.log_name && (
                                            <Badge variant="outline" className="text-xs">
                                                {activity.log_name}
                                            </Badge>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        <span className="hidden sm:inline">{dateInfo.full}</span>
                                        <span className="sm:hidden">{dateInfo.relative}</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <p className="text-sm text-foreground leading-relaxed">
                                        {activity.human_readable}
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    {activity.causer && (
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <UserIcon className="h-3 w-3" />
                                            <span>by</span>
                                            <span className="font-medium text-foreground">
                                                {activity.causer.name}
                                            </span>
                                        </div>
                                    )}

                                    {Object.keys(activity.properties).length > 0 && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 px-2 text-xs hover:bg-muted/50"
                                                    >
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        View Details
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="left" className="max-w-md max-h-64 overflow-auto">
                                                    <div className="text-xs">
                                                        <div className="font-medium mb-2">Activity Properties:</div>
                                                        <pre className="whitespace-pre-wrap">
                                                            {JSON.stringify(activity.properties, null, 2)}
                                                        </pre>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    };

    const renderPagination = () => {
        if (activities.last_page <= 1) return null;

        // Create search params for pagination
        const searchParams = new URLSearchParams();
        if (searchValue) searchParams.append('search', searchValue);
        if (sortValue !== 'created_at') searchParams.append('sort_by', sortValue);
        if (sortDirection !== 'desc') searchParams.append('sort_direction', sortDirection);
        
        // Add active filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                searchParams.append(`filter[${key}]`, String(value));
            }
        });

        return (
            <ResponsivePagination
                data={activities}
                baseUrl="/activity-logs"
                searchParams={searchParams}
                className="mt-8"
            />
        );
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Activity Logs',
            href: '/activity-logs'
        }
    ];

    return (
        <AppLayout breadcrumbs={ breadcrumbs }>
            <Head title="Activity Logs" />
        
            <div className="space-y-6 p-6">
                {/* Breadcrumbs
                <Breadcrumbs breadcrumbs={breadcrumbs} /> */}

                {/* Header */}
                <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Track all system activities and changes across your application
                            </p>
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-1">
                            <div className="text-right">
                                <div className="text-lg sm:text-xl font-bold text-primary">
                                    {activities.total.toLocaleString()}
                                </div>
                                <div className="text-xs text-muted-foreground">Total Activities</div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg sm:text-xl font-bold text-green-600">
                                    {activities.data.length}
                                </div>
                                <div className="text-xs text-muted-foreground">Current Page</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Search and Filters */}
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
                    placeholder="Search activities, descriptions, or users..."
                />

                {/* Content */}
                {activities.data.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gray-100">
                                    <Activity className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {searchValue.length > 0 || hasActiveFilters ? "No activities found" : "No Activity Logs"}
                                    </h3>
                                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                                        {searchValue.length > 0 || hasActiveFilters 
                                            ? "We couldn't find any activities matching your search criteria. Try adjusting your filters or search terms."
                                            : "No activities have been recorded yet. Activity logs will appear here as users interact with the system."
                                        }
                                    </p>
                                </div>
                                {(searchValue.length > 0 || hasActiveFilters) && (
                                    <Button onClick={handleReset} variant="outline" className="gap-2">
                                        <RotateCcw className="h-4 w-4" />
                                        Clear all filters
                                    </Button>
                                )}
                            </motion.div>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Activity Cards */}
                        <div className="space-y-4">
                            {activities.data.map((activity, index) => renderActivityCard(activity, index))}
                        </div>

                        {/* Pagination */}
                        {renderPagination()}
                    </>
                )}
            </div>
        </AppLayout>
    );
};

export default ActivityLogsPage;

