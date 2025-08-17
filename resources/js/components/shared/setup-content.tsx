import { Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import EmptyState from "./empty-state";

interface ISetupContentProps<T> {
    headTitle: string;
    onData: T[];
    setupDescription: string;
    onDelete: (id: number | null) => void;
    buttonTitle: string;
    createRoute: string;
    renderList: (data: T[], onDelete: (id: number | null) => void) => React.ReactNode;
    emptyTitle: string;
    emptyDescription: string;
    emptyHeadIcon: React.ReactNode;
}

const SetupContent = <T,> ({
    headTitle, 
    onData, 
    onDelete,
    setupDescription,
    buttonTitle,
    createRoute,
    renderList,
    emptyTitle,
    emptyDescription,
    emptyHeadIcon,
}: ISetupContentProps<T>) => {
    return (
        <>
            <Head title={ headTitle } />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 p-4"
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
                <EmptyState 
                    headIcon={ emptyHeadIcon }
                    title={ emptyTitle }
                    description={ emptyDescription }
                    // buttonIcon={ emptyButtonIcon }
                    buttonTitle={ buttonTitle }
                    onCreateRoute={ createRoute }
                />
            )}
            </motion.div>
        </>
    );
}

export default SetupContent;