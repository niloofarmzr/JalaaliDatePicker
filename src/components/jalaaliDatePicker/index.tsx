import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import CalendarPopover from './calendarPopover.tsx';
import {Moment} from "moment";

type Props = {
    value?: string | null,
    disabled?: boolean,
    onSelectDate: (date: string) => void,
    [key: string]: any
}

const JalaaliDatePicker = ({ value, disabled, onSelectDate, ...props }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | Element | (() => Element)>(null);

    const handleClick = (event: React.MouseEvent<Element, MouseEvent>): void => {
        if (disabled) return;
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleSelectDate = (date: Moment) => {
        onSelectDate(date.format('jYYYY-jMM-jDD'));
        handleClose();
    };

    return (
        <>
            <TextField
                fullWidth
                value={value || ''}
                onClick={handleClick}
                InputProps={{ readOnly: true }}
                disabled={disabled}
                {...props}
            />
            <CalendarPopover
                defaultValue={value}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                selectDate={handleSelectDate}
            />
        </>
    );
};

export default JalaaliDatePicker;
