import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
    TrendingUp,
    Users, 
    FolderOpen, 
    CheckSquare, 
    UserPlus,
    Calendar,
    ArrowRight,
    Activity,
    Bell
} from 'lucide-react';
import { Link } from '@inertiajs/react';

interface RecentUpdate {
    id: number;
    type: 'user' | 'client' | 'project' | 'task';
    title: string;
    description: string;
    created_at: string;
    user_name?: string;
    status?: string;
}

interface AdminStats {
    newUsersToday: number;
    newClientsToday: number;
    newProjectsToday: number;
    newTasksToday: number;
    totalUsers: number;
    totalClients: number;
    totalProjects: number;
    totalTasks: number;
}

interface AdminUpdatesModalProps {
    isOpen: boolean;
    onClose: () => void;
    recentUpdates: RecentUpdate[];
    stats: AdminStats;
    user: {
        first_name: string;
        last_name: string;
    };
}

export function AdminUpdatesModal({ isOpen, onClose, recentUpdates, stats, user }: AdminUpdatesModalProps) {
    const [currentTab, setCurrentTab] = useState<'overview' | 'updates'>('overview');

    const getUpdateIcon = (type: string) => {
        switch (type) {
            case 'user': return Users;
            case 'client': return UserPlus;
            case 'project': return FolderOpen;
            case 'task': return CheckSquare;
            default: return Activity;
        }
    };

    const getUpdateColor = (type: string) => {
        switch (type) {
            case 'user': return 'bg-purple-500';
            case 'client': return 'bg-green-500';
            case 'project': return 'bg-blue-500';
            case 'task': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const quickStats = [
        {
            title: 'New Users',
            value: stats.newUsersToday,
            total: stats.totalUsers,
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            href: '/users'
        },
        {
            title: 'New Clients',
            value: stats.newClientsToday,
            total: stats.totalClients,
            icon: UserPlus,
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            href: '/clients'
        },
        {
            title: 'New Projects',
            value: stats.newProjectsToday,
            total: stats.totalProjects,
            icon: FolderOpen,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            href: '/projects'
        },
        {
            title: 'New Tasks',
            value: stats.newTasksToday,
            total: stats.totalTasks,
            icon: CheckSquare,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
            href: '/tasks'
        }
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-6 w-6 text-primary" />
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                Admin Dashboard
                            </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date().toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </div>
                    </div>
                    <DialogTitle className="text-2xl">
                        Good day, {user.first_name}! 👋
                    </DialogTitle>
                    <p className="text-muted-foreground">
                        Here's what's happening in your CRM today
                    </p>
                </DialogHeader>

                {/* Tab Navigation */}
                <div className="flex gap-2 border-b">
                    <Button
                        variant={currentTab === 'overview' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setCurrentTab('overview')}
                        className="rounded-b-none"
                    >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Overview
                    </Button>
                    <Button
                        variant={currentTab === 'updates' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setCurrentTab('updates')}
                        className="rounded-b-none"
                    >
                        <Bell className="h-4 w-4 mr-2" />
                        Recent Updates ({recentUpdates.length})
                    </Button>
                </div>

                <div className="py-4">
                    {currentTab === 'overview' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {quickStats.map((stat, index) => (
                                    <motion.div
                                        key={stat.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <Link href={stat.href} onClick={onClose}>
                                            <Card className="group hover:shadow-md transition-all duration-200 cursor-pointer border-border/50 hover:border-primary/30">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                                                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-2xl font-bold">{stat.value}</span>
                                                                {stat.value > 0 && (
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        New Today
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-sm text-muted-foreground">
                                                                {stat.title}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Total: {stat.total}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border border-primary/10">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <Activity className="h-5 w-5" />
                                    Quick Admin Actions
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <Button asChild variant="outline" className="justify-start">
                                        <Link href="/users/create" onClick={onClose}>
                                            <Users className="h-4 w-4 mr-2" />
                                            Add New User
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" className="justify-start">
                                        <Link href="/activity-logs" onClick={onClose}>
                                            <Activity className="h-4 w-4 mr-2" />
                                            View Activity Logs
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" className="justify-start">
                                        <Link href="/notifications" onClick={onClose}>
                                            <Bell className="h-4 w-4 mr-2" />
                                            All Notifications
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentTab === 'updates' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ScrollArea className="h-[400px] pr-4">
                                <div className="space-y-3">
                                    {recentUpdates.length > 0 ? (
                                        recentUpdates.map((update, index) => {
                                            const Icon = getUpdateIcon(update.type);
                                            return (
                                                <motion.div
                                                    key={update.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                >
                                                    <Card className="hover:shadow-sm transition-shadow">
                                                        <CardContent className="p-4">
                                                            <div className="flex items-start gap-3">
                                                                <div className={`p-2 rounded-lg ${getUpdateColor(update.type)} text-white`}>
                                                                    <Icon className="h-4 w-4" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between">
                                                                        <h4 className="font-semibold text-sm">
                                                                            {update.title}
                                                                        </h4>
                                                                        <span className="text-xs text-muted-foreground">
                                                                            {formatDate(update.created_at)}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground mt-1">
                                                                        {update.description}
                                                                    </p>
                                                                    {update.user_name && (
                                                                        <p className="text-xs text-muted-foreground mt-1">
                                                                            by {update.user_name}
                                                                        </p>
                                                                    )}
                                                                    {update.status && (
                                                                        <Badge variant="outline" className="mt-2 text-xs">
                                                                            {update.status}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </motion.div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-12">
                                            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                            <p className="text-muted-foreground">No recent updates to show</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                New activities will appear here
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </motion.div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                        Last updated: {new Date().toLocaleTimeString()}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button asChild>
                            <Link href="/dashboard" onClick={onClose}>
                                Go to Dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
