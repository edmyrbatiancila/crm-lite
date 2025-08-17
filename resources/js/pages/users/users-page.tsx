import DataLists from "@/components/shared/data-lists";
import PagePagination from "@/components/shared/page-pagination";
import SetupContent from "@/components/shared/setup-content";
import { userColumns } from "@/constants/user-table-columns";
import AppLayout from "@/layouts/app-layout";
import { User } from "@/types";
import { Pagination } from "@/types/global";
import { userBreadcrumbs } from "@/types/users/IUsers";
import { router } from "@inertiajs/react";
import { UserPlusIcon } from "lucide-react";
import { useFlashMessages } from "@/hooks/use-flash-messages";

interface IUsersPageProps {
    users: Pagination<User>;
}

const handleDelete = (userId: number | null) => {
    console.log(userId);
    router.delete(route('users.destroy', userId?.toString()), {
        preserveScroll: true,
    });
    
};


export default function UsersPage({ users }: IUsersPageProps) {
    useFlashMessages(); // Handle flash messages

    console.log(users);

    return (
        <AppLayout breadcrumbs={userBreadcrumbs}>
            <SetupContent<User> 
                headTitle="Users"
                onData={ users.data }
                setupDescription="Manage adding new users"
                buttonTitle="New Users"
                createRoute="users.create"
                onDelete={ handleDelete }
                renderList={ ((onData, onDelete) => (
                    <DataLists<User>
                        keyExtractor={ (user) => user.id }
                        data={ onData }
                        columns={ userColumns(onDelete) }
                    />
                )) }
                emptyTitle="No Users"
                emptyDescription="Get started by creating a new user"
                emptyHeadIcon={ <UserPlusIcon className="h-[34px] w-[34px] mx-auto" /> }
            />
            <PagePagination links={ users.links } />
        </AppLayout>
    );
}