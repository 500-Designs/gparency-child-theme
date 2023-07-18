import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from "../vectors/CalendarIcon";
import './DateSearchDropdown.scss';
import { convertToPhpDate } from '../../utils';

const DateSearchDropdown = ({ onChange }) => {
    const [hasValue, setHasValue] = useState(false);

    const handleDateChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "custom") {
            onChange([selectedValue, '']);
        } else {
            console.log("selectedValue: ", selectedValue);
            const dateRange = getDateRange(selectedValue);
            const convertedUpdate = dateRange.map(convertToPhpDate);
            // const convertedUpdate = dateRange.map(selectedValue);
            console.log("convertedUpdate: ", convertedUpdate);
            onChange(convertedUpdate);
        }
        setHasValue(selectedValue !== "any");
    };

    const getDateRange = (value) => {
        const today = new Date();
        const startDate = new Date();
        const endDate = new Date();

        switch (value) {
            case "today":
                return [today, today];
            case "tomorrow":
                startDate.setDate(today.getDate() + 1);
                endDate.setDate(today.getDate() + 1);
                return [startDate, endDate];
            case "this_week":
                const firstDayOfWeek = today.getDate() - today.getDay() + 1;
                startDate.setDate(firstDayOfWeek);
                endDate.setDate(firstDayOfWeek + 6);
                return [startDate, endDate];
            case "this_weekend":
                const nextSaturday = today.getDate() + (6 - today.getDay() + 1);
                startDate.setDate(nextSaturday - 1);
                endDate.setDate(nextSaturday + 1);
                return [startDate, endDate];
            case "next_week":
                const nextMonday = today.getDate() + (8 - today.getDay());
                startDate.setDate(nextMonday);
                endDate.setDate(nextMonday + 6);
                return [startDate, endDate];
            default:
                return ['', ''];
        }
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
