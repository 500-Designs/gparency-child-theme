import React from 'react';
import './EventBox.scss';

const EventBox = ({ title, organizerName, startDate, endDate, location }) => {
    return (
        <div className="EventBox">
            <h3>{title}</h3>
            <p>Organizer: {organizerName}</p>
            <p>Start Date: {startDate}</p>
            <p>End Date: {endDate}</p>
            <p>Location: {location}</p>
        </div>
    );
};

export default EventBox;
