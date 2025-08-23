import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Edit, Loader2, Save } from "lucide-react";

interface ISaveButtonsProps {
    onProcessing: boolean;
    onMode: string;
    btnTitleCreate: string;
    btnTitleEdit?: string;
}

const SaveButtons = ({ 
    onProcessing = false,
    onMode,
    btnTitleCreate,
    btnTitleEdit
}: ISaveButtonsProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }} 
            whileTap={{ scale: 1.00 }}
            className="grid w-full lg:flex lg:justify-end"
        >
            <Button
                type="submit"
                size="lg"
                disabled={ onProcessing }
                className="cursor-pointer"
            >
            {onProcessing ? (
                <>
                    <Loader2 className="animate-spin mr-2" size={ 16 } />
                    Saving...
                </>
            ): (
                onMode === 'create' ? (
                    <>
                        <Save size={ 16 } />
                        { btnTitleCreate }
                    </>
                ) : (
                    <>
                        <Edit size={ 16 } />
                        { btnTitleEdit }
                    </>
                )
            )}
            </Button>
        </motion.div>
    );
}

export default SaveButtons;