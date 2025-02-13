import { TableCell, TableRow } from "@mui/material";
import Actions from "./Actions";
import Expense from "../types/expense";

export default function ExpensesRow({id, date: date, amount, type}: Expense) {
    return (
        <TableRow key={id} aria-label="transaction record" data-testid={`data-row-${id}`}>
            <TableCell aria-label="transaction date">
                {date}
            </TableCell>
            <TableCell aria-label="transaction amount">
                ${amount}
            </TableCell>
            <TableCell aria-label="transaction descrition">
                {type}
            </TableCell>
            <TableCell>
                <Actions 
                    id={id} 
                    date={date} 
                    amount={amount} 
                    type={type} 
                />
            </TableCell>
        </TableRow>
    );
}