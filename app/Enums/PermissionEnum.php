<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // User Permissions
    case MANAGE_USERS = 'manage users';
    case VIEW_USERS = 'view users';
    case CREATE_USERS = 'create users';
    case EDIT_USERS = 'edit users';
    case DELETE_USERS = 'delete users';

    // Project Permissions
    case MANAGE_PROJECTS = 'manage projects';
    case VIEW_PROJECTS = 'view projects';
    case CREATE_PROJECTS = 'create projects';
    case EDIT_PROJECTS = 'edit projects';
    case DELETE_PROJECTS = 'delete projects';

    // Task Permissions
    case MANAGE_TASKS = 'manage tasks';
    case VIEW_TASKS = 'view tasks';
    case CREATE_TASKS = 'create tasks';
    case EDIT_TASKS = 'edit tasks';
    case DELETE_TASKS = 'delete tasks';

    // Client Persmissions
    case MANAGE_CLIENTS = 'manage clients';
    case VIEW_CLIENTS = 'view clients';
    case CREATE_CLIENTS = 'create clients';
    case EDIT_CLIENTS = 'edit clients';
    case DELETE_CLIENTS = 'delete clients';
}
