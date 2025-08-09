// import ClientLists from "@/components/clients/client-lists";
import DataLists from "@/components/shared/data-lists";
import SetupContent from "@/components/shared/setup-content";
import { clientColumns } from "@/constants/clients-table-columns";
import AppLayout from "@/layouts/app-layout";
import { showSuccess } from "@/lib/alert";
import { BreadcrumbItem } from "@/types";
import { Clients } from "@/types/clients/IClients";
import { router } from "@inertiajs/react";
import { Plus, UserPlus2Icon } from "lucide-react";


interface IClientPageProps {
    clients: Clients[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: '/clients',
    }
];

const ClientPage = ({ clients }: IClientPageProps) => {

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
        <AppLayout breadcrumbs={ breadcrumbs }>
            <SetupContent<Clients> 
                headTitle="Clients"
                onData={ clients }
                onDelete={ handleDelete }
                setupDescription="Manage your client relationships and accounts."
                buttonTitle="New Client"
                createRoute="clients.create"
                renderList={ ((onData, onDelete) => (
                    <DataLists<Clients> 
                        keyExtractor={ (client) => client.id }
                        data={ onData }
                        columns={clientColumns(onDelete)}
                    />
                )) }
                emptyTitle="No Clients"
                emptyDescription="Get started by creating a new client"
                emptyHeadIcon={ <UserPlus2Icon className="h-[34px] w-[34px] mx-auto" /> }
                emptyButtonIcon={ <Plus size={ 16 } /> }
            />
        </AppLayout>
    );
}

export default ClientPage;