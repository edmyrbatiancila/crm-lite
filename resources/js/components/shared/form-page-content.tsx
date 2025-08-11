import { Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowLeft, Edit2, Loader2, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputError from "../input-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

interface IFormPageContentProps {
    headTitle: string;
}

const FormPageContent = ({
    headTitle
}: IFormPageContentProps) => {
    return (
        <>
            <Head title={ headTitle } />

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
                                    <InputError message={ errors.assigned_to } />
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
        </>
    );
}

export default FormPageContent;