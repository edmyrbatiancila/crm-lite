export interface Users {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    first_login_at: string | null;
    last_login_at: string | null;
    created_at: string;
}