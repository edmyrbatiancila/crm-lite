import ActionButtons from "@/components/shared/action-buttons";
import { Column } from "@/types/shared/database-column";
import { Tasks } from "@/types/tasks/ITasks";

export const taksColumns = (
    onDelete: (id: number | null) => void
): Column<Tasks>[] => [
    { 
        label: "Title", 
        render: (t) => t.title 
    },
    {
        label: "Description",
        className: "max-w-[100px] truncate",
        render: (t) => t.description
    },
    {
        label: "Deadline",
        render: (t) => t.deadline_at
    },
    {
        label: "Status",
        render: (t) => t.status
    },
    {
        label: "Actions",
        className: "text-right",
        render: (t) => (
            <ActionButtons
                editRoute="tasks.edit"
                renderParam={ t }
                onDelete={ onDelete }
                pageName="tasks"
            />
        )

    }
];

