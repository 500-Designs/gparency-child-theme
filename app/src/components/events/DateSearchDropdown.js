import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from "../vectors/CalendarIcon";
import './DateSearchDropdown.scss';

const DateSearchDropdown = ({ onChange }) => {
    const [hasValue, setHasValue] = useState(false);

    const handleDateChange = (event) => {
        const selectedValue = event.target.value;
        onChange([selectedValue, '']);
        setHasValue(selectedValue !== "any");
    };

    return (
        <div id="DateSearchDropdown">
            <CalendarIcon />
            <select className={hasValue ? "has-value" : "no-value"} onChange={handleDateChange}>
                <option value="">Any Date</option>
                <option value="today">Starting Soon</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this_week">This week</option>
                <option value="this_weekend">This weekend</option>
                <option value="next_week">Next Week</option>
                <option value="custom">Custom</option>
            </select>
        </div>
    );
};

export default DateSearchDropdown;
