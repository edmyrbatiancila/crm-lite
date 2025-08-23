import DataLists from "@/components/shared/data-lists";
import PagePagination from "@/components/shared/page-pagination";
import SetupContent from "@/components/shared/setup-content";
import { taksColumns } from "@/constants/tasks-table-columns";
import { useFlashMessages } from "@/hooks/use-flash-messages";
import AppLayout from "@/layouts/app-layout";
import { Pagination } from "@/types/global";
import { taskBreadcrumbs, Tasks } from "@/types/tasks/ITasks";
import { ClipboardPlus } from "lucide-react";

interface ITasksPageProps {
    tasks: Pagination<Tasks>;
}

const TasksPage = ({ tasks }: ITasksPageProps) => {
    useFlashMessages();

    const handleTaskDelete = (taskId: number | null) => {
        console.log(taskId);

        // TODO: Implement task deletion soon...
    }

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
                        columns={ taksColumns(onDelete) }
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