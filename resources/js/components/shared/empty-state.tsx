import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";

interface IEmptyStateProps {
    headIcon: React.ReactNode;
    title: string;
    description: string;
    buttonIcon: React.ReactNode;
    buttonTitle: string;
}

const EmptyState = ({
    headIcon,
    title,
    description,
    buttonIcon,
    buttonTitle
}: IEmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mx-auto max-w-md text-center">
                { headIcon }
                <h2 className="mt-6 text-xl font-semibold">{ title }</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                    { description }
                </p>
                
            </div>
            <motion.div 
                className="mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Button
                    size="lg"
                    onClick={ ()=> router.visit(route('clients.create')) }
                >
                    { buttonIcon }
                    { buttonTitle }
                    </Button>
            </motion.div>
        </div>
    );
}

export default EmptyState;