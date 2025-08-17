import { Clients } from "@/types/clients/IClients";
// import { Button } from "@/components/ui/button";
// import DialogDelete from "@/components/shared/dialog-delete";
// import { router } from "@inertiajs/react";
import { Column } from "@/types/shared/database-column";
import ActionButtons from "@/components/shared/action-buttons";

export const clientColumns = (
    onDelete: (id: number | null) => void
): Column<Clients>[] => [
    { label: "Name", render: (c) => c.name },
    { label: "Email", render: (c) => c.email },
    { label: "Phone", render: (c) => c.phone },
    { label: "Assigned To", render: (c) => c.assigned_to?.first_name ?? "-" },
    {
        label: "Actions",
        className: "text-right",
        render: (c) => (
            <ActionButtons 
                editRoute="clients.edit"
                renderParam={ c }
                onDelete={ onDelete }
                pageName="client"
            />
            // <div className="space-x-2">
            //     <Button
            //         size="sm"
            //         variant="outline"
            //         onClick={() => router.visit(route("clients.edit", Number(c.id)))}
            //     >
            //         Edit
            //     </Button>
            //     <DialogDelete getClientId={c.id} onDelete={() => onDelete(c.id)} />
            // </div>
        ),
    },
];
