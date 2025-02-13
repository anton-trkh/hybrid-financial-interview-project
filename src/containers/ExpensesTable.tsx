import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from '../state/store';
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { add } from "../state/expensesSlice";
import FormatDate from "../Utils/FormatDate";
import { isTransactionAmountValid, withDefaultTransactionType } from "../Utils/Validation";
import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import NewEntryRow from "./NewEntryRow";
import ExpensesRow from "./ExpensesRow";

export default function ExpensesTable() {
    const dispatch = useDispatch();
    const tableElements = useSelector((state: RootState) => state.transactionTable.transactions)

    const [date, setDate] = useState<string>(FormatDate(dayjs(Date.now())));
    const [amount, setAmount] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [isTransactionDateValid, setIsTransactionDateValid] = useState<boolean>(true);

    if (tableElements === null) {
        return null;
    }
    const rows = tableElements.map(ExpensesRow);

    const onAdd = () => {
        dispatch(add({
            id: Date.now(),
            date: date,
            amount,
            type: withDefaultTransactionType(type)
        }));
        // date will not be reset to ease adding multiple entries over a single day
        setAmount("");
        setType("");
    };

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
    const isAddButtonDisabled = transactionAmountIsInvalid || !isTransactionDateValid;

    return (
        <>
            <TableContainer>
                <Table aria-label="financial table">
                    <TableHead aria-label="financial table header">
                        <TableRow>
                            <TableCell>
                                Date
                            </TableCell>
                            <TableCell>
                                Amount
                            </TableCell>
                            <TableCell>
                                Type
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                    <TableFooter>
                        <NewEntryRow
                            key={0}
                            date={date} 
                            amount={amount} 
                            type={type} 
                            isAddButtonDisabled={isAddButtonDisabled}
                            amountHasError={transactionAmountIsInvalid && amount !== ""}
                            handleDateChange={handleDateChange} 
                            setAmount={setAmount} 
                            setType={setType}
                            onAdd={onAdd}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}