import DataLists from "@/components/shared/data-lists";
import PagePagination from "@/components/shared/page-pagination";
import SetupContent from "@/components/shared/setup-content";
import { taksColumns } from "@/constants/tasks-table-columns";
import { useFlashMessages } from "@/hooks/use-flash-messages";
import { useAuth } from "@/hooks/use-auth";
import { PermissionEnum } from "@/enums/RoleEnum";
import AppLayout from "@/layouts/app-layout";
import { Pagination } from "@/types/global";
import { taskBreadcrumbs, Tasks } from "@/types/tasks/ITasks";
import { router } from "@inertiajs/react";
import { ClipboardPlus } from "lucide-react";

interface ITasksPageProps {
    tasks: Pagination<Tasks>;
}

const TasksPage = ({ tasks }: ITasksPageProps) => {
    useFlashMessages();
    const { hasPermission, canManageTasks } = useAuth();

    const handleTaskDelete = (taskId: number | null) => {
        router.delete(route('tasks.destroy', taskId?.toString()), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('task deleted');
            }
        })
    };

    // Check permissions for edit and delete actions
    const canEdit = hasPermission(PermissionEnum.EDIT_TASKS) || canManageTasks;
    const canDelete = hasPermission(PermissionEnum.DELETE_TASKS) || canManageTasks;

    return (
        <AppLayout breadcrumbs={ taskBreadcrumbs }>
            <SetupContent<Tasks> 
                headTitle="Tasks"
                onData={ tasks.data }
                onDelete={ handleTaskDelete }
                setupDescription="Manage your tasks efficiently"
                buttonTitle="New Task"
                createRoute="tasks.create"
                renderList={ ((onData, onDelete) => (
                    <DataLists<Tasks>
                        keyExtractor={ (task) => task.id }
                        data={onData}
                        columns={ taksColumns(onDelete, canEdit, canDelete) }
                    />
                )) }
                emptyTitle="No Tasks"
                emptyDescription="Get Started by creating a new task"
                emptyHeadIcon={ 
                    <ClipboardPlus className="h-[34px] w-[34px] mx-auto" />
                }
            />
            <PagePagination links={ tasks.links } />
        </AppLayout>
    );
}

export default TasksPage;