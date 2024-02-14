import React, {useEffect, useState} from 'react';
import jMoment from 'moment-jalaali';
import DayNames from './dayNames.tsx';
import Week from './week.tsx';
import Popover from '@mui/material/Popover';
import {Moment} from "moment";
import {DayType} from "../../types";
import {dateObject} from "../../data";
import {numberPadding} from "../../helpers";

jMoment.loadPersian({dialect: 'persian-modern'});
jMoment.locale('fa');

type Props = {
    defaultValue?: string | null,
    selectDate: (date: Moment) => void
    onClose: () => void,
    anchorEl: null | Element | (() => Element),
    open: boolean
}
const CalendarPopover = ({defaultValue, selectDate, open, anchorEl, onClose }: Props) => {
    const [calendarDate, setCalendarDate] = useState<Moment>(jMoment());
    const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
    const [yearPopoverAnchorEl, setYearPopoverAnchorEl] = useState<null | Element | (() => Element)>(null);
    const [monthPopoverAnchorEl, setMonthPopoverAnchorEl] = useState<null | Element | (() => Element)>(null);

    useEffect(() => {
        if (defaultValue) setDefaultValue();
    }, [defaultValue]);

    const setDefaultValue = () => {
        const defaultDate = jMoment(jMoment(defaultValue, 'jYYYY/jMM/jDD').format('YYYY-MM-DD'))
        setSelectedDate(defaultDate);
        setCalendarDate(defaultDate.clone())
    };

    const select = (day: DayType) => {
        setSelectedDate(day.date);
        setCalendarDate(day.date.clone())
        selectDate(day.date);
    };

    const handleOpenMonthPopover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setMonthPopoverAnchorEl(event.currentTarget)
    };

    const handleCloseMonthPopover = () => {
        setMonthPopoverAnchorEl(null)
    };

    const handleOpenYearPopover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setYearPopoverAnchorEl(event.currentTarget)
    };

    const handleCloseYearPopover = () => {
        setYearPopoverAnchorEl(null)
    };

    const handleSetMonth = (userSelectedMonth: number) => {
        const currentYear = calendarDate.format('jYYYY');
        const date = jMoment(`${currentYear}-${numberPadding(userSelectedMonth)}-01`, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
        setCalendarDate(jMoment(date));
        setMonthPopoverAnchorEl(null)
    };

    const handleSetYear = (userSelectedYear: number) => {
        const currentYear = calendarDate.format('jYYYY');
        const yearDiff = +currentYear - +userSelectedYear;
        setCalendarDate(calendarDate.subtract(yearDiff, 'jYear'));
        setYearPopoverAnchorEl(null)
    };

    const renderWeeks = () => {
        const weeks: Array<React.JSX.Element> = [];
        let isNextMonth = false;

        const date = calendarDate.clone().startOf('jMonth').weekday(0);
        let count = 0;
        let monthIndex = date.jMonth();
        while (!isNextMonth) {
            weeks.push(
                <Week key={date.toString()} date={date.clone()} calendarDate={calendarDate}
                      select={(day: DayType) => select(day)} selectedDate={selectedDate}/>
            );

            date.add(1, 'w');
            isNextMonth = count++ > 2 && monthIndex !== date.jMonth();
            monthIndex = date.jMonth();
        }
        return weeks;
    };

    return (
        <Popover
            id='simple-popper'
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            style={{direction: 'rtl'}}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}>
            <section className='calendar'>
                <header className='header'>
                    <div className='w-full d-flex'>
                        <div className='month-display row'>
                            <div id='month-select' className='month-select month-label' onClick={handleOpenMonthPopover}>
                                {calendarDate.format('jMMMM')} ماه
                            </div>
                            <Popover
                                id='month-popover'
                                open={Boolean(monthPopoverAnchorEl)}
                                anchorEl={monthPopoverAnchorEl}
                                onClose={handleCloseMonthPopover}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                }}>
                                <div className='month-list'>
                                    {dateObject.months.map((month) => (
                                        <div key={month.mCode} className='month-list-item'
                                             onClick={() => handleSetMonth(month.mCode)}>
                                            {month.mName}
                                        </div>
                                    ))}
                                </div>
                            </Popover>
                        </div>
                        <div className='year-display row'>
                            <div id='year-select' className='year-select cursor-pointer'
                                 onClick={handleOpenYearPopover}>
                                سال {calendarDate.format('jYYYY')}
                            </div>
                            <Popover
                                id='year-popover'
                                open={Boolean(yearPopoverAnchorEl)}
                                anchorEl={yearPopoverAnchorEl}
                                onClose={handleCloseYearPopover}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                }}>
                                <div className='year-list'>
                                    {dateObject.years.map((year) => (
                                        <div key={year} className='year-list-item' onClick={() => handleSetYear(year)}>
                                            {year}
                                        </div>
                                    ))}
                                </div>
                            </Popover>
                        </div>
                    </div>
                    <div className='w-full'>
                        <DayNames/>
                    </div>
                </header>
                <div
                >{renderWeeks()}</div>
            </section>
        </Popover>
    );

}

export default CalendarPopover;
