import DataLists from "@/components/shared/data-lists";
import PagePagination from "@/components/shared/page-pagination";
import SearchAndFilter from "@/components/shared/search-and-filter";
import SetupContent from "@/components/shared/setup-content";
import { userColumns } from "@/constants/user-table-columns";
import { userFilterOptions, userSortOptions } from "@/config/filters";
import { useSearchAndFilter } from "@/hooks/use-search-and-filter";
import AppLayout from "@/layouts/app-layout";
import { User } from "@/types";
import { Pagination } from "@/types/global";
import { userBreadcrumbs } from "@/types/users/IUsers";
import { router } from "@inertiajs/react";
import { UserPlusIcon } from "lucide-react";
import { useFlashMessages } from "@/hooks/use-flash-messages";
import { useAuth } from "@/hooks/use-auth";
import { PermissionEnum } from "@/enums/RoleEnum";
import { useMemo } from "react";

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
    const { hasPermission, canManageUsers } = useAuth();

    // Search and filter state
    const {
        searchValue,
        sortValue,
        sortDirection,
        activeFilters,
        handleSearchChange,
        handleSortChange,
        handleFilterChange,
        handleReset
    } = useSearchAndFilter({
        initialSort: 'first_name',
        initialSortDirection: 'asc'
    });

    // Check permissions for edit and delete actions
    const canEdit = hasPermission(PermissionEnum.EDIT_USERS) || canManageUsers;
    const canDelete = hasPermission(PermissionEnum.DELETE_USERS) || canManageUsers;

    // Filter and sort users based on search and filter criteria
    const filteredUsers = useMemo(() => {
        let filtered = [...users.data];

        // Apply search filter
        if (searchValue) {
            filtered = filtered.filter(user =>
                user.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.last_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                user.email.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Apply filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value) {
                filtered = filtered.filter(user => {
                    switch (key) {
                        case 'role':
                            // This would need to be implemented based on your user role structure
                            return true; // Placeholder
                        case 'status':
                            // This would need to be implemented based on your user status structure
                            return true; // Placeholder
                        case 'created_at':
                            if (value instanceof Date) {
                                const userDate = new Date(user.created_at);
                                return userDate.toDateString() === value.toDateString();
                            }
                            return true;
                        case 'department':
                            // This would need to be implemented based on your user department structure
                            return true; // Placeholder
                        default:
                            return true;
                    }
                });
            }
        });

        // Apply sorting
        if (sortValue) {
            filtered.sort((a, b) => {
                let aValue: string | Date, bValue: string | Date;
                
                switch (sortValue) {
                    case 'first_name':
                        aValue = a.first_name;
                        bValue = b.first_name;
                        break;
                    case 'last_name':
                        aValue = a.last_name;
                        bValue = b.last_name;
                        break;
                    case 'email':
                        aValue = a.email;
                        bValue = b.email;
                        break;
                    case 'created_at':
                        aValue = new Date(a.created_at);
                        bValue = new Date(b.created_at);
                        break;
                    default:
                        return 0;
                }

                if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [users.data, searchValue, activeFilters, sortValue, sortDirection]);

    console.log(users);

    return (
        <AppLayout breadcrumbs={userBreadcrumbs}>
            <SetupContent<User> 
                headTitle="Users"
                onData={ filteredUsers }
                originalDataLength={users.data.length}
                setupDescription="Manage adding new users"
                buttonTitle="New Users"
                createRoute="users.create"
                onDelete={ handleDelete }
                onResetFilters={handleReset}
                hasActiveFilters={searchValue !== '' || Object.values(activeFilters).some(v => v)}
                renderList={ ((onData, onDelete) => (
                    <>
                        <SearchAndFilter
                            searchValue={searchValue}
                            onSearchChange={handleSearchChange}
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            onSortChange={handleSortChange}
                            filterOptions={userFilterOptions}
                            activeFilters={activeFilters}
                            onFilterChange={handleFilterChange}
                            sortOptions={userSortOptions}
                            onReset={handleReset}
                            placeholder="Search users by name or email..."
                        />
                        <DataLists<User>
                            keyExtractor={ (user) => user.id }
                            data={ onData }
                            columns={ userColumns(onDelete, canEdit, canDelete) }
                        />
                    </>
                )) }
                emptyTitle="No Users"
                emptyDescription="Get started by creating a new user"
                emptyHeadIcon={ <UserPlusIcon className="h-[34px] w-[34px] mx-auto" /> }
            />
            <PagePagination links={ users.links } />
        </AppLayout>
    );
}