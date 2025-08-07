import { Clients } from "@/types/clients/IClients";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";

interface IClientPageProps {
    clients: Clients[];
}

const ClientLists = ({ clients }: IClientPageProps) => {
    return (
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
                            <TableCell>{client.assigned_to?.name ?? '-'}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={() => router.visit(route('clients.edit', client.id))}
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
    );
}

export default ClientLists;