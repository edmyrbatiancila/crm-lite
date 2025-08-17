import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface IDialogDeleteProps {
    getClientId: number | null;
    onDelete: (clientId: number | null) => void;
    getDataName: string;
}

const DialogDelete = ({ getClientId, onDelete, getDataName }: IDialogDeleteProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    size="sm" 
                    variant="destructive" 
                    className="cursor-pointer"
                >
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        <span className="text-2xl">Warning!!!</span>
                    </DialogTitle>
                    <DialogDescription className="text-center space-y-2">
                        <p className="text-xl">You are about to delete this { getDataName }.</p>
                        <p className="text-lg">Are you sure you want to proceed?</p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-center items-center">
                    <DialogClose asChild>
                        <Button 
                            variant="outline"
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button 
                        variant="destructive" 
                        onClick={() => onDelete(getClientId)}
                        className="cursor-pointer"
                    >
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DialogDelete;