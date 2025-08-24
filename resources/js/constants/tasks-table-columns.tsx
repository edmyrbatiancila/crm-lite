import ActionButtons from "@/components/shared/action-buttons";
import { Column } from "@/types/shared/database-column";
import { Tasks } from "@/types/tasks/ITasks";

export const taksColumns = (
    onDelete: (id: number | null) => void,
    canEdit: boolean = true,
    canDelete: boolean = true
): Column<Tasks>[] => {
    const columns: Column<Tasks>[] = [
        { 
            label: "Title", 
            className: "min-w-[150px] max-w-[200px]",
            render: (t) => (
                <div className="font-medium truncate">
                    {t.title}
                </div>
            )
        },
        {
            label: "Description",
            className: "min-w-[200px] max-w-[280px] w-1/4",
            render: (t) => (
                <div className="whitespace-normal leading-relaxed py-2">
                    <p className="line-clamp-2 text-sm text-gray-700 dark:text-gray-300">
                        {t.description}
                    </p>
                </div>
            )
        },
        {
            label: "Deadline",
            className: "min-w-[100px] max-w-[120px]",
            render: (t) => (
                <div className="text-sm">
                    {t.deadline_at}
                </div>
            )
        },
        {
            label: "Status",
            className: "min-w-[100px] max-w-[120px]",
            render: (t) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {t.status}
                </span>
            )
        },
    ];

    // Only show Actions column if user has any permissions
    if (canEdit || canDelete) {
        columns.push({
            label: "Actions",
            render: (t) => (
                <ActionButtons
                    editRoute="tasks.edit"
                    renderParam={ t }
                    onDelete={ onDelete }
                    pageName="tasks"
                    canEdit={canEdit}
                    canDelete={canDelete}
                />
            )
        });
    }

    return columns;
};

