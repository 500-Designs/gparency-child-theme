import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ handleDateRangeChange }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    // This method sets the date range when a user selects a date
    const handleRangeChange = (update) => {
        setDateRange(update);
        handleDateRangeChange(update[0], update[1]);
    };

    return (
        <div>
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={handleRangeChange}
                isClearable={true}
                // inline
            />
        </div>
    );
};

export default DateRangePicker;
