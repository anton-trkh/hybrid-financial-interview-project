import { Dayjs } from "dayjs";

export default function FormatDate (date: Dayjs | null) {
    return date?.format('MMM-DD-YYYY') ?? "Unknown date";
}