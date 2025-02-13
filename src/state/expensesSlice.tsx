import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Expense from "../types/expense";
import { persistance } from "../types/constants";

interface ExpensesState {
    transactions: Expense[];
}

const initialState: ExpensesState = {
    transactions: [
        {
            id: 123,
            date: "Jan-01-2025",
            type: "Rent",
            amount: "1800"
        },
        {
            id: 234,
            date: "Jan-02-2025",
            type: "Gym",
            amount: "250"
        },
        {
            id: 201,
            date: "Jan-15-2025",
            type: "Groceries",
            amount: "250"
        },
        {
            id: 345,
            date: "Feb-01-2025",
            type: "Rent",
            amount: "1800"
        },
        {
            id: 456,
            date: "Feb-2-2025",
            type: "Gym",
            amount: "250"
        },
        {
            id: 457,
            date: "Feb-17-2025",
            type: "Groceries",
            amount: "350"
        },
        {
            id: 468,
            date: "Feb-20-2025",
            type: "Gifts",
            amount: "100"
        }
    ]
}

const expensesSlice = createSlice({
    name: "expensesTable",
    initialState,
    reducers: {
        set: (state, { payload }: PayloadAction<Expense[]>) => {
            state.transactions = payload;
        },
        add: (state, { payload }: PayloadAction<Expense>) => {
            state.transactions = [...state.transactions, payload];
        },
        modify: (state, { payload }: PayloadAction<Expense>) => {
            const newTransactions = state.transactions.map(element => {
                if (element.id === payload.id) {
                    return payload;
                }
                return element;
            })
            state.transactions = newTransactions;
        },
        remove: (state, { payload }: PayloadAction<number>) => {
            const newTransactions = state.transactions.filter(el => el.id != payload)
            state.transactions = newTransactions;
        },
        save: (state) => {
            localStorage.setItem(persistance, JSON.stringify(state));
        }
    }
});

export const { add, modify, remove, save, set } = expensesSlice.actions;

export default expensesSlice.reducer;