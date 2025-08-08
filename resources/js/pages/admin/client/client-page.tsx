import ClientLists from "@/components/clients/client-lists";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Clients } from "@/types/clients/IClients";
// import { PageProps } from "@/types/shared/flash";
import { Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";


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

    // const handleDelete = async (clientId: number) => {
    //     // TODO: Need to put the logic here when the button is trigger for showing dialog. Then from the dialog, when user clicked confirm, this function will be use.
    // };

    return (
        <AppLayout breadcrumbs={ breadcrumbs }>
            <Head title="Clients" />
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 p-4"
            >
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-gray-600 mt-2">Manage your client relationships and accounts.</p>
                    </div>
                    <div>
                        <Button 
                            size="lg"
                            onClick={ ()=> router.visit(route('clients.create')) }
                        >
                            <Plus size={ 16 } />
                            New
                        </Button>
                    </div>
                </div>

                <ClientLists 
                    clients={ clients } 
                    // onHandleDelete={ handleDelete }
                />

            </motion.div>
        </AppLayout>
    );
}

export default ClientPage;