import { BreadcrumbItem } from "..";

export interface Tasks {
    id: number | null;
    title: string;
    description: string;
    deadline_at: string;
    status: string;
}

export interface TaskForm {
    id: number | null;
    title: string;
    description: string;
    user_id: number | null;
    client_id: number | null;
    project_id: number | null;
    deadline_at: string;
    status: string;
}

export interface TaskChartStatus {
    open: number;
    in_progress: number;
    pending: number;
    waiting_client: number;
    blocked: number;
    closed: number;
}

export const taskBreadcrumbs: BreadcrumbItem[] = [
    {
        title: "Tasks",
        href: '/tasks'
    }
];