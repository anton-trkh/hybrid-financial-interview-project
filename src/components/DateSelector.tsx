import { DateValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";

interface IDateSelector {
    value: Dayjs;
    title: string;
    handleValueChangeWithError: (date: Dayjs | null, validation: PickerChangeHandlerContext<DateValidationError>) => void;
}

export default function DateSelector({
    value,
    title,
    handleValueChangeWithError
}: IDateSelector) {
    return (
        <DatePicker 
            value={value}
            slotProps={{
                textField: {
                  helperText: title,
                },
            }}
            onChange={handleValueChangeWithError}
        />
    );
}