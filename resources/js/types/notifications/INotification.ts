export type NotificationType = 
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'task_assigned'
    | 'project_updated'
    | 'client_updated'
    | 'client_message'
    | 'deadline_reminder'
    | 'system';

export interface Notification {
    id: number;
    user_id: number;
    title: string;
    message: string;
    type: NotificationType;
    data?: Record<string, any>;
    is_read: boolean;
    created_at: string;
    updated_at: string;
    formatted_created_at: string;
}

export interface NotificationPageProps {
    notifications: {
        data: Notification[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number | null;
        to: number | null;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    [key: string]: unknown;
}