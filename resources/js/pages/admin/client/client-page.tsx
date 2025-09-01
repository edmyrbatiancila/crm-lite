// import ClientLists from "@/components/clients/client-lists";
import DataLists from "@/components/shared/data-lists";
import PagePagination from "@/components/shared/page-pagination";
import SearchAndFilter from "@/components/shared/search-and-filter";
import SetupContent from "@/components/shared/setup-content";
import { clientColumns } from "@/constants/clients-table-columns";
import { clientFilterOptions, clientSortOptions } from "@/config/filters";
import { useAuth } from "@/hooks/use-auth";
import { useSearchAndFilter } from "@/hooks/use-search-and-filter";
import { PermissionEnum } from "@/enums/RoleEnum";
import AppLayout from "@/layouts/app-layout";
import { showSuccess } from "@/lib/alert";
import { clientBreadcrumbs, Clients } from "@/types/clients/IClients";
import { Pagination } from "@/types/global";
import { router } from "@inertiajs/react";
import { UserPlus2Icon } from "lucide-react";
import { useMemo } from "react";


interface IClientPageProps {
    clients: Pagination<Clients>;
}

const ClientPage = ({ clients }: IClientPageProps) => {
    const { hasPermission, canManageClients } = useAuth();

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
        initialSort: 'name',
        initialSortDirection: 'asc'
    });

    console.log(clients);

    const handleDelete =  (clientId: number | null) => {
        router.delete(route('clients.destroy', clientId?.toString()), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('client deleted');
                showSuccess('Client successfully deleted!');
            }
        });
    };

    // Check permissions for edit and delete actions
    const canEdit = hasPermission(PermissionEnum.EDIT_CLIENTS) || canManageClients;
    const canDelete = hasPermission(PermissionEnum.DELETE_CLIENTS) || canManageClients;

    // Filter and sort clients based on search and filter criteria
    const filteredClients = useMemo(() => {
        let filtered = [...clients.data];

        // Apply search filter
        if (searchValue) {
            filtered = filtered.filter(client =>
                client.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                client.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                (client.phone && client.phone.toLowerCase().includes(searchValue.toLowerCase()))
            );
        }

        // Apply filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value) {
                filtered = filtered.filter(client => {
                    switch (key) {
                        case 'status':
                            // This would need to be implemented based on your client status structure
                            return true; // Placeholder
                        case 'industry':
                            // This would need to be implemented based on your client industry structure
                            return true; // Placeholder
                        case 'company_size':
                            // This would need to be implemented based on your client company size structure
                            return true; // Placeholder
                        case 'assigned_to':
                            return client.assigned_to?.first_name.toLowerCase().includes(String(value).toLowerCase()) || false;
                        default:
                            return true;
                    }
                });
            }
        });

        // Apply sorting
        if (sortValue) {
            filtered.sort((a, b) => {
                let aValue: string, bValue: string;
                
                switch (sortValue) {
                    case 'name':
                        aValue = a.name;
                        bValue = b.name;
                        break;
                    case 'email':
                        aValue = a.email;
                        bValue = b.email;
                        break;
                    case 'phone':
                        aValue = a.phone || '';
                        bValue = b.phone || '';
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
    }, [clients.data, searchValue, activeFilters, sortValue, sortDirection]);

    return (
        <AppLayout breadcrumbs={ clientBreadcrumbs }>
            <SetupContent<Clients> 
                headTitle="Clients"
                onData={ filteredClients }
                originalDataLength={clients.data.length}
                onDelete={ handleDelete }
                setupDescription="Manage your client relationships and accounts."
                buttonTitle="New Client"
                createRoute="clients.create"
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
                            filterOptions={clientFilterOptions}
                            activeFilters={activeFilters}
                            onFilterChange={handleFilterChange}
                            sortOptions={clientSortOptions}
                            onReset={handleReset}
                            placeholder="Search clients by name, email, or phone..."
                        />
                        <DataLists<Clients> 
                            keyExtractor={ (client) => client.id }
                            data={ onData }
                            columns={ clientColumns(onDelete, canEdit, canDelete) }
                        />
                    </>
                )) }
                emptyTitle="No Clients"
                emptyDescription="Get started by creating a new client"
                emptyHeadIcon={ 
                    <UserPlus2Icon className="h-[34px] w-[34px] mx-auto" /> 
                }
            />
            <PagePagination links={ clients.links } />
        </AppLayout>
    );
}

export default ClientPage;