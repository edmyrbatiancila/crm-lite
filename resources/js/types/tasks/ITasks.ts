import { BreadcrumbItem } from "..";
import { AssignTo } from "../shared/assign-to";



export interface Tasks {
    id: number | null;
    title: string;
    description: string;
    deadline_at: string;
    status: string;
    assigned_user?: AssignTo;
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
    pending: number;
    in_progress: number;
    waiting_client: number;
    blocked: number;
    closed: number;
    open: number;
}

export const taskBreadcrumbs: BreadcrumbItem[] = [
    {
        title: "Tasks",
        href: '/tasks'
    }
];