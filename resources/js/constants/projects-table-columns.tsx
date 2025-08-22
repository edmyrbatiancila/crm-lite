import { Column } from "@/types/shared/database-column";
import ActionButtons from "@/components/shared/action-buttons";
import { Projects } from "@/types/projects/IProject";

export const projectColumns = (
    onDelete: (id: number | null) => void
): Column<Projects>[] => [
    { label: "Title", render: (c) => c.title },
    { 
        label: "Description", 
        className: "max-w-[100px] truncate",
        render: (c) => c.description 
    },
    { label: "Deadline", render: (c) => c.deadline_at },
    { label: "Status", render: (c) => c.status },
    {
        label: "Actions",
        className: "text-right",
        render: (c) => (
            <ActionButtons 
                editRoute="projects.edit"
                renderParam={ c }
                onDelete={ onDelete }
                pageName="project"
            />
        ),
    },
];
