import ActionButtons from "@/components/shared/action-buttons";
import { User } from "@/types";
import { Column } from "@/types/shared/database-column";

export const userColumns = (
    onDelete: (id: number | null) => void
): Column<User>[] => [

    { label: "First Name", render: (u) => u.first_name },
    { label: "Last Name", render: (u) => u.last_name },
    { label: "Email Address", render: (u) => u.email },
    { label: "Creation Date", render: (u) => u.created_at },
    {
        label: "Actions",
        className: 'text-right',
        render: (u) => (
            <ActionButtons 
                editRoute="users.edit"
                renderParam={ u }
                onDelete={ onDelete }
                pageName="user"
            />
        )
    }
]