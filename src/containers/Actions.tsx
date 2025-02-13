import { useState } from "react";
import { IconButton } from "@mui/material";
import ModifyDialog from "./ModifyDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteDialog from "./DeleteDialog";

interface IActions{
    id: number;
    date: string;
    amount: string;
    type: string;
}

export default function Actions({
    id,
    date,
    amount,
    type
}: IActions) {
    const [isModifyDialogOpen, setIsModifyDialogOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

    return (
        <>
            <IconButton data-testid={`edit-button-${id}`} aria-label="modify entry" onClick={() => setIsModifyDialogOpen(true)}>
                <EditIcon />
            </IconButton>
            <IconButton data-testid={`remove-button-${id}`} aria-label="delete entry" onClick={() => setIsDeleteDialogOpen(true)}>
                <DeleteIcon />
            </IconButton>
            <ModifyDialog 
                elementId={id}
                defaultDate={date}
                defaultAmount={amount}
                defaultType={type}
                isOpen={isModifyDialogOpen}
                onClose={() => setIsModifyDialogOpen(false)}
            />
            <DeleteDialog 
                elementId={id} 
                isOpen={isDeleteDialogOpen} 
                onClose={() => setIsDeleteDialogOpen(false)}
            />
        </>
    );
}