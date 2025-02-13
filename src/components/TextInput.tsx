import { TextField } from "@mui/material";

interface ITextInput {
    value: string;
    title: string;
    error?: string;
    onChange: (value: string) => void;
}

export default function TextInput({
    value,
    title,
    error,
    onChange
}: ITextInput) {
    if (error !== undefined) {
        return (
            <TextField 
                value={value}
                helperText={title}
                error
                label={error}
                onChange={(e) => onChange(e.target.value)}
            />
        );
    }
    return (
        <TextField 
            value={value}
            helperText={title}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}