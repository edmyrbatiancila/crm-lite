import { ClientChartStatus } from "../clients/IClients";
import { ProjectChartStatus } from "../projects/IProject";
import { TaskChartStatus } from "../tasks/ITasks";
import { UsersChart } from "../users/IUsers";

export interface DashboardMonthlyData {
    month: string;
    fullMonth: string;
    clients: number;
    projects: number;
    tasks: number;
    users: number;
}

export interface DashboardStatus {
    clients: ClientChartStatus;
    projects: ProjectChartStatus;
    tasks: TaskChartStatus;
    users: UsersChart
};

export interface AdminDashboardStatus {
    newUsersToday: number;
    newClientsToday: number;
    newProjectsToday: number;
    newTasksToday: number;
    totalUsers: number;
    totalClients: number;
    totalProjects: number;
    totalTasks: number;
};

export interface AdminRecentStatusUpdate {
    id: number;
    type: 'user' | 'client' | 'project' | 'task';
    title: string;
    description: string;
    created_at: string;
    user_name?: string;
    status?: string;
};

export interface AdminData {
    stats: AdminDashboardStatus;
    recentUpdates: AdminRecentStatusUpdate[];
}