import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { ClientForm } from "@/types/clients/IClients";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create New Client',
        href: '/clients/create'
    }
];

const CreateClientPage = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ClientForm>>({
        name: '',
        email: '',
        mobile_no: '',
        phone: '',
        notes: '',
        assigned_to: null
    });

    return (
        <AppLayout breadcrumbs={ breadcrumbs }>
            <Head title="Create New Client" />

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
                    >
                        <ArrowLeft size={ 16 } />
                        <span>Back to Clients</span>
                    </Button>
                </motion.div>

                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            Fill out the form below to create a new client.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-6">
                            <div className="grid lg:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Client Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={ data.name }
                                        onChange={ (e) => setData('name', e.target.value) }
                                    />
                                    <InputError message={ errors.name } />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Client Email</Label>
                                    <Input 
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={ data.email }
                                        onChange={ (e) => setData('email', e.target.value) }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Mobile Number</Label>
                                    <Input 
                                        type="text"
                                        id="mobile_no"
                                        name="mobile_no"
                                        value={ data.mobile_no }
                                        onChange={ (e) => setData('mobile_no', e.target.value) }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Phone Number</Label>
                                    <Input 
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={ data.phone }
                                        onChange={ (e) => setData('phone', e.target.value) }
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </AppLayout>
    );
}

export default CreateClientPage;