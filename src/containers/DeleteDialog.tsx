import { useDispatch } from "react-redux";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { remove } from "../state/expensesSlice";

interface IDeleteDialog {
    elementId: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function DeleteDialog({
    elementId,
    isOpen,
    onClose
}: IDeleteDialog) {
    const dispatch = useDispatch();

    const confirmRemove = () => {
        dispatch(remove(elementId));
        onClose();
    }
    return (
        <Dialog 
            open={isOpen}
            sx={{
                justifyContent: "center"
            }}
        >
            <DialogTitle>
                Are you certain you wish to delete this item? This action is irreversible.
            </DialogTitle>
            <DialogActions>
                <Button onClick={onClose} aria-labelledby="cancel delete">Cancel</Button>
                <Button onClick={confirmRemove} data-testid="confirm-remove-button" aria-labelledby="confirm delete">Delete</Button>
            </DialogActions>
        </Dialog>
    );
}