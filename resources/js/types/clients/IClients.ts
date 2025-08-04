export interface Clients {
    id: number | null;
    name: string;
    email: string;
    mobile_no: string;
    phone: string;
    address: string;
    notes?: string;
    assigned_to?: {
        id: number | null;
        name: string;
    } | null;
}

export interface ClientForm {
    name: string;
    email: string;
    mobile_no: string;
    phone: string;
    notes?: string;
    assigned_to?: {
        id: number | null;
    } | null;
}