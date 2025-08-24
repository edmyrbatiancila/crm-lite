import ActionButtons from "@/components/shared/action-buttons";
import { User } from "@/types";
import { Column } from "@/types/shared/database-column";

export const userColumns = (
    onDelete: (id: number | null) => void,
    canEdit: boolean = true,
    canDelete: boolean = true
): Column<User>[] => {
    const columns: Column<User>[] = [
        { label: "First Name", render: (u) => u.first_name },
        { label: "Last Name", render: (u) => u.last_name },
        { label: "Email Address", render: (u) => u.email },
        { label: "Creation Date", render: (u) => u.created_at },
    ];

    // Only show Actions column if user has any permissions
    if (canEdit || canDelete) {
        columns.push({
            label: "Actions",
            render: (u) => (
                <ActionButtons 
                    editRoute="users.edit"
                    renderParam={ u }
                    onDelete={ onDelete }
                    pageName="user"
                    canEdit={canEdit}
                    canDelete={canDelete}
                />
            )
        });
    }

    return columns;
}