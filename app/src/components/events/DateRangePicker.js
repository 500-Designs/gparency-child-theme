import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from "../vectors/CalendarIcon";
import './DateRangePicker.scss';

const DateRangePicker = ({ onChange }) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const handleRangeChange = (update) => {
        setDateRange(update);
        if (update[0] && update[1]) {
            onChange(update);
        }
    };

    return (
        <div id="DateRangePicker">
            <CalendarIcon />
            <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={handleRangeChange}
                isClearable={true}
                placeholderText='Custom'
            />
        </div>
    );
};

export default DateRangePicker;
