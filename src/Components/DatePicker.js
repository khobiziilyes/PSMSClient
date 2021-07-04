import React from 'react';

import { DatePicker as MuiDatePicker } from "@material-ui/pickers";
import { IconButton } from "@material-ui/core";

import ClearIcon from "@material-ui/icons/Clear";

const DatePicker = ({ label, onChange, ...props }) => {
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = newVal => {
        setSelectedDate(newVal);
        onChange(newVal.hour(0).minute(0).second(0).millisecond(0).format('X'));
    }

    const handleClr = (e) => {
        e.stopPropagation();
        setSelectedDate(null);
        onChange(null);
    }

    return (
        <MuiDatePicker
            value={selectedDate}
            label={label}
            onChange={handleDateChange}
            format='DD/MM/YYYY HH:mm:ss'
            animateYearScrolling
            showTodayButton
            InputProps={{
                endAdornment: (
                    <IconButton onClick={(e) => handleClr(e)} disabled={selectedDate === null} size="small" >
                        <ClearIcon />
                    </IconButton>
                )
            }}
            {...props}
        />
    );
}

export default DatePicker;