// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import DateSelector from "./DateSelector";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/en';

describe(DateSelector, () => {
    it("should display a valid date", () => {
        let hasError = false;
        const { getByDisplayValue, unmount} = render(
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">        
                <DateSelector 
                    value={dayjs('Feb-01-2024')}
                    title="display"
                    handleValueChangeWithError={(_date, validation) => {
                        if (validation?.validationError) {
                            hasError = true;
                        }
                    }}
                />
            </LocalizationProvider>
        );

        const element = getByDisplayValue('02/01/2024');
        expect(element).toBeDefined();
        expect(hasError).toBeFalsy();
        unmount()
    })
})