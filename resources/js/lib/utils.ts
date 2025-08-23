import { NavItem } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { BookOpen, ClipboardList, Folder, LayoutGrid, Rocket, UserCircleIcon, UserPlus, UserSquareIcon } from 'lucide-react';
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
    {
        title: 'Users',
        href: '/users',
        icon: UserSquareIcon,
    },
    {
        title: 'Clients',
        href: '/clients',
        icon: UserPlus,
    },
    {
        title: 'Projects',
        href: '/projects',
        icon: Rocket
    },
    {
        title: 'Tasks',
        href: '/tasks',
        icon: ClipboardList
    },
    {
        title: 'Leads',
        href: '/leads',
        icon: UserCircleIcon,
    }
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