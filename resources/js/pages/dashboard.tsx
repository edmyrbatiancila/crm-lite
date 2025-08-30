import React from 'react';
import { motion } from 'framer-motion';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ClientStats } from '@/components/dashboard/ClientStats';
import { ProjectStats } from '@/components/dashboard/ProjectStats';
import { TaskStats } from '@/components/dashboard/TaskStats';
import { UserStats } from '@/components/dashboard/UserStats';
import { OverviewTrends } from '@/components/dashboard/OverviewTrends';
import { WelcomeModal } from '@/components/modals/WelcomeModal';
import { AdminUpdatesModal } from '@/components/modals/AdminUpdatesModal';
import { useModalManager } from '@/hooks/useModalManager';
import { type BreadcrumbItem } from '@/types';
import { BarChart3, Calendar } from 'lucide-react';
import { TaskChartStatus } from '@/types/tasks/ITasks';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    stats: {
        clients: {
            total: number;
            newThisMonth: number;
            previousMonth: number;
        };
        projects: {
            total: number;
            open: number;
            in_progress: number;
            blocked: number;
            cancelled: number;
            completed: number;
        };
        tasks: TaskChartStatus;
        users: {
            total: number;
            active: number;
            inactive: number;
        };
    };
    monthlyData: Array<{
        month: string;
        fullMonth: string;
        clients: number;
        projects: number;
        tasks: number;
        users: number;
    }>;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        role: string;
        first_login_at: string | null;
        last_login_at: string | null;
        created_at: string;
    };
    adminData?: {
        stats: {
            newUsersToday: number;
            newClientsToday: number;
            newProjectsToday: number;
            newTasksToday: number;
            totalUsers: number;
            totalClients: number;
            totalProjects: number;
            totalTasks: number;
        };
        recentUpdates: Array<{
            id: number;
            type: 'user' | 'client' | 'project' | 'task';
            title: string;
            description: string;
            created_at: string;
            user_name?: string;
            status?: string;
        }>;
    };
}

export default function Dashboard({ stats, monthlyData, user, adminData }: DashboardProps) {
    const { modalState, closeWelcomeModal, closeAdminModal } = useModalManager(user);

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

    const getCurrentMonth = () => {
        return new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8 p-6"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                                <BarChart3 className="h-8 w-8 text-primary" />
                                Dashboard
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-2 mt-2">
                                <Calendar className="h-4 w-4" />
                                Overview for { getCurrentMonth() }
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Welcome Card for New Users */}
                {/* <WelcomeCard user={user} /> */}

                {/* Overview Trends */}
                <OverviewTrends monthlyData={monthlyData} />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Client Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">Client Analytics</h2>
                            <ClientStats 
                                stats={stats.clients} 
                                monthlyData={monthlyData.map(d => ({ month: d.month, clients: d.clients }))} 
                            />
                        </div>
                    </motion.div>

                    {/* Project Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">Project Overview</h2>
                            <ProjectStats stats={stats.projects} />
                        </div>
                    </motion.div>
                </div>

                {/* Task Stats - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">Task Management</h2>
                        <TaskStats stats={stats.tasks} />
                    </div>
                </motion.div>

                {/* User Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">User Engagement</h2>
                        <UserStats stats={stats.users} />
                    </div>
                </motion.div>
            </motion.div>

            {/* Role-based Modals */}
            <WelcomeModal 
                isOpen={modalState.showWelcomeModal}
                onClose={closeWelcomeModal}
                user={user}
            />
            
            {adminData && (
                <AdminUpdatesModal
                    isOpen={modalState.showAdminModal}
                    onClose={closeAdminModal}
                    recentUpdates={adminData.recentUpdates}
                    stats={adminData.stats}
                    user={user}
                />
            )}
        </AppLayout>
    );
}
