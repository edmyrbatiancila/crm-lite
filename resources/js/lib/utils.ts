import { NavItem } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { BookOpen, Folder, LayoutGrid, UserCircleIcon, UserPlus } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

export const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export const collapsibleMenu: NavItem[] = [
    {
        title: 'Clients',
        href: '/clients',
        icon: UserPlus
    },
    {
        title: 'Leads',
        href: '/leads',
        icon: UserCircleIcon
    }
];