import FormInput from "@/components/clients/form-input";
import FormPageContent from "@/components/shared/form-page-content";
import AppLayout from "@/layouts/app-layout";
import { showSuccess } from "@/lib/alert";
import { BreadcrumbItem } from "@/types";
import { ClientForm, User, CurrentUser } from "@/types/clients/IClients";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface IClientFormPageProps {
    users: User[];
    client?: ClientForm;
    currentUser: CurrentUser;
}

const ClientFormPage = ({ users, client, currentUser }: IClientFormPageProps) => {
    
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
        assigned_to: client?.assigned_to ?? (!currentUser.canAssignToOthers ? currentUser.id : null)
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof ClientForm, value);
    };

    const handleSelectChange = (name: keyof ClientForm, value: string) => {
        setData(name, Number(value));
    };

    const handleClientSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (client) {
            // Edit mode: update
            put(route('clients.update', Number(client.id)), {
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
            <FormPageContent
                headTitle={ isEditMode ? 'Edit Client' : 'Create New Client' }
                backRoute="clients.index"
                backButton="Back to Clients"
                formTitle="client"
            >
                <FormInput 
                    onClientSubmit={ handleClientSubmit }
                    onData={ data }
                    errors={ errors }
                    processing={ processing }
                    onInputTxtAreaChange={ handleChange }
                    onSelectChange={ handleSelectChange }
                    isEditMode={ isEditMode }
                    users={ users }
                    currentUser={ currentUser }
                />
            </FormPageContent>
        </AppLayout>
    );
}

export default ClientFormPage;