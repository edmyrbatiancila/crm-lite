import { Edit2, Loader2, Save } from "lucide-react";
import InputError from "../input-error";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";
import { ClientForm, User } from "@/types/clients/IClients";
import SelectInput from "../shared/select-input";
// import { FormEventHandler } from "react";

interface IFormInputProps {
    onClientSubmit: (e: React.FormEvent) => void;
    onData: ClientForm;
    errors: Partial<Record<keyof ClientForm, string>>;
    processing: boolean;
    onInputTxtAreaChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelectChange: (name: keyof ClientForm, value: string) => void;
    isEditMode: boolean;
    users: User[];
}

const FormInput = ({
    onClientSubmit, 
    onData, 
    onInputTxtAreaChange, 
    errors, 
    processing, 
    isEditMode,
    onSelectChange,
    users 
}: IFormInputProps) => {
    return (
        <form onSubmit={ onClientSubmit } className="flex flex-col gap-6">
            <div className="grid lg:grid-cols-2 gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Client Name<span className="text-red-600 ml-2">*</span></Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={ onData.name }
                        onChange={ onInputTxtAreaChange }
                        placeholder="ABC Company"
                        className="shadow-md"
                        autoFocus
                        disabled={ processing }
                    />
                    <InputError message={ errors.name } />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Client Email<span className="text-red-600 ml-2">*</span></Label>
                    <Input 
                        type="email"
                        id="email"
                        name="email"
                        value={ onData.email }
                        onChange={ onInputTxtAreaChange }
                        placeholder="client@gmail.com"
                        className="shadow-md"
                        disabled={ processing }
                    />
                    <InputError message={ errors.email } />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="mobile_no">Mobile Number<span className="text-red-600 ml-2">*</span></Label>
                    <Input 
                        type="text"
                        id="mobile_no"
                        name="mobile_no"
                        value={ onData.mobile_no }
                        onChange={ onInputTxtAreaChange }
                        placeholder="09876543210"
                        className="shadow-md"
                        disabled={ processing }
                    />
                    <InputError message={ errors.mobile_no } />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                        type="text"
                        id="phone"
                        name="phone"
                        value={ onData.phone }
                        onChange={ onInputTxtAreaChange }
                        placeholder="123-456-789"
                        className="shadow-md"
                        disabled={ processing }
                    />
                    <InputError message={ errors.phone } />
                </div>
                <div className="grid gap-2">
                    <SelectInput<User>
                        label="Assign To"
                        htmlFor="assigned_to"
                        value={onData.assigned_to?.toString() || ''}
                        onChange={(value) => onSelectChange('assigned_to', value)}
                        placeholder="Select User"
                        data={users}
                        valueKey="id"
                        displayKey="first_name"
                        groupLabel="Existing User"
                        error={errors.assigned_to}
                        disabled={processing}
                    />
                </div>
            </div>
            <div className="grid w-full gap-3">
                <Label htmlFor="address">Client's Address<span className="text-red-600 ml-2">*</span></Label>
                <Textarea 
                    id="address"
                    name="address"
                    value={ onData.address }
                    onChange={ onInputTxtAreaChange }
                    placeholder="123 Main St."
                    className="h-20 shadow-md"
                    disabled={ processing }
                />
                <InputError message={ errors.address } />
            </div>
            <div className="grid w-full gap-3">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                    id="notes" 
                    name="notes"
                    value={ onData.notes }
                    onChange={ onInputTxtAreaChange }
                    placeholder="Enter your notes here.." 
                    className="h-30 shadow-md"
                    disabled={ processing }
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
                ))}
                </Button>
            </motion.div>
        </form>
    );
}

export default FormInput;