import { Autocomplete, TextField } from "@mui/material";

interface IAutocompleteTextInput {
    value: string;
    options: string[];
    title: string;
    onChange: (value: string) => void;
}

export default function AutocompleteTextInput({
    value,
    options,
    title,
    onChange
}: IAutocompleteTextInput) {
    return (
        <Autocomplete 
            value={value}
            onChange={(_e, newValue) => onChange(newValue ?? "")}
            renderInput={(params) => <TextField {...params} helperText={title} />}
            sx={{
                width: 200,
            }}
            options={options}                    
        />
    );
}