import ProjectFormInputs from "@/components/projects/project-form-inputs";
import FormPageContent from "@/components/shared/form-page-content";
import { useFlashMessages } from "@/hooks/use-flash-messages";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { ClientProject, ProjectForm, UserProject } from "@/types/projects/IProject";
import { useForm } from "@inertiajs/react";

interface IPropjectCreationPageProps {
    project?: ProjectForm;
    users: UserProject[];
    clients: ClientProject[];
    projectStatuses: { value: string; label: string }[];
    mode: string;
}

const ProjectCreationPage = ({ project, users, clients, projectStatuses, mode }: IPropjectCreationPageProps) => {
    useFlashMessages(); // Handle flash messages

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: mode === 'edit' ? 'Edit Project' : 'Create New Project',
            href: mode === 'create' ? '/projects/create' : `/projects/${project?.id}/edit`
        }
    ];

    const { data, setData, post, put, processing, errors, reset } = useForm<Required<ProjectForm>>({
        id: project?.id ?? null,
        title: project?.title ?? '',
        description: project?.description ?? '',
        client_id: project?.client_id ?? null,
        user_id: project?.user_id ?? null,
        deadline_at: project?.deadline_at ?? '',
        status: project?.status ?? ''

    });

    const handleSelectChange = (name: keyof ProjectForm, value: string) => {
        if (name === 'user_id' || name === 'client_id') {
            setData(name, Number(value));
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (mode === 'edit' && project?.id) {
            put(route('projects.update', project.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                }
            });
        } else {
            post(route('projects.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={ breadcrumbs }>
            <FormPageContent
                headTitle={ mode === 'edit' ? 'Edit Project' : 'Create New Project' }
                backRoute="projects.index"
                backButton="Back to Projects"
                formTitle="project"
            >
                <ProjectFormInputs 
                    errors={errors}
                    onData={data}
                    users={users}
                    clients={clients}
                    projectStatuses={projectStatuses}
                    onSelectChange={ handleSelectChange }
                    processing={ processing }
                    mode={ mode }
                    onSubmit={ handleSubmit }
                />
            </FormPageContent>
        </AppLayout>
    );
}

export default ProjectCreationPage;