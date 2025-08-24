/**
 * Role enumeration that mirrors the PHP RoleEnum
 * This ensures consistency between frontend and backend role checking
 */
export enum RoleEnum {
    ADMIN = 'admin',
    USER = 'user'
}

/**
 * Permission enumeration for consistent permission checking
 */
export enum PermissionEnum {
    // User permissions
    MANAGE_USERS = 'manage users',
    VIEW_USERS = 'view users',
    CREATE_USERS = 'create users',
    EDIT_USERS = 'edit users',
    DELETE_USERS = 'delete users',

    // Client permissions
    MANAGE_CLIENTS = 'manage clients',
    VIEW_CLIENTS = 'view clients',
    CREATE_CLIENTS = 'create clients',
    EDIT_CLIENTS = 'edit clients',
    DELETE_CLIENTS = 'delete clients',

    // Project permissions
    MANAGE_PROJECTS = 'manage projects',
    VIEW_PROJECTS = 'view projects',
    CREATE_PROJECTS = 'create projects',
    EDIT_PROJECTS = 'edit projects',
    DELETE_PROJECTS = 'delete projects',

    // Task permissions
    MANAGE_TASKS = 'manage tasks',
    VIEW_TASKS = 'view tasks',
    CREATE_TASKS = 'create tasks',
    EDIT_TASKS = 'edit tasks',
    DELETE_TASKS = 'delete tasks',

    // Lead permissions
    MANAGE_LEADS = 'manage leads',
    VIEW_LEADS = 'view leads',
    CREATE_LEADS = 'create leads',
    EDIT_LEADS = 'edit leads',
    DELETE_LEADS = 'delete leads',
}

/**
 * Helper function to check if a role string is a valid RoleEnum value
 */
export function isValidRole(role: string): role is RoleEnum {
    return Object.values(RoleEnum).includes(role as RoleEnum);
}

/**
 * Helper function to check if a permission string is a valid PermissionEnum value
 */
export function isValidPermission(permission: string): permission is PermissionEnum {
    return Object.values(PermissionEnum).includes(permission as PermissionEnum);
}
