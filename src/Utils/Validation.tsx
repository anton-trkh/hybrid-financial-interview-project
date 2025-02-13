export const isTransactionAmountValid = (amount: string): boolean => {
    const numericAmount = Number(amount);
    return !isNaN(numericAmount) && numericAmount > 0;
}

export const withDefaultTransactionType = (type: string): string => type === "" ? "Unknown" : type;