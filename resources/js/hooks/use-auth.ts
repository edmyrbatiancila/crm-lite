import { usePage } from '@inertiajs/react';
import { User } from '@/types';
import { RoleEnum, PermissionEnum } from '@/enums/RoleEnum';

interface UseAuthReturn {
    user: User | null;
    hasRole: (role: RoleEnum | string) => boolean;
    hasAnyRole: (roles: (RoleEnum | string)[]) => boolean;
    hasPermission: (permission: PermissionEnum | string) => boolean;
    hasAnyPermission: (permissions: (PermissionEnum | string)[]) => boolean;
    canManageUsers: boolean;
    canManageClients: boolean;
    canManageLeads: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isUser: boolean;
}

export function useAuth(): UseAuthReturn {
    const page = usePage();
    const props = page.props as Record<string, unknown>;
    const auth = props.auth as { user: User | null } | undefined;
    const user = auth?.user ?? null;

    const hasRole = (role: RoleEnum | string): boolean => {
        return user?.roles?.includes(role.toString()) ?? false;
    };

    const hasAnyRole = (roles: (RoleEnum | string)[]): boolean => {
        return roles.some(role => hasRole(role));
    };

    const hasPermission = (permission: PermissionEnum | string): boolean => {
        return user?.permissions?.includes(permission.toString()) ?? false;
    };

    const hasAnyPermission = (permissions: (PermissionEnum | string)[]): boolean => {
        return permissions.some(permission => hasPermission(permission));
    };

    // Convenience methods for common role checks
    const isAdmin = hasRole(RoleEnum.ADMIN);
    const isUser = hasRole(RoleEnum.USER);

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
        isAdmin,
        isUser,
    };
}
