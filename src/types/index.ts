import {Moment} from "moment";

export type DayType = {
    name: string,
    number: number,
    isCurrentMonth: boolean,
    isToday: boolean,
    date: Moment
}

export type MonthType = {
    mName: 'فروردین' | 'اردیبهشت' | 'خرداد' | 'تیر' | 'مرداد' | 'شهریور' | 'مهر' | 'آبان' | 'آذر' | 'دی' | 'بهمن' | 'اسفند',
    mCode: number
}

export type DateType = {
    days: Array<number>,
    months: Array<MonthType>,
    years: Array<number>,
}