import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { isTransactionAmountValid, withDefaultTransactionType } from "../Utils/Validation";
import FormatDate from "../Utils/FormatDate";
import { Button, Dialog, DialogActions, DialogTitle, List, ListItem } from "@mui/material";
import DateSelector from "../components/DateSelector";
import TextInput from "../components/TextInput";
import dayjs, { Dayjs } from "dayjs";
import { modify } from "../state/expensesSlice";
import AutocompleteTextInput from "../components/AutocompleteTextInput";
import { typeOptions } from "../types/defaultTransactionTypes";

interface IModifyDialog {
    elementId: number;
    defaultDate: string;
    defaultAmount: string;
    defaultType: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function ModifyDialog({
    elementId,
    defaultDate,
    defaultAmount,
    defaultType,
    isOpen,
    onClose
}: IModifyDialog) {
    const dispatch = useDispatch();
    const [date, setDate] = useState<string>(defaultDate);
    const [amount, setAmount] = useState<string>(defaultAmount);
    const [type, setType] = useState<string>(defaultType);
    const [isTransactionDateValid, setIsTransactionDateValid] = useState<boolean>(true);

    const confirmChange = () => {
        dispatch(modify({
            id: elementId,
            date,
            amount,
            type: withDefaultTransactionType(type)
        }));
        onClose();
    }
    const cancelChange = () => {
        setDate(defaultDate);
        setAmount(defaultAmount);
        setType(defaultType);
        onClose();
    }
    const handleDateChange = (date: Dayjs | null, validation: PickerChangeHandlerContext<DateValidationError>) => {
        setDate(FormatDate(date));
        if (isTransactionDateValid && validation?.validationError) {
            setIsTransactionDateValid(false);
        }
        else if (!isTransactionDateValid && !validation?.validationError) {
            setIsTransactionDateValid(true);
        }
    }
    const transactionAmountIsInvalid = !isTransactionAmountValid(amount);

    const isConfirmButtonDisabled = transactionAmountIsInvalid || !isTransactionDateValid;
    const amountHasError = transactionAmountIsInvalid && amount !== '';
    return (
        <Dialog 
            open={isOpen}
        >
            <DialogTitle>
                Please enter the new data
            </DialogTitle>
            <List>
                <ListItem aria-labelledby="transaction date">
                    <DateSelector
                        title="Transaction Date"
                        value={dayjs(date)}
                        handleValueChangeWithError={handleDateChange}
                    />
                </ListItem>
                <ListItem aria-labelledby="transaction amount" data-testid="edit-amount-input">
                    <TextInput
                        title="Transaction amount"
                        value={amount}
                        onChange={setAmount}
                        error={amountHasError ? "Please enter a non-zero transaction amount" : undefined}
                    />
                </ListItem>
                <ListItem aria-labelledby="transaction type" data-testid="edit-type-input">
                    <AutocompleteTextInput 
                        value={type}
                        options={typeOptions} 
                        title={"Transaction type"} 
                        onChange={setType}                    
                    />
                </ListItem>
            </List>
            <DialogActions>
                <Button onClick={cancelChange} aria-labelledby="cancel modification">Cancel</Button>
                <Button
                    data-testid="confirm-edit-button"
                    onClick={confirmChange} 
                    disabled={isConfirmButtonDisabled} 
                    aria-labelledby="confirm modification"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}