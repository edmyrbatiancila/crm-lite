export interface ActivityLog {
    id: number;
    description: string;
    log_name: string;
    event: string;
    subject_type: string;
    subject_id: number | null;
    causer_type: string | null;
    causer_id: number | null;
    properties: Record<string, unknown>;
    created_at: string;
    updated_at: string;
    causer: {
        id: number;
        name: string;
        email: string;
    } | null;
    subject: Record<string, unknown> | null;
    human_readable: string;
};

export interface Activities {
    data: ActivityLog[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};

export interface ActivityFilters {
    search: string;
    filter: Record<string, unknown>;
    sort_by: string;
    sort_direction: 'asc' | 'desc';
}
