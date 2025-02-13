import { useSelector } from 'react-redux';
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { RootState } from '../state/store';

interface DataElement {
    type: string;
    amount: number;
}
export default function ExpensesSummary() {
    const financialData = useSelector((state: RootState) => state.transactionTable.transactions);

    const totalExpenses = financialData.reduce((acc, { amount }) => {
        return acc + Number(amount);
    }, 0);
    const tableDataElements: DataElement[] = [];
    financialData.reduce((acc, {type, amount}) => {
        const numericAmount = Number(amount);
        if (!acc.has(type)) {
            acc.set(type, numericAmount);
        } else {
            const currentValue = acc.get(type) as number;
            acc.set(type, currentValue + numericAmount);
        }
        return acc;
    }, new Map<string, number>).forEach((value, key) => {
        tableDataElements.push({
            type: key,
            amount: value
        });
    });

    return (
        <>
            <div>
                Your total expenses so far are: ${totalExpenses}
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={tableDataElements} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} aria-label="financial graph">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}