import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Bell, 
    CheckCheck, 
    Clock, 
    Eye, 
    Trash2, 
    AlertTriangle,
    MessageSquare,
    Calendar,
    Info,
    Settings,
    Users,
    FileText
} from 'lucide-react';
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
            return <AlertTriangle className={`${iconClass} text-yellow-500 dark:text-yellow-400`} />;
        case 'error':
            return <Trash2 className={`${iconClass} text-red-500 dark:text-red-400`} />;
        case 'task_assigned':
            return <CheckCheck className={`${iconClass} text-blue-500 dark:text-blue-400`} />;
        case 'project_updated':
            return <FileText className={`${iconClass} text-purple-500 dark:text-purple-400`} />;
        case 'client_updated':
            return <Users className={`${iconClass} text-cyan-500 dark:text-cyan-400`} />;
        case 'client_message':
            return <MessageSquare className={`${iconClass} text-indigo-500 dark:text-indigo-400`} />;
        case 'deadline_reminder':
            return <Calendar className={`${iconClass} text-orange-500 dark:text-orange-400`} />;
        case 'info':
            return <Info className={`${iconClass} text-blue-500 dark:text-blue-400`} />;
        case 'system':
            return <Settings className={`${iconClass} text-gray-500 dark:text-gray-400`} />;
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
    const isHighPriority = ['error', 'deadline_reminder', 'warning'].includes(notification.type);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="group"
        >
            <Card className={`
                relative overflow-hidden
                transition-all duration-300 ease-in-out
                hover:shadow-xl hover:-translate-y-1
                border border-gray-200 dark:border-gray-700
                ${!notification.is_read 
                    ? 'bg-gradient-to-r from-blue-50/80 via-white to-white dark:from-blue-950/30 dark:via-gray-800 dark:to-gray-800 shadow-md' 
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'
                }
                ${isHighPriority && !notification.is_read
                    ? 'ring-2 ring-orange-200 dark:ring-orange-800/50'
                    : ''
                }
            `}>
                {/* Priority Indicator */}
                {isHighPriority && !notification.is_read && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400"></div>
                )}
                
                {/* Unread Indicator */}
                {!notification.is_read && (
                    <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-r-full"></div>
                )}

                <CardContent className={`p-6 ${!notification.is_read ? 'pl-8' : ''}`}>
                    <div className="flex items-start justify-between space-x-4">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                            <div className={`
                                relative p-3 rounded-xl transition-all duration-200 group-hover:scale-105
                                ${!notification.is_read 
                                    ? isHighPriority 
                                        ? 'bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40' 
                                        : 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40'
                                    : 'bg-gray-100 dark:bg-gray-700'
                                }
                            `}>
                                {getNotificationIcon(notification.type)}
                                {isHighPriority && !notification.is_read && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                                )}
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
                                        className={`
                                            text-xs font-medium transition-colors duration-200
                                            ${isHighPriority 
                                                ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-700' 
                                                : ''
                                            }
                                        `}
                                    >
                                        {getNotificationTypeLabel(notification.type)}
                                    </Badge>
                                    {!notification.is_read && (
                                        <div className="relative">
                                            <div className="w-2.5 h-2.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse"></div>
                                            <div className="absolute inset-0 w-2.5 h-2.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-ping opacity-75"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Message */}
                            <div className={`
                                text-sm leading-relaxed
                                ${!notification.is_read 
                                    ? 'text-gray-700 dark:text-gray-300' 
                                    : 'text-gray-600 dark:text-gray-400'
                                }
                            `}>
                                <p className="line-clamp-3">
                                    {notification.message}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                                    <time dateTime={notification.created_at} className="flex items-center space-x-1">
                                        <Clock className="h-3 w-3" />
                                        <span className="font-medium">{relativeTime}</span>
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
                                                        h-8 w-8 p-0 rounded-full
                                                        opacity-0 group-hover:opacity-100 
                                                        transition-all duration-200
                                                        hover:bg-blue-100 dark:hover:bg-blue-900/30
                                                        hover:text-blue-600 dark:hover:text-blue-400
                                                        hover:scale-110
                                                    "
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="left">
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
    const priorityCount = notifications.data.filter(n => 
        !n.is_read && ['error', 'deadline_reminder', 'warning'].includes(n.type)
    ).length;

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

    const statsVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, delay: 0.2 }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                    {/* Enhanced Header */}
                    <motion.div
                        variants={headerVariants}
                        className="relative"
                    >
                        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                                            <Bell className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent">
                                                Notifications
                                            </h1>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1">
                                                Stay updated with your latest activities and important updates
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Quick Stats */}
                                    {totalCount > 0 && (
                                        <motion.div 
                                            variants={statsVariants}
                                            className="flex flex-wrap items-center gap-3 pt-2"
                                        >
                                            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                                                <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    {totalCount} total
                                                </span>
                                            </div>
                                            {unreadCount > 0 && (
                                                <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                                        {unreadCount} unread
                                                    </span>
                                                </div>
                                            )}
                                            {priorityCount > 0 && (
                                                <div className="flex items-center space-x-2 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                                                    <AlertTriangle className="h-3 w-3 text-orange-500" />
                                                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                                                        {priorityCount} priority
                                                    </span>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    {unreadCount > 0 && (
                                        <>
                                            <Badge 
                                                variant="secondary" 
                                                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
                                            >
                                                {unreadCount} unread notifications
                                            </Badge>
                                            <Button 
                                                onClick={markAllAsRead} 
                                                size="sm"
                                                className="
                                                    bg-gradient-to-r from-blue-600 to-indigo-600 
                                                    hover:from-blue-700 hover:to-indigo-700
                                                    text-white shadow-lg hover:shadow-xl
                                                    transition-all duration-200 transform hover:scale-105
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
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                                    <CardContent className="flex flex-col items-center justify-center py-16 sm:py-20">
                                        <div className="text-center space-y-6">
                                            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                                <Bell className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                            </div>
                                            <div className="space-y-3">
                                                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                                                    No notifications yet
                                                </CardTitle>
                                                <CardDescription className="text-center max-w-md text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                                    When you have new notifications, they'll appear here. Check back later or explore other sections of the app to stay connected.
                                                </CardDescription>
                                            </div>
                                            <div className="pt-4">
                                                <Button 
                                                    asChild 
                                                    size="lg"
                                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                                                >
                                                    <Link href="/dashboard">
                                                        <Bell className="h-5 w-5 mr-2" />
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="mt-12"
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
                                    className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg"
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
