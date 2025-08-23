import DataLists from "@/components/shared/data-lists";
import PagePagination from "@/components/shared/page-pagination";
import SetupContent from "@/components/shared/setup-content";
import { projectColumns } from "@/constants/projects-table-columns";
import { useFlashMessages } from "@/hooks/use-flash-messages";
import AppLayout from "@/layouts/app-layout";
import { Pagination } from "@/types/global";
import { projectBreadcrumbs, Projects } from "@/types/projects/IProject";
import { router } from "@inertiajs/react";
import { Rocket } from "lucide-react";

interface IProjectPageProps {
    projects: Pagination<Projects>;
}

const ProjectPage = ({ projects }: IProjectPageProps) => {
    useFlashMessages(); // Handle flash messages

    const handleProjectDelete = (projectId: number | null) => {
        router.delete(route('projects.destroy', projectId?.toString()), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('project deleted');
            }
        });
    };

    return (
        <AppLayout breadcrumbs={ projectBreadcrumbs }>
            <SetupContent<Projects> 
                headTitle="Projects"
                onData={ projects.data }
                onDelete={ handleProjectDelete }
                setupDescription="Manage your projects efficiently."
                buttonTitle="New Project"
                createRoute="projects.create"
                renderList={ ((onData, onDelete) => (
                    <DataLists<Projects>
                        keyExtractor={ (project) => project.id }
                        data={ onData }
                        columns={ projectColumns(onDelete) }
                    />
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