import FormPageContent from "@/components/shared/form-page-content";
import TaskFormInput from "@/components/tasks/task-form-input";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { CurrentUser } from "@/types/shared/assign-to";
import { TaskForm } from "@/types/tasks/ITasks";
import { useForm } from "@inertiajs/react";

interface ITaskCreationPageProps {
    task?: TaskForm;
    users: { id: number; first_name: string; last_name: string }[];
    clients: { id: number; name: string }[];
    projects: { id: number; title: string }[];
    taskStatuses: { value: string; label: string }[];
    mode: string;
    currentUser: CurrentUser;
}

const TaskCreationPage = ({
    task,
    users,
    clients,
    projects,
    taskStatuses,
    mode,
    currentUser
}: ITaskCreationPageProps) => {

    const breadCrumbs: BreadcrumbItem[] = [
        {
            title: mode === "edit" ? "Edit Task" : "Create New Task",
            href: mode === "create" ? '/tasks/create' : `/tasks/${ task?.id }/edit`
        }
    ];

    const { data, setData, post, put, processing, reset, errors } = useForm<Required<TaskForm>>({
        id: task?.id ?? null,
        title: task?.title ?? '',
        description: task?.description ?? '',
        client_id: task?.client_id ?? null,
        user_id: task?.user_id ?? (currentUser.role !== 'admin' ? currentUser.id : null),
        project_id: task?.project_id ?? null,
        deadline_at: task?.deadline_at ?? '',
        status: task?.status ?? ''
    });

    const handleChange = (name: keyof TaskForm, value: string) => {
        if (name === 'user_id' || name === 'client_id' || name === 'project_id') {
            setData(name, Number(value));
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (mode === 'edit' && task?.id) {
            put(route('tasks.update', task.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                } 
            });
        } else {
            post(route('tasks.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={ breadCrumbs }>
            <FormPageContent
                headTitle={ mode === 'create' ? 'Create New Task' : 'Edit Task' }
                backRoute="tasks.index"
                backButton="Back to Tasks"
                formTitle="task"
            >
                <TaskFormInput 
                    onData={ data }
                    onProcessing={ processing }
                    onChange={ handleChange }
                    onErrors={ errors }
                    users={ users }
                    clients={ clients }
                    projects={ projects }
                    taskStatuses={ taskStatuses }
                    onSubmit={ handleSubmit }
                    mode={ mode }
                    currentUser={ currentUser }
                />
            </FormPageContent>
        </AppLayout>
    );
}

export default TaskCreationPage;