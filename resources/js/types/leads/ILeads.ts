import { AssignTo } from "../shared/assign-to";

export interface ClientLeads {
    id: number | null;
    name: string;
}

export interface LeadSourceLeads {
    id: number | null;
    name: string;
}

export interface Leads {
    id: number | null;
    client_id: ClientLeads;
    lead_source_id?: LeadSourceLeads;
    assigned_to?: AssignTo;
    status: string;
    notes?: string;
}

export interface LeadsForm {
    id: number | null;
    client_id: number | null;
    lead_source_id?: number | null;
    assigned_to?: number | null;
    status: string;
    notes?: string;
}