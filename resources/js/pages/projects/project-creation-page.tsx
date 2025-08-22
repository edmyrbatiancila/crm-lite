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
    mode: string;
}

const ProjectCreationPage = ({ project, users, clients, mode }: IPropjectCreationPageProps) => {
    useFlashMessages(); // Handle flash messages

    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: project?.id ?? null,
        name: project?.title ?? '',
        description: project?.description ?? '',
        client_id: project?.client_id ?? null,
        user_id: project?.user_id ?? null
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: mode === 'edit' ? 'Edit Project' : 'Create New Project',
            href: mode === 'create' ? '/projects/create' : `/projects/${project?.id}/edit`
        }
    ];

    return (
        <AppLayout breadcrumbs={ breadcrumbs }>
            <FormPageContent
                headTitle={ mode === 'edit' ? 'Edit Project' : 'Create New Project' }
                backRoute="projects.index"
                backButton="Back to Projects"
                formTitle="project"
            >
                <ProjectFormInputs 
                    errors={ errors }
                />
            </FormPageContent>
        </AppLayout>
    );
}

export default ProjectCreationPage;