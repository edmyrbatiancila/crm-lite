import { Column } from "@/types/shared/database-column";
import ActionButtons from "@/components/shared/action-buttons";
import { Projects } from "@/types/projects/IProject";

export const projectColumns = (
    onDelete: (id: number | null) => void,
    canEdit: boolean = true,
    canDelete: boolean = true
): Column<Projects>[] => {
    const columns: Column<Projects>[] = [
        { 
            label: "Title", 
            className: "min-w-[150px] max-w-[200px]",
            render: (c) => (
                <div className="font-medium truncate">
                    {c.title}
                </div>
            )
        },
        { 
            label: "Description", 
            className: "min-w-[200px] max-w-[280px] w-1/4",
            render: (c) => (
                <div className="whitespace-normal leading-relaxed py-2">
                    <p className="line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
                        {c.description}
                    </p>
                </div>
            )
        },
        { 
            label: "Deadline", 
            className: "min-w-[100px] max-w-[120px]",
            render: (c) => (
                <div className="text-sm">
                    {c.deadline_at}
                </div>
            )
        },
        { 
            label: "Status", 
            className: "min-w-[100px] max-w-[120px]",
            render: (c) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {c.status}
                </span>
            )
        },
    ];

    // Only show Actions column if user has any permissions
    if (canEdit || canDelete) {
        columns.push({
            label: "Actions",
            className: "text-right min-w-[100px] w-[120px]",
            render: (c) => (
                <ActionButtons 
                    editRoute="projects.edit"
                    renderParam={ c }
                    onDelete={ onDelete }
                    pageName="project"
                    canEdit={canEdit}
                    canDelete={canDelete}
                />
            ),
        });
    }

    return columns;
};
