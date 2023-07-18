import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../vectors/CalendarIcon';
import './DateRangePicker.scss';

const DateRangePicker = ({ onChange }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  }, []);

  const convertToPhpDate = (date) => {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const handleRangeChange = (update) => {
    const convertedUpdate = update.map(convertToPhpDate);
    setDateRange(update);
    if (update[0] && update[1]) {
      onChange(convertedUpdate);
    }
  };

  return (
    <div id="DateRangePicker">
      <CalendarIcon />
      <DatePicker
        ref={datePickerRef}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={handleRangeChange}
        isClearable={true}
        placeholderText="Custom"
        open={true}
      />
    </div>
  );
};

export default DateRangePicker;
