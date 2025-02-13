// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import TextInput from "./TextInput";

describe(TextInput, () => {
    it("should render the display value", () => {
        const { getByDisplayValue, unmount} = render(
            <TextInput 
                value="test"
                title="title"
                onChange={() => {}}
            />
        );

        const element = getByDisplayValue('test');
        expect(element).toBeDefined();
        unmount()
    })
})