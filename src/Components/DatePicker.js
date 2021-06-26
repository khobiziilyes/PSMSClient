import React from 'react';

import { DatePicker as MuiDatePicker } from "@material-ui/pickers";
import { IconButton } from "@material-ui/core";

import ClearIcon from "@material-ui/icons/Clear";

const DatePicker = ({ label, onChange, ...props }) => {
    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = (newVal) => {
        setSelectedDate(newVal);
        onChange(newVal.format('X'));
    }

    const handleClr = (e) => {
        e.stopPropagation();
        setSelectedDate(null);
    }

    return (
        <MuiDatePicker
            value={selectedDate}
            label={label}
            onChange={handleDateChange}
            format='YYYY-MM-DD'
            animateYearScrolling
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