import { IconButton, TableCell, TableRow } from "@mui/material";
import DateSelector from "../components/DateSelector";
import dayjs, { Dayjs } from "dayjs";
import TextInput from "../components/TextInput";
import AddIcon from '@mui/icons-material/Add';
import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { typeOptions } from "../types/defaultTransactionTypes";
import AutocompleteTextInput from "../components/AutocompleteTextInput";

interface INewEntryRow{
    date: string;
    amount: string;
    type: string;
    isAddButtonDisabled: boolean;
    amountHasError: boolean;
    handleDateChange: (date: Dayjs | null, validation: PickerChangeHandlerContext<DateValidationError>) => void;
    setAmount: (value: string) => void;
    setType: (value: string) => void;
    onAdd: () => void;
}

export default function NewEntryRow({
    date,
    amount,
    type,
    isAddButtonDisabled,
    amountHasError,
    handleDateChange,
    setAmount,
    setType,
    onAdd
}: INewEntryRow) {
    return (
        <TableRow aria-label="new entry row">
            <TableCell data-testid="new-row-date-input" aria-labelledby="transaction date">
                <DateSelector
                    title="Transaction Date"
                    value={dayjs(date)}
                    handleValueChangeWithError={handleDateChange}
                />
            </TableCell>
            <TableCell data-testid="new-row-amount-input" aria-labelledby="transaction-amount">
                <TextInput
                    title="Transaction amount"
                    error={amountHasError ? "Please enter a non-zero transaction amount" : undefined}
                    value={amount}
                    onChange={setAmount}
                />
            </TableCell>
            <TableCell aria-labelledby="transaction type" data-testid="new-row-type-input"> 
                <AutocompleteTextInput
                    value={type}
                    options={typeOptions} 
                    title={"Transaction type"} 
                    onChange={setType}                    
                />
            </TableCell>
            <TableCell>
                <IconButton
                    aria-label="add transaction"
                    data-testid="add-button"
                    onClick={onAdd} 
                    disabled={isAddButtonDisabled}
                    sx={{
                        marginBottom: 3
                    }}
                >
                    <AddIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
