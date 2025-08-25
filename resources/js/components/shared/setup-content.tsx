import { Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import EmptyState from "./empty-state";
import NoResults from "./no-results";

interface ISetupContentProps<T> {
    headTitle: string;
    onData: T[];
    originalDataLength?: number; // To distinguish between no data and filtered results
    setupDescription: string;
    onDelete: (id: number | null) => void;
    buttonTitle: string;
    createRoute: string;
    renderList: (data: T[], onDelete: (id: number | null) => void) => React.ReactNode;
    emptyTitle: string;
    emptyDescription: string;
    emptyHeadIcon: React.ReactNode;
    onResetFilters?: () => void; // Function to reset filters
    hasActiveFilters?: boolean; // Whether filters are currently applied
}

const SetupContent = <T,> ({
    headTitle, 
    onData, 
    originalDataLength = 0,
    onDelete,
    setupDescription,
    buttonTitle,
    createRoute,
    renderList,
    emptyTitle,
    emptyDescription,
    emptyHeadIcon,
    onResetFilters,
    hasActiveFilters = false,
}: ISetupContentProps<T>) => {
    const isFiltered = hasActiveFilters && originalDataLength > 0;
    
    return (
        <>
            <Head title={ headTitle } />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 p-4 pb-20"
            >
            {onData.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <p className="text-gray-600 mt-2">{ setupDescription }</p>
                        </div>
                        <div>
                            <Button
                                size="lg"
                                className="cursor-pointer"
                                onClick={ ()=> router.visit(route(createRoute)) }
                            >
                                <Plus size={ 16 } />
                                { buttonTitle }
                            </Button>
                        </div>
                    </div>

                    { renderList(onData, onDelete) }
                </>
            ) : (
                <>
                    {isFiltered ? (
                        <NoResults
                            title="No results found"
                            description="No items match your current search and filter criteria. Try adjusting your filters or search terms."
                            onReset={onResetFilters}
                        />
                    ) : (
                        <EmptyState 
                            headIcon={ emptyHeadIcon }
                            title={ emptyTitle }
                            description={ emptyDescription }
                            buttonTitle={ buttonTitle }
                            onCreateRoute={ createRoute }
                        />
                    )}
                </>
            )}
            </motion.div>
        </>
    );
}

export default SetupContent;