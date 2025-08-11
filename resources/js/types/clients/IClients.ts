import { AssignTo } from "../shared/assign-to";

export interface Clients {
    id: number | null;
    name: string;
    email: string;
    mobile_no: string;
    phone: string;
    address: string;
    notes?: string;
    assigned_to?: AssignTo;
}

export interface ClientForm {
    id: number | null;
    name: string;
    email: string;
    mobile_no: string;
    phone: string;
    address: string;
    notes?: string;
    assigned_to?: number | null;
}

export interface User {
    id: number;
    name: string;
}