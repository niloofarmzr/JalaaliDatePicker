import React from 'react';
import jMoment from 'moment-jalaali';
import Day from './day.tsx';
import {Moment} from "moment";
import {DayType} from "../../types";

jMoment.loadPersian({ dialect: 'persian-modern' });

type Props = {
    date: Moment,
    calendarDate: Moment,
    selectedDate: Moment | null,
    select: (day: DayType) => void
}
const Week = ({date, calendarDate, selectedDate, select}: Props) => {
        const days: Array<React.JSX.Element> = [];
        for (let i = 0; i < 7; i++) {
            const day: DayType = {
                name: date.format('dd').substring(0, 1),
                number: date.jDate(),
                isCurrentMonth: date.jMonth() === calendarDate.jMonth(),
                isToday: date.isSame(new Date(), 'day'),
                date: date
            };
            days.push(<Day key={day.date.toString()} day={day} selectedDate={selectedDate} select={select} />);

            date = date.clone();
            date.add(1, 'day');
        }

        return (
            <div className='row week'>
                {days}
            </div>
        );
}
export default Week;
