import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { showSuccess } from "@/lib/alert";
import { BreadcrumbItem } from "@/types";
import { ClientForm, User } from "@/types/clients/IClients";
import { Head, router, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowLeft, Edit2, Loader2, Save } from "lucide-react";
import { FormEventHandler } from "react";

interface IClientFormPageProps {
    users: User[];
    client?: ClientForm;
}

const ClientFormPage = ({ users, client }: IClientFormPageProps) => {
    
    const isEditMode = !!client;

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: isEditMode ? 'Edit Client' : 'Create New Client',
        href: isEditMode ? `/clients/${client?.id}/edit` : '/clients/create',
    }
];

    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ClientForm>>({
        id: client?.id ?? null,
        name: client?.name ?? '',
        email: client?.email ?? '',
        mobile_no: client?.mobile_no ?? '',
        phone: client?.phone ?? '',
        address: client?.address ?? '',
        notes: client?.notes ?? '',
        assigned_to: client?.assigned_to ?? null
    });

    const handleClientSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (client) {
            // Edit mode: update
            put(route('clients.update', client.id), {
                preserveScroll: true,
                onSuccess: () => {
                    showSuccess('Client updated successfully!');
                }
            });
        } else {
            // Create mode
            post(route('clients.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    showSuccess('Client added successfully!');
                    reset();
                }
            });
        }
    }

    console.log('assigned_to:', data.assigned_to);

    return (
        <AppLayout breadcrumbs={ breadcrumbs }>
            <Head title={isEditMode ? 'Edit Client' : 'Create New Client'} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 p-4"
            >
                <motion.div 
                    whileHover={{ scale: 1.01 }} 
                    whileTap={{ scale: 1.00 }}
                    className="flex"
                >
                    <Button
                        size="lg"
                        onClick={ () => router.visit(route('clients.index')) }
                        className="cursor-pointer"
                    >
                        <ArrowLeft size={ 16 } />
                        <span>Back to Clients</span>
                    </Button>
                </motion.div>

                <Card className="shadow-md py-10">
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            Fill out the form below to create a new client.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={ handleClientSubmit } className="flex flex-col gap-6">
                            <div className="grid lg:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Client Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={ data.name }
                                        onChange={ (e) => setData('name', e.target.value) }
                                        placeholder="ABC Company"
                                        className="shadow-md"
                                    />
                                    <InputError message={ errors.name } />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Client Email</Label>
                                    <Input 
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={ data.email }
                                        onChange={ (e) => setData('email', e.target.value) }
                                        placeholder="client@gmail.com"
                                        className="shadow-md"
                                    />
                                    <InputError message={ errors.email } />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="mobile_no">Mobile Number</Label>
                                    <Input 
                                        type="text"
                                        id="mobile_no"
                                        name="mobile_no"
                                        value={ data.mobile_no }
                                        onChange={ (e) => setData('mobile_no', e.target.value) }
                                        placeholder="09876543210"
                                        className="shadow-md"
                                    />
                                    <InputError message={ errors.mobile_no } />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input 
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={ data.phone }
                                        onChange={ (e) => setData('phone', e.target.value) }
                                        placeholder="123-456-789"
                                        className="shadow-md"
                                    />
                                    <InputError message={ errors.phone } />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="assigned_to">Assign To</Label>
                                    <Select
                                        value={ data.assigned_to?.toString() || '' }
                                        onValueChange={ (e) => setData('assigned_to', Number(e)) }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select User" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Existing User</SelectLabel>
                                            {users.map((user) => (
                                                <SelectItem key={ user.id } value={ user.id.toString() }>
                                                    { user.name }
                                                </SelectItem>
                                            ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid w-full gap-3">
                                <Label htmlFor="address">Client's Address</Label>
                                <Textarea 
                                    id="address"
                                    name="address"
                                    value={ data.address }
                                    onChange={ (e) => setData('address', e.target.value) }
                                    placeholder="123 Main St."
                                    className="h-20 shadow-md"
                                />
                                <InputError message={ errors.address } />
                            </div>
                            <div className="grid w-full gap-3">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea 
                                    id="notes" 
                                    name="notes"
                                    value={ data.notes }
                                    onChange={ (e) => setData('notes', e.target.value) }
                                    placeholder="Enter your notes here.." 
                                    className="h-30 shadow-md"
                                />
                                <InputError message={ errors.notes } />
                            </div>
                            <motion.div 
                                whileHover={{ scale: 1.01 }} 
                                whileTap={{ scale: 1.00 }}
                                className="grid w-full lg:flex lg:justify-end"
                            >
                                <Button 
                                    type="submit" 
                                    size="lg"
                                    disabled={ processing }
                                    className="cursor-pointer"
                                >
                                {processing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={ 16 }/>
                                        Saving...
                                    </>
                                ): (
                                    !isEditMode ? (
                                        <>
                                            <Save size={ 16 } />
                                            Save Client
                                        </>
                                    ) : (
                                        <>
                                            <Edit2 size={ 16 } />
                                            Update Client
                                        </>
                                    )
                                    
                                )}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </AppLayout>
    );
}

export default ClientFormPage;