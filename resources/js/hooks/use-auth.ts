import { usePage } from '@inertiajs/react';
import { User } from '@/types';

interface UseAuthReturn {
    user: User | null;
    hasRole: (role: string) => boolean;
    hasAnyRole: (roles: string[]) => boolean;
    hasPermission: (permission: string) => boolean;
    hasAnyPermission: (permissions: string[]) => boolean;
    canManageUsers: boolean;
    canManageClients: boolean;
    canManageLeads: boolean;
    isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
    const page = usePage();
    const props = page.props as Record<string, unknown>;
    const auth = props.auth as { user: User | null } | undefined;
    const user = auth?.user ?? null;

    const hasRole = (role: string): boolean => {
        return user?.roles?.includes(role) ?? false;
    };

    const hasAnyRole = (roles: string[]): boolean => {
        return roles.some(role => hasRole(role));
    };

    const hasPermission = (permission: string): boolean => {
        return user?.permissions?.includes(permission) ?? false;
    };

    const hasAnyPermission = (permissions: string[]): boolean => {
        return permissions.some(permission => hasPermission(permission));
    };

    return {
        user,
        hasRole,
        hasAnyRole,
        hasPermission,
        hasAnyPermission,
        canManageUsers: user?.can_manage_users ?? false,
        canManageClients: user?.can_manage_clients ?? false,
        canManageLeads: user?.can_manage_leads ?? false,
        isAuthenticated: !!user,
    };
}
