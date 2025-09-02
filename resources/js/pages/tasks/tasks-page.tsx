import DataLists from "@/components/shared/data-lists";
import PagePagination from "@/components/shared/page-pagination";
import SearchAndFilter from "@/components/shared/search-and-filter";
import SetupContent from "@/components/shared/setup-content";
import { taksColumns } from "@/constants/tasks-table-columns";
import { taskFilterOptions, taskSortOptions } from "@/config/filters";
import { useFlashMessages } from "@/hooks/use-flash-messages";
import { useAuth } from "@/hooks/use-auth";
import { useSearchAndFilter } from "@/hooks/use-search-and-filter";
import { PermissionEnum } from "@/enums/RoleEnum";
import AppLayout from "@/layouts/app-layout";
import { Pagination } from "@/types/global";
import { taskBreadcrumbs, Tasks } from "@/types/tasks/ITasks";
import { router } from "@inertiajs/react";
import { ClipboardPlus } from "lucide-react";
import { useMemo } from "react";

interface ITasksPageProps {
    tasks: Pagination<Tasks>;
}

const TasksPage = ({ tasks }: ITasksPageProps) => {
    console.log(tasks);

    useFlashMessages();
    const { hasPermission, canManageTasks } = useAuth();

    // Search and filter state
    const {
        searchValue,
        sortValue,
        sortDirection,
        activeFilters,
        handleSearchChange,
        handleSortChange,
        handleFilterChange,
        handleReset
    } = useSearchAndFilter({
        initialSort: 'title',
        initialSortDirection: 'asc'
    });

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

    // Filter and sort tasks based on search and filter criteria
    const filteredTasks = useMemo(() => {
        let filtered = [...tasks.data];

        // Apply search filter
        if (searchValue) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                task.description.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Apply filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value) {
                filtered = filtered.filter(task => {
                    switch (key) {
                        case 'status':
                            return task.status === value;
                        case 'priority':
                            // This would need to be implemented based on your task priority structure
                            return true; // Placeholder
                        case 'category':
                            // This would need to be implemented based on your task category structure
                            return true; // Placeholder
                        case 'deadline_at':
                            if (value instanceof Date) {
                                const taskDate = new Date(task.deadline_at);
                                return taskDate.toDateString() === value.toDateString();
                            }
                            return true;
                        default:
                            return true;
                    }
                });
            }
        });

        // Apply sorting
        if (sortValue) {
            filtered.sort((a, b) => {
                let aValue: string | Date, bValue: string | Date;
                
                switch (sortValue) {
                    case 'title':
                        aValue = a.title;
                        bValue = b.title;
                        break;
                    case 'status':
                        aValue = a.status;
                        bValue = b.status;
                        break;
                    case 'deadline_at':
                        aValue = new Date(a.deadline_at);
                        bValue = new Date(b.deadline_at);
                        break;
                    default:
                        return 0;
                }

                if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [tasks.data, searchValue, activeFilters, sortValue, sortDirection]);

    return (
        <AppLayout breadcrumbs={ taskBreadcrumbs }>
            <SetupContent<Tasks> 
                headTitle="Tasks"
                onData={ filteredTasks }
                originalDataLength={tasks.data.length}
                onDelete={ handleTaskDelete }
                setupDescription="Manage your tasks efficiently"
                buttonTitle="New Task"
                createRoute="tasks.create"
                onResetFilters={handleReset}
                hasActiveFilters={searchValue !== '' || Object.values(activeFilters).some(v => v)}
                renderList={ ((onData, onDelete) => (
                    <>
                        <SearchAndFilter
                            searchValue={searchValue}
                            onSearchChange={handleSearchChange}
                            sortValue={sortValue}
                            sortDirection={sortDirection}
                            onSortChange={handleSortChange}
                            filterOptions={taskFilterOptions}
                            activeFilters={activeFilters}
                            onFilterChange={handleFilterChange}
                            sortOptions={taskSortOptions}
                            onReset={handleReset}
                            placeholder="Search tasks by title or description..."
                        />
                        <DataLists<Tasks>
                            keyExtractor={ (task) => task.id }
                            data={onData}
                            columns={ taksColumns(onDelete, canEdit, canDelete) }
                        />
                    </>
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