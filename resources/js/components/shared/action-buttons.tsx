import { router } from "@inertiajs/react";
import { Button } from "../ui/button";
import DialogDelete from "./dialog-delete";

interface IActionButtonsProps {
    editRoute: string;
    renderParam: any;
    onDelete: (id: number | null) => void;
    pageName: string;
}

const ActionButtons = ({ editRoute, renderParam, onDelete, pageName }: IActionButtonsProps) => {
    return (
        <div className="space-x-2">
            <Button
                size="sm"
                variant="outline"
                onClick={() => router.visit(route(editRoute, Number(renderParam.id)))}
                className="cursor-pointer"
            >
                Edit
            </Button>
            <DialogDelete 
                getClientId={renderParam.id} 
                onDelete={() => onDelete(renderParam.id)}
                getDataName={pageName}
            />

        </div>
    );
}

export default ActionButtons;