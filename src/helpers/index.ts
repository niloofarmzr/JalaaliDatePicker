export const numberPadding = (number: number): string => {
    return (number < 10 && number.toString().length === 1 ? '0' : '') + number;
};
