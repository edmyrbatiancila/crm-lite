import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Clients } from "@/types/clients/IClients";

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
    console.log(clients);
    return (
        <AppLayout breadcrumbs={ breadcrumbs }>
            <h1 className="text-2xl">testing</h1>
        </AppLayout>
    );
}

export default ClientPage;