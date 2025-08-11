import { router } from "@inertiajs/react";
import { Button } from "../ui/button";
import DialogDelete from "./dialog-delete";

interface IActionButtonsProps {
    editRoute: string;
    renderParam: any;
    onDelete: (id: number | null) => void;
}

const ActionButtons = ({ editRoute, renderParam, onDelete }: IActionButtonsProps) => {
    return (
        <div className="space-x-2">
            <Button
                size="sm"
                variant="outline"
                onClick={() => router.visit(route(editRoute, Number(renderParam.id)))}
            >
                Edit
            </Button>
            <DialogDelete getClientId={renderParam.id} onDelete={() => onDelete(renderParam.id)} />
        </div>
    );
}

export default ActionButtons;