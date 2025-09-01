import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Clock, Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Notification, NotificationPageProps } from '@/types/notifications/INotification';
import { router } from '@inertiajs/react';
import ResponsivePagination from '@/components/shared/responsive-pagination';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Notifications', href: '/notifications' },
];

const getNotificationIcon = (type: string) => {
    const iconClass = "h-4 w-4";
    
    switch (type) {
        case 'success':
            return <CheckCheck className={`${iconClass} text-green-500 dark:text-green-400`} />;
        case 'warning':
            return <Clock className={`${iconClass} text-yellow-500 dark:text-yellow-400`} />;
        case 'error':
            return <Trash2 className={`${iconClass} text-red-500 dark:text-red-400`} />;
        case 'task_assigned':
            return <CheckCheck className={`${iconClass} text-blue-500 dark:text-blue-400`} />;
        case 'project_updated':
            return <Bell className={`${iconClass} text-purple-500 dark:text-purple-400`} />;
        case 'client_updated':
            return <Bell className={`${iconClass} text-cyan-500 dark:text-cyan-400`} />;
        case 'client_message':
            return <Bell className={`${iconClass} text-indigo-500 dark:text-indigo-400`} />;
        case 'deadline_reminder':
            return <Clock className={`${iconClass} text-orange-500 dark:text-orange-400`} />;
        case 'info':
            return <Bell className={`${iconClass} text-blue-500 dark:text-blue-400`} />;
        case 'system':
            return <Bell className={`${iconClass} text-gray-500 dark:text-gray-400`} />;
        default:
            return <Bell className={`${iconClass} text-gray-500 dark:text-gray-400`} />;
    }
};

const getNotificationBadgeVariant = (type: string) => {
    switch (type) {
        case 'success':
            return 'default';
        case 'warning':
            return 'secondary';
        case 'error':
            return 'destructive';
        case 'task_assigned':
            return 'default';
        case 'project_updated':
            return 'secondary';
        case 'client_updated':
            return 'outline';
        case 'client_message':
            return 'outline';
        case 'deadline_reminder':
            return 'secondary';
        case 'info':
            return 'default';
        case 'system':
            return 'outline';
        default:
            return 'outline';
    }
};

const getNotificationTypeLabel = (type: string) => {
    switch (type) {
        case 'task_assigned':
            return 'Task';
        case 'project_updated':
            return 'Project';
        case 'client_updated':
            return 'Client';
        case 'client_message':
            return 'Message';
        case 'deadline_reminder':
            return 'Deadline';
        case 'success':
            return 'Success';
        case 'warning':
            return 'Warning';
        case 'error':
            return 'Error';
        case 'info':
            return 'Info';
        case 'system':
            return 'System';
        default:
            return type.replace('_', ' ').toUpperCase();
    }
};

const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
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

const markAsRead = (notificationId: number) => {
    router.patch(`/notifications/${notificationId}/read`, {}, {
        preserveScroll: true,
        preserveState: true,
    });
};

const markAllAsRead = () => {
    router.patch('/notifications/mark-all-read', {}, {
        preserveScroll: true,
        preserveState: true,
    });
};

const NotificationItem = ({ notification, index }: { notification: Notification; index: number }) => {
    const relativeTime = formatRelativeTime(notification.created_at);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="group"
        >
            <Card className={`
                transition-all duration-300 ease-in-out
                hover:shadow-lg hover:-translate-y-1
                border border-gray-200 dark:border-gray-700
                ${!notification.is_read 
                    ? 'bg-gradient-to-r from-blue-50/50 via-white to-white dark:from-blue-950/20 dark:via-gray-800 dark:to-gray-800 border-l-4 border-l-blue-500 dark:border-l-blue-400 shadow-sm' 
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'
                }
            `}>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between space-x-4">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                            <div className={`
                                p-2 rounded-full transition-colors duration-200
                                ${!notification.is_read 
                                    ? 'bg-blue-100 dark:bg-blue-900/30' 
                                    : 'bg-gray-100 dark:bg-gray-700'
                                }
                            `}>
                                {getNotificationIcon(notification.type)}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 min-w-0 space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className={`
                                        font-semibold text-base leading-tight
                                        ${!notification.is_read 
                                            ? 'text-gray-900 dark:text-gray-100' 
                                            : 'text-gray-700 dark:text-gray-300'
                                        }
                                    `}>
                                        {notification.title}
                                    </h3>
                                </div>
                                
                                <div className="flex items-center space-x-2 flex-shrink-0">
                                    <Badge 
                                        variant={getNotificationBadgeVariant(notification.type)} 
                                        className="text-xs font-medium"
                                    >
                                        {getNotificationTypeLabel(notification.type)}
                                    </Badge>
                                    {!notification.is_read && (
                                        <div className="w-2.5 h-2.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <p className={`
                                text-sm leading-relaxed line-clamp-3
                                ${!notification.is_read 
                                    ? 'text-gray-700 dark:text-gray-300' 
                                    : 'text-gray-600 dark:text-gray-400'
                                }
                            `}>
                                {notification.message}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                                    <time dateTime={notification.created_at} className="flex items-center space-x-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{relativeTime}</span>
                                    </time>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="hidden sm:inline">{notification.formatted_created_at}</span>
                                </div>

                                {/* Action Button */}
                                {!notification.is_read && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="
                                                        h-8 w-8 p-0 
                                                        opacity-0 group-hover:opacity-100 
                                                        transition-opacity duration-200
                                                        hover:bg-blue-100 dark:hover:bg-blue-900/30
                                                        hover:text-blue-600 dark:hover:text-blue-400
                                                    "
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Mark as read</p>
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

export default function NotificationsIndex() {
    const { notifications } = usePage<NotificationPageProps>().props;
    const unreadCount = notifications.data.filter(n => !n.is_read).length;
    const totalCount = notifications.data.length;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen bg-gray-50 dark:bg-gray-900"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Enhanced Header */}
                    <motion.div
                        variants={headerVariants}
                        className="mb-8"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                                        Notifications
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                                        Stay updated with your latest activities and important updates
                                    </p>
                                    {totalCount > 0 && (
                                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center space-x-1">
                                                <Bell className="h-4 w-4" />
                                                <span>{totalCount} total</span>
                                            </span>
                                            {unreadCount > 0 && (
                                                <span className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                    <span>{unreadCount} unread</span>
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    {unreadCount > 0 && (
                                        <>
                                            <Badge 
                                                variant="secondary" 
                                                className="px-3 py-1.5 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                            >
                                                {unreadCount} unread
                                            </Badge>
                                            <Button 
                                                onClick={markAllAsRead} 
                                                variant="outline" 
                                                size="sm"
                                                className="
                                                    hover:bg-blue-50 dark:hover:bg-blue-900/20 
                                                    hover:border-blue-300 dark:hover:border-blue-700
                                                    hover:text-blue-700 dark:hover:text-blue-300
                                                    transition-colors duration-200
                                                "
                                            >
                                                <CheckCheck className="h-4 w-4 mr-2" />
                                                Mark all as read
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Notifications Content */}
                    <div className="space-y-6">
                        {notifications.data.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                                    <CardContent className="flex flex-col items-center justify-center py-16 sm:py-20">
                                        <div className="text-center space-y-4">
                                            <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                                                <Bell className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                                            </div>
                                            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                                No notifications yet
                                            </CardTitle>
                                            <CardDescription className="text-center max-w-md text-gray-600 dark:text-gray-400 leading-relaxed">
                                                When you have new notifications, they'll appear here. Check back later or explore other sections of the app to stay connected.
                                            </CardDescription>
                                            <div className="pt-4">
                                                <Button asChild variant="outline" className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <Link href="/dashboard">
                                                        <Bell className="h-4 w-4 mr-2" />
                                                        Go to Dashboard
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ) : (
                            <div className="grid gap-4 sm:gap-6">
                                {notifications.data.map((notification, index) => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                        index={index}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Enhanced Pagination */}
                        {notifications.links && notifications.links.length > 3 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <ResponsivePagination
                                    data={{
                                        current_page: notifications.current_page || 1,
                                        last_page: notifications.last_page || 1,
                                        per_page: notifications.per_page || 10,
                                        total: notifications.total || 0,
                                        from: notifications.from || null,
                                        to: notifications.to || null,
                                        links: notifications.links
                                    }}
                                    baseUrl="/notifications"
                                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
                                    showResultsInfo={true}
                                />
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AppLayout>
    );
}
