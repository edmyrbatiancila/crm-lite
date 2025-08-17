

import React from "react";
import FormPageContent from "@/components/shared/form-page-content";
import UserFormInputs from "@/components/users/user-form-inputs";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { UserForm } from "@/types/users/IUsers";
import { useForm } from "@inertiajs/react";
import { useFlashMessages } from "@/hooks/use-flash-messages";

interface IUsersCreationPageProps {
    user?: UserForm;
    mode: string;
}

const UsersCreationPage = ({ user, mode }: IUsersCreationPageProps) => {
    // const isEditMode = !!user;
    useFlashMessages(); // Handle flash messages

    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: user?.id ?? null,
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        email: user?.email ?? '',
        password: '' // Always start with empty password
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: mode === 'edit' ? 'Edit User' : 'Create New User',
            href: mode === 'create' ? `/users/${user?.id}/edit` : '/users/create',
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleUserSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'edit' && data.id) {
            put(route('users.update', data.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset('password');
                }
            });
        } else {
            post(route('users.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FormPageContent
                headTitle={mode === 'edit' ? 'Edit User' : 'Create New User'}
                backRoute="users.index"
                backButton="Back to Users"
                formTitle="user"
            >
                <UserFormInputs
                    onUserSubmit={handleUserSubmit}
                    onData={data}
                    errors={errors}
                    processing={processing}
                    onInputChange={handleInputChange}
                    // isEditMode={isEditMode}
                    mode={ mode }
                />
            </FormPageContent>
        </AppLayout>
    );
};

export default UsersCreationPage;