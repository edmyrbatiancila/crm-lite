import DataLists from "@/components/shared/data-lists";
import SetupContent from "@/components/shared/setup-content";
import { leadColumns } from "@/constants/leads-table-columns";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Leads } from "@/types/leads/ILeads";
import { UserPlus2 } from "lucide-react";

interface ILeadPageProps {
    leads: Leads[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leads',
        href: '/leads',
    }
];

const LeadPage = ({ leads }: ILeadPageProps) => {

    const handleDeleteLeads = () => {
        // TODO: implement delete loads functionality soon...
    };

    return (
        <AppLayout breadcrumbs={ breadcrumbs }>
            <SetupContent<Leads> 
                headTitle="Leads"
                onData={ leads }
                onDelete={ handleDeleteLeads }
                setupDescription="Manage your leads relationships and accounts."
                buttonTitle="New Leads"
                createRoute="leads.create"
                renderList={ ((onData, onDelete) => (
                    <DataLists<Leads> 
                        keyExtractor={ (lead) => lead.id }
                        data={ onData }
                        columns={ leadColumns(onDelete) }
                    />
                )) }
                emptyTitle="No Leads"
                emptyDescription="Get started by creting a new leads"
                emptyHeadIcon={ <UserPlus2 className="h-[34px] w-[34px] mx-auto" /> }
            />
        </AppLayout>
    );
}

export default LeadPage;