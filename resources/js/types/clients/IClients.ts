import { BreadcrumbItem } from "..";
import { AssignTo } from "../shared/assign-to";

export interface Clients {
    id: number | null;
    name: string;
    email: string;
    mobile_no: string;
    phone: string;
    address: string;
    notes?: string;
    assigned_to?: AssignTo;
}

export interface ClientForm {
    id: number | null;
    name: string;
    email: string;
    mobile_no: string;
    phone: string;
    address: string;
    notes?: string;
    assigned_to?: number | null;
}

export interface User {
    id: number;
    first_name: string;
    last_name?: string;
}

export interface CurrentUser {
    id: number;
    role: string;
    canAssignToOthers: boolean;
}

export const clientBreadcrumbs: BreadcrumbItem[] = [
    { 
        title: 'Clients', 
        href: '/clients' 
    }
];

export interface ClientChartStatus {
    total: number;
    newThisMonth: number;
    previousMonth: number;
};

export interface ClientChartMonthlyData {
    month: string;
    clients: number;
}