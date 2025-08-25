import DataLists from "@/components/shared/data-lists";
import PagePagination from "@/components/shared/page-pagination";
import SearchAndFilter from "@/components/shared/search-and-filter";
import SetupContent from "@/components/shared/setup-content";
import { projectColumns } from "@/constants/projects-table-columns";
import { projectFilterOptions, projectSortOptions } from "@/config/filters";
import { useFlashMessages } from "@/hooks/use-flash-messages";
import { useAuth } from "@/hooks/use-auth";
import { useSearchAndFilter } from "@/hooks/use-search-and-filter";
import { PermissionEnum } from "@/enums/RoleEnum";
import AppLayout from "@/layouts/app-layout";
import { Pagination } from "@/types/global";
import { projectBreadcrumbs, Projects } from "@/types/projects/IProject";
import { router } from "@inertiajs/react";
import { Rocket } from "lucide-react";
import { useMemo } from "react";

interface IProjectPageProps {
    projects: Pagination<Projects>;
}

const ProjectPage = ({ projects }: IProjectPageProps) => {
    useFlashMessages(); // Handle flash messages
    const { hasPermission, canManageProjects } = useAuth();

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

    const handleProjectDelete = (projectId: number | null) => {
        router.delete(route('projects.destroy', projectId?.toString()), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('project deleted');
            }
        });
    };

    // Check permissions for edit and delete actions
    const canEdit = hasPermission(PermissionEnum.EDIT_PROJECTS) || canManageProjects;
    const canDelete = hasPermission(PermissionEnum.DELETE_PROJECTS) || canManageProjects;

    // Filter and sort projects based on search and filter criteria
    const filteredProjects = useMemo(() => {
        let filtered = [...projects.data];

        // Apply search filter
        if (searchValue) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                project.description.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        // Apply filters
        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value) {
                filtered = filtered.filter(project => {
                    switch (key) {
                        case 'status':
                            return project.status === value;
                        case 'priority':
                            // This would need to be implemented based on your project priority structure
                            return true; // Placeholder
                        case 'budget_range':
                            // This would need to be implemented based on your project budget structure
                            return true; // Placeholder
                        case 'start_date':
                            // This would need to be implemented based on your project start_date structure
                            return true; // Placeholder
                        case 'deadline_at':
                            if (value instanceof Date) {
                                const projectDate = new Date(project.deadline_at);
                                return projectDate.toDateString() === value.toDateString();
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
    }, [projects.data, searchValue, activeFilters, sortValue, sortDirection]);

    return (
        <AppLayout breadcrumbs={ projectBreadcrumbs }>
            <SetupContent<Projects> 
                headTitle="Projects"
                onData={ filteredProjects }
                originalDataLength={projects.data.length}
                onDelete={ handleProjectDelete }
                setupDescription="Manage your projects efficiently."
                buttonTitle="New Project"
                createRoute="projects.create"
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
                            filterOptions={projectFilterOptions}
                            activeFilters={activeFilters}
                            onFilterChange={handleFilterChange}
                            sortOptions={projectSortOptions}
                            onReset={handleReset}
                            placeholder="Search projects by title or description..."
                        />
                        <DataLists<Projects>
                            keyExtractor={ (project) => project.id }
                            data={ onData }
                            columns={ projectColumns(onDelete, canEdit, canDelete) }
                        />
                    </>
                )) }
                emptyTitle="No Projects"
                emptyDescription="Get started by creating a new project."
                emptyHeadIcon={
                    <Rocket className="h-[34px] w-[34px] mx-auto" />
                }
            />
            <PagePagination links={ projects.links } />
        </AppLayout>
    );
}

export default ProjectPage;