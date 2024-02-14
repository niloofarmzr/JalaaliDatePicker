import React from 'react';
import {DayType} from "../../types";
import {Moment} from "moment";

type Props = {
    day: DayType,
    select: (day: DayType) => void,
    selectedDate: Moment | null
}
const Day = ({day, day: { date, isCurrentMonth, isToday, number }, select, selectedDate}: Props) => {
        return (
            <span
                id={`day${isToday ? '-today' : ''}${date.isSame(selectedDate) ? '-selected' : ''}`}
                className={`day${isToday ? ' today' : ''} ${isCurrentMonth ? '' : 'different-month'} ${date.isSame(selectedDate) ? ' selected' : ''}`}
                onClick={isCurrentMonth ? () => select(day) : undefined}>
                {number}
            </span>
        );

}

export default Day;
