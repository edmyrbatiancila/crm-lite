import DataLists from "@/components/shared/data-lists";
import PagePagination from "@/components/shared/page-pagination";
import SetupContent from "@/components/shared/setup-content";
import { projectColumns } from "@/constants/projects-table-columns";
import AppLayout from "@/layouts/app-layout";
import { Pagination } from "@/types/global";
import { Projects } from "@/types/projects/IProject";
import { Rocket } from "lucide-react";

interface IProjectPageProps {
    projects: Pagination<Projects>;
}

const ProjectPage = ({ projects }: IProjectPageProps) => {

    const handleProjectDelete = (projectId: number | null) => {
        console.log(projectId);
        // TODO: Implement project deletion soon...
    };

    return (
        <AppLayout>
            <SetupContent<Projects> 
                headTitle="Projects"
                onData={ projects.data }
                onDelete={ handleProjectDelete }
                setupDescription="Manage your projects and tasks efficiently."
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