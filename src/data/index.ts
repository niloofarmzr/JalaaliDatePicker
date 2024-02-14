import jMoment from "moment-jalaali";
import {DateType, MonthType} from "../types";

const days: Array<number> = Array(31).map(function (_, i) {
    return i + 1;
});

const PersianMonths: Array<MonthType> = [
    {mName: 'فروردین', mCode: 1},
    {mName: 'اردیبهشت', mCode: 2},
    {mName: 'خرداد', mCode: 3},
    {mName: 'تیر', mCode: 4},
    {mName: 'مرداد', mCode: 5},
    {mName: 'شهریور', mCode: 6},
    {mName: 'مهر', mCode: 7},
    {mName: 'آبان', mCode: 8},
    {mName: 'آذر', mCode: 9},
    {mName: 'دی', mCode: 10},
    {mName: 'بهمن', mCode: 11},
    {mName: 'اسفند', mCode: 12}
];

const years = (startYear: number) => {
    let currentYear = +jMoment().jYear();
    const years: Array<number> = [];
    while (startYear <= currentYear) {
        years.push(currentYear--);
    }
    return years;
};
export const dateObject: DateType = {
    days,
    months: PersianMonths,
    years: years(1300),
};