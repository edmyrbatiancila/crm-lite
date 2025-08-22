
export interface ProjectStatus {
    id: number | null;
    name: string | null;
}

export interface Projects {
    id: number | null;
    title: string;
    description: string;
    status: string;
    deadline_at: string;
}

export interface ProjectForm {
    id: number | null;
    title: string;
    description: string;
    user_id: number | null;
    client_id: number | null;
    deadline_at: string;
    status: string;
}

export interface UserProject {
    id: number;
    first_name: string;
    last_name: string;
}

export interface ClientProject {
    id: number;
    name: string;
}