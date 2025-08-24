import ActionButtons from "@/components/shared/action-buttons";
import { Leads } from "@/types/leads/ILeads";
import { Column } from "@/types/shared/database-column";

export const leadColumns = (
    onDelete: (id: number | null) => void,
    canEdit: boolean = true,
    canDelete: boolean = true
): Column<Leads>[] => {
    const columns: Column<Leads>[] = [
        { label: "Client Name", render: (l) => l.client_id.name ?? "-" },
        { label: "Lead Source", render: (l) => l.lead_source_id?.name ?? "-" },
        { label: "Assign To", render: (l) => l.assigned_to?.first_name ?? "-" },
        {label: "Status", render: (l) => l.status},
        {
            label: "Notes", 
            className: "min-w-[200px] max-w-[300px]",
            render: (l) => (
                <div className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                    {l.notes || "-"}
                </div>
            )
        },
    ];

    // Only show Actions column if user has any permissions
    if (canEdit || canDelete) {
        columns.push({
            label: "Actions",
            className: "text-right",
            render: (l) => (
                <ActionButtons 
                    editRoute="leads.edit"
                    renderParam={ l }
                    onDelete={ onDelete }
                    pageName="lead"
                    canEdit={canEdit}
                    canDelete={canDelete}
                />
            )
        });
    }

    return columns;
};