import { Clients } from "@/types/clients/IClients";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";
// import { useState } from "react";
import DialogDelete from "../shared/dialog-delete";

interface IClientPageProps {
    clients: Clients[];
    onHandleDelete: (clientId: number | null) => void;
}

const ClientLists = ({ clients, onHandleDelete }: IClientPageProps) => {

    // const [selectedClientDelete, setSElectedClientDelete] = useState<number[]>([]);

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
                                    onClick={() => router.visit(route('clients.edit', Number(client.id)))}
                                >
                                    Edit
                                </Button>
                                <DialogDelete 
                                    getClientId={ client.id } 
                                    onDelete={ onHandleDelete(client.id) }
                                />
                                {/* <Button 
                                    size="sm" 
                                    variant="destructive" 
                                    onClick={() => onHandleDelete(Number(client.id))}
                                >
                                    Delete
                                </Button> */}
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