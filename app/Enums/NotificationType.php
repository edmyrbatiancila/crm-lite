<?php

namespace App\Enums;

enum NotificationType: string
{
    case INFO = 'info';
    case SUCCESS = 'success';
    case WARNING = 'warning';
    case ERROR = 'error';
    case TASK_ASSIGNED = 'task_assigned';
    case PROJECT_UPDATED = 'project_updated';
    case CLIENT_UPDATED = 'client_updated';
    case CLIENT_MESSAGE = 'client_message';
    case DEADLINE_REMINDER = 'deadline_reminder';
    case SYSTEM = 'system';
}
