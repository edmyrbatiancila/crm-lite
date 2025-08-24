import { router } from "@inertiajs/react";
import { Button } from "../ui/button";
import DialogDelete from "./dialog-delete";

interface IActionButtonsProps {
    editRoute: string;
    renderParam: any;
    onDelete: (id: number | null) => void;
    pageName: string;
    canEdit?: boolean;
    canDelete?: boolean;
}

const ActionButtons = ({ 
    editRoute, 
    renderParam, 
    onDelete, 
    pageName, 
    canEdit = true, 
    canDelete = true 
}: IActionButtonsProps) => {
    // If user has no edit or delete permissions, don't show any buttons
    if (!canEdit && !canDelete) {
        return null;
    }

    return (
        <div className="space-x-2">
            {canEdit && (
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.visit(route(editRoute, Number(renderParam.id)))}
                    className="cursor-pointer"
                >
                    Edit
                </Button>
            )}
            {canDelete && (
                <DialogDelete 
                    getClientId={renderParam.id} 
                    onDelete={() => onDelete(renderParam.id)}
                    getDataName={pageName}
                />
            )}
        </div>
    );
}

export default ActionButtons;