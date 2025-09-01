export interface AssignTo {
    id: number | null;
    first_name: string
}

export interface CurrentUser {
    id: number;
    role: string;
    canAssignToOthers: boolean;
}