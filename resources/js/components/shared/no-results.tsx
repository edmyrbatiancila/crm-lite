import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SearchX, RefreshCw } from "lucide-react";

interface NoResultsProps {
    title?: string;
    description?: string;
    onReset?: () => void;
    icon?: React.ReactNode;
}

const NoResults = ({ 
    title = "No results found",
    description = "Try adjusting your search or filter criteria to find what you're looking for.",
    onReset,
    icon
}: NoResultsProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-12 px-6 text-center"
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="mb-4"
            >
                {icon || <SearchX className="h-12 w-12 text-gray-400 dark:text-gray-500" />}
            </motion.div>
            
            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
                {title}
            </motion.h3>
            
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 dark:text-gray-400 mb-6 max-w-md"
            >
                {description}
            </motion.p>
            
            {onReset && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Button
                        variant="outline"
                        onClick={onReset}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw className="h-4 w-4" />
                        Clear filters
                    </Button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default NoResults;
