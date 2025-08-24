import { Clients } from "@/types/clients/IClients";
// import { Button } from "@/components/ui/button";
// import DialogDelete from "@/components/shared/dialog-delete";
// import { router } from "@inertiajs/react";
import { Column } from "@/types/shared/database-column";
import ActionButtons from "@/components/shared/action-buttons";

export const clientColumns = (
    onDelete: (id: number | null) => void,
    canEdit: boolean = true,
    canDelete: boolean = true
): Column<Clients>[] => {
    const columns: Column<Clients>[] = [
        { label: "Name", render: (c) => c.name },
        { label: "Email", render: (c) => c.email },
        { label: "Phone", render: (c) => c.phone },
        { 
            label: "Notes", 
            className: "min-w-[200px] max-w-[300px]",
            render: (c) => (
                <div className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                    {c.notes || "-"}
                </div>
            )
        },
        { label: "Assigned To", render: (c) => c.assigned_to?.first_name ?? "-" },
    ];

    // Only show Actions column if user has any permissions
    if (canEdit || canDelete) {
        columns.push({
            label: "Actions",
            render: (c) => (
                <ActionButtons 
                    editRoute="clients.edit"
                    renderParam={ c }
                    onDelete={ onDelete }
                    pageName="client"
                    canEdit={canEdit}
                    canDelete={canDelete}
                />
            ),
        });
    }

    return columns;
};
