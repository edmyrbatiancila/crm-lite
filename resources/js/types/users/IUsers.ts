import { BreadcrumbItem } from "..";

export type RegisterForm = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export interface UserForm {
    id: number | null;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    first_login_at: string | null;
    last_login_at: string | null;
};

export interface UsersChart {
    total: number;
    active: number;
    inactive: number;
};

export const userBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    }
];