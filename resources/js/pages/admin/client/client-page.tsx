import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Clients } from "@/types/clients/IClients";
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
    console.log(clients);
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

                <Card className="shadow-xl border rounded-2xl">
                    <CardContent className="overflow-x-auto p-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Assigned To</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.email}</TableCell>
                                    <TableCell>{client.phone}</TableCell>
                                    <TableCell>{client.assigned_to?.name ?? "Unassigned"}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            // onClick={() => handleEdit(client)}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            variant="destructive" 
                                            // onClick={() => handleDelete(client.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>
        </AppLayout>
    );
}

export default ClientPage;