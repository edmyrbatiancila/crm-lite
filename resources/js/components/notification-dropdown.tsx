import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCheck, Clock, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Notification } from '@/types/notifications/INotification';

interface NotificationDropdownProps {
    notifications: Notification[];
    unreadCount: number;
}

const getNotificationIcon = (type: string) => {
    switch (type) {
        case 'success':
            return <CheckCheck className="h-3 w-3 text-green-500 dark:text-green-400" />;
        case 'warning':
            return <Clock className="h-3 w-3 text-yellow-500 dark:text-yellow-400" />;
        case 'error':
            return <Bell className="h-3 w-3 text-red-500 dark:text-red-400" />;
        case 'task_assigned':
            return <CheckCheck className="h-3 w-3 text-blue-500 dark:text-blue-400" />;
        case 'project_updated':
            return <Bell className="h-3 w-3 text-purple-500 dark:text-purple-400" />;
        case 'client_updated':
            return <Bell className="h-3 w-3 text-cyan-500 dark:text-cyan-400" />;
        case 'client_message':
            return <Bell className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />;
        case 'deadline_reminder':
            return <Clock className="h-3 w-3 text-orange-500 dark:text-orange-400" />;
        default:
            return <Bell className="h-3 w-3 text-gray-500 dark:text-gray-400" />;
    }
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

export default function NotificationDropdown({ notifications, unreadCount }: NotificationDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasNewNotifications, setHasNewNotifications] = useState(false);

    // Show animation when there are new notifications
    useEffect(() => {
        if (unreadCount > 0) {
            setHasNewNotifications(true);
            const timer = setTimeout(() => setHasNewNotifications(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [unreadCount]);

    const recentNotifications = notifications.slice(0, 5);

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="relative p-2"
                >
                    <motion.div
                        animate={hasNewNotifications ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        <Bell className="h-5 w-5" />
                    </motion.div>
                    <AnimatePresence>
                        {unreadCount > 0 && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute -top-1 -right-1"
                            >
                                <Badge
                                    variant="destructive"
                                    className="h-5 w-5 flex items-center justify-center text-xs p-0 rounded-full"
                                >
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </Badge>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                    <div className="flex items-center space-x-2">
                        {unreadCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                                {unreadCount} new
                            </Badge>
                        )}
                        {unreadCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={markAllAsRead}
                                className="h-6 px-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Mark all read
                            </Button>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                
                {recentNotifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                        No notifications yet
                    </div>
                ) : (
                    <ScrollArea className="h-80">
                        <div className="p-1">
                            {recentNotifications.map((notification, index) => (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <DropdownMenuItem
                                        className={`p-3 cursor-pointer focus:bg-gray-50 dark:focus:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                            !notification.is_read ? 'bg-blue-50/50 dark:bg-blue-950/30 border-l-2 border-l-blue-500 dark:border-l-blue-400' : ''
                                        }`}
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        <div className="flex items-start space-x-3 w-full">
                                            <div className="flex-shrink-0 mt-0.5">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium ${
                                                    !notification.is_read ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
                                                }`}>
                                                    {notification.title}
                                                </p>
                                                <p className={`text-xs ${
                                                    !notification.is_read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'
                                                } overflow-hidden max-h-8`}>
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                    {notification.formatted_created_at}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                {!notification.is_read && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            markAsRead(notification.id);
                                                        }}
                                                        className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                    >
                                                        <Eye className="h-3 w-3" />
                                                    </Button>
                                                )}
                                                {!notification.is_read && (
                                                    <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                                                )}
                                            </div>
                                        </div>
                                    </DropdownMenuItem>
                                </motion.div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/notifications" className="w-full text-center p-3 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
                        View all notifications
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
