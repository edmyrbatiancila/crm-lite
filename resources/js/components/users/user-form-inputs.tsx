import { UserForm } from "@/types/users/IUsers";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputError from "../input-error";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Edit, Loader2, Save } from "lucide-react";

interface IUserFormInputsProps {
    onUserSubmit: (e: React.FormEvent) => void;
    onData: UserForm;
    errors: Partial<Record<keyof UserForm, string>>;
    processing: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // isEditMode: boolean;
    mode: string;
}

const UserFormInputs = ({
    onUserSubmit,
    onData,
    errors,
    processing,
    onInputChange,
    // isEditMode,
    mode
}: IUserFormInputsProps) => {
    return (
        <form onSubmit={ onUserSubmit } className="flex flex-col gap-6">
            {/* <div className="grid lg:grid-cols-2 gap-6"> */}
                <div className="grid gap-2">
                    <Label htmlFor="firstName">
                        First Name<span className="text-red-600 ml-2">*</span>
                    </Label>
                    <Input 
                        type="text"
                        id="firstName"
                        name="first_name"
                        value={ onData.first_name }
                        onChange={ onInputChange }
                        placeholder="Enter user's first name"
                        className="shadow-md"
                        autoFocus
                        disabled={ processing }
                    />
                    <InputError message={ errors.first_name } />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="lastName">
                        Last Name<span className="text-red-600 ml-2">*</span>
                    </Label>
                    <Input 
                        type="text"
                        id="lastName"
                        name="last_name"
                        value={ onData.last_name }
                        onChange={ onInputChange }
                        placeholder="Enter user's last name"
                        className="shadow-md"
                        disabled={ processing }
                    />
                    <InputError message={ errors.last_name } />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">
                        Email address<span className="text-red-600 ml-2">*</span>
                    </Label>
                    <Input 
                        id="email"
                        type="email"
                        name="email"
                        value={ onData.email }
                        onChange={ onInputChange }
                        placeholder="Enter user's email"
                        className="shadow-md"
                        disabled={ processing }
                    />
                    <InputError message={errors.email} />
                </div>
            {mode === 'create' && (
                <div className="grid gap-2">
                    <Label htmlFor="password">
                        Password<span className="text-red-600 ml-2">*</span>
                    </Label>
                    <Input 
                        id="password"
                        type="password"
                        name="password"
                        value={ onData.password }
                        onChange={ onInputChange }
                        placeholder={ "Enter user's password" }
                        className="shadow-md"
                        disabled={ processing }
                    />
                    <InputError message={errors.password} />
                </div>
            )}
                
            {/* </div> */}
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
                {mode === 'create' ? (
                    <>
                    {processing ? (
                        <>
                            <Loader2 className="animate-spin" size={ 16 } />
                            Saving...
                        </>
                            
                    ) : (
                        <>
                        <Save size={ 16 } />
                        Save User
                        </>
                        
                    )}
                    </>
                ) : (
                    <>
                    {processing ? (
                        <>
                            <Loader2 className="animate-spin" size={ 16 } />
                            Updating...
                        </>
                    ): (
                        <>
                            <Edit size={ 16 } />
                            Update User
                        </>
                    )}
                    </>
                )}
                    </Button>
                </motion.div>
        </form>
    );
}

export default UserFormInputs;