// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../state/store";
import ExpensesSummary from "./ExpensesSummary";

describe(ExpensesSummary, () => {
    it("should render the total expenses from the default state", () => {
        global.ResizeObserver = class {
            observe() {}
            unobserve() {}
            disconnect() {}
          };
        const { getByText, unmount} = render(
            <Provider store={store}>
                <ExpensesSummary />
            </Provider>
        );

        const element = getByText(/4800/i);
        expect(element).toBeDefined();
        unmount()
    })
})