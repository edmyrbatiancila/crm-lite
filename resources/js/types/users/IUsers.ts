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
}

export const userBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    }
];