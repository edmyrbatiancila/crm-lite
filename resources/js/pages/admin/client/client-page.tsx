// import ClientLists from "@/components/clients/client-lists";
import DataLists from "@/components/shared/data-lists";
import PagePagination from "@/components/shared/page-pagination";
import SetupContent from "@/components/shared/setup-content";
import { clientColumns } from "@/constants/clients-table-columns";
import AppLayout from "@/layouts/app-layout";
import { showSuccess } from "@/lib/alert";
import { clientBreadcrumbs, Clients } from "@/types/clients/IClients";
import { Pagination } from "@/types/global";
import { router } from "@inertiajs/react";
import { UserPlus2Icon } from "lucide-react";


interface IClientPageProps {
    clients: Pagination<Clients>;
}

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Clients',
//         href: '/clients',
//     }
// ];

const ClientPage = ({ clients }: IClientPageProps) => {

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

    return (
        <AppLayout breadcrumbs={ clientBreadcrumbs }>
            <SetupContent<Clients> 
                headTitle="Clients"
                onData={ clients.data }
                onDelete={ handleDelete }
                setupDescription="Manage your client relationships and accounts."
                buttonTitle="New Client"
                createRoute="clients.create"
                renderList={ ((onData, onDelete) => (
                    <DataLists<Clients> 
                        keyExtractor={ (client) => client.id }
                        data={ onData }
                        columns={ clientColumns(onDelete) }
                    />
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