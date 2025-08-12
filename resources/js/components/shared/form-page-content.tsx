import { Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface IFormPageContentProps {
    headTitle: string;
    backRoute: string;
    backButton: string;
    formTitle: string;
    children: React.ReactNode;
}

const FormPageContent = ({
    headTitle,
    backRoute,
    backButton,
    formTitle,
    children
}: IFormPageContentProps) => {
    return (
        <>
            <Head title={ headTitle } />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 p-4"
            >
                <motion.div 
                    whileHover={{ scale: 1.01 }} 
                    whileTap={{ scale: 1.00 }}
                    className="flex"
                >
                    <Button
                        size="lg"
                        onClick={ () => router.visit(route(backRoute)) }
                        className="cursor-pointer"
                    >
                        <ArrowLeft size={ 16 } />
                        <span>{ backButton }</span>
                    </Button>
                </motion.div>

                <Card className="shadow-md py-10">
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            Fill out the form below to create a new { formTitle }.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        { children }
                    </CardContent>
                </Card>
            </motion.div>
        </>
    );
}

export default FormPageContent;