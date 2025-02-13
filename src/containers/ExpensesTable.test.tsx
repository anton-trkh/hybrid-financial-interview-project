// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../state/store";
import ExpensesTable from "./ExpensesTable";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en';

describe(ExpensesTable, () => {
    it("should render default state values", () => {
        const { getByText, unmount} = render(
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">        
                <Provider store={store}>
                    <ExpensesTable />
                </Provider>
            </LocalizationProvider>
        );

        const element = getByText('Feb-2-2025');
        expect(element).toBeDefined();
        unmount()
    })
    it("should add a new value", () => {
        const { getByText, getByTestId, unmount} = render(
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                <Provider store={store}>
                    <ExpensesTable />
                </Provider>
            </LocalizationProvider>
        );

        const amountInput = getByTestId('new-row-amount-input').querySelector('input') as HTMLInputElement;
        expect(amountInput).toBeDefined();
        fireEvent.change(amountInput, {target: {value: '1234'}})

        const typeInput = getByTestId('new-row-type-input').querySelector('input') as HTMLInputElement;
        expect(typeInput).toBeDefined();
        fireEvent.change(typeInput, {target: {value: 'Utilities'}})

        const addButton = getByTestId('add-button');
        expect(addButton).toBeDefined();
        fireEvent.click(addButton);

        const newElement = getByText('Utilities');
        expect(newElement).toBeDefined();
        unmount()
    })

    it("should remove a value on confirming deletion", () => {
        const { queryByTestId, getByTestId, unmount} = render(
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                <Provider store={store}>
                    <ExpensesTable />
                </Provider>
            </LocalizationProvider>
        );
        const testElement = queryByTestId('data-row-123');
        expect(testElement).toBeDefined();

        const removeButton = getByTestId('remove-button-123') as HTMLButtonElement;
        expect(removeButton).toBeDefined();
        fireEvent.click(removeButton);
        const confirmRemoveButton = getByTestId('confirm-remove-button') as HTMLButtonElement;
        expect(confirmRemoveButton).toBeDefined();
        fireEvent.click(confirmRemoveButton);

        const removedElement = queryByTestId('data-row-123');
        expect(removedElement).toBeNull();
        unmount();
    })

    it("should modify a value on confirming modification", () => {
        const { queryByTestId, getByTestId, unmount} = render(
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                <Provider store={store}>
                    <ExpensesTable />
                </Provider>
            </LocalizationProvider>
        );

        const testElement = getByTestId('data-row-234');
        expect(testElement).toBeDefined();

        const editButton = getByTestId('edit-button-234') as HTMLButtonElement;
        expect(editButton).toBeDefined();
        fireEvent.click(editButton);

        const amountInput = getByTestId('edit-amount-input').querySelector('input') as HTMLInputElement;
        expect(amountInput).toBeDefined();
        fireEvent.change(amountInput, {target: {value: '1234'}})

        const typeInput = getByTestId('edit-type-input').querySelector('input') as HTMLInputElement;
        expect(typeInput).toBeDefined();
        fireEvent.change(typeInput, {target: {value: 'Subscriptions'}})

        const confirmEditButton = getByTestId('confirm-edit-button') as HTMLButtonElement;
        expect(confirmEditButton).toBeDefined();
        expect(confirmEditButton).toHaveProperty('disabled')
        fireEvent.click(confirmEditButton);

        const editedElement = queryByTestId('data-row-234') as HTMLElement;
        expect(editedElement).toBeDefined();
        expect(editedElement.textContent).toMatch(/1234/i);

        unmount();
    })
})