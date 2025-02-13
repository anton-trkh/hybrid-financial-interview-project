// @vitest-environment jsdom

import AutocompleteTextInput from "./AutocompleteTextInput";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

describe(AutocompleteTextInput, () => {
    it("should render the display value", () => {
        const { getByDisplayValue, unmount} = render(
            <AutocompleteTextInput 
                value="element"
                options={[]} 
                title="test"
                onChange={() => {}}
            />
        );

        const element = getByDisplayValue('element');
        expect(element).toBeDefined();
        unmount()
    })
})