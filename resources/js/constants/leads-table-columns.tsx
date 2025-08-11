import ActionButtons from "@/components/shared/action-buttons";
import { Leads } from "@/types/leads/ILeads";
import { Column } from "@/types/shared/database-column";

export const leadColumns = (
    onDelete: (id: number | null) => void
): Column<Leads>[] => [
    { label: "Client Name", render: (l) => l.client_id.name ?? "-" },
    { label: "Lead Source", render: (l) => l.lead_source_id?.name ?? "-" },
    { label: "Assign To", render: (l) => l.assigned_to?.name ?? "-" },
    {label: "Status", render: (l) => l.status},
    {label: "Notes", render: (l) => l.notes},
    {
        label: "Actions",
        className: "text-right",
        render: (l) => (
            <ActionButtons 
                editRoute="leads.edit"
                renderParam={ l }
                onDelete={ onDelete }
            />
        )
    }
];