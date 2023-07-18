import React from 'react';
import PropTypes from 'prop-types';
import './EventsGrid.scss';
import EventBox from './EventBox';

const EventsGrid = ({ events, searchQuery }) => {
    if (!Array.isArray(events) || events.length === 0) {
        const emptyMessage = searchQuery
            ? `No events found for "${searchQuery}"`
            : 'No events found';

        return (
            <div id="EventsGrid">
                <p className="empty">{emptyMessage}</p>
            </div>
        );
    }
    return (
        <div id="EventsGrid">
            <div className="grid-container">
                {events.map((event) => {

                    return (
                        <EventBox
                            key={event.id}
                            title={event.title}
                            organizerName={event['organizer-name']}
                            startDate={event['start-date']}
                            endDate={event['end-date']}
                            location={event['event-location']}
                            eventLink={event['event-link']}
                            mediaID={event['_thumbnail_id']}
                        />
                    );
                })}
            </div>
        </div>
    );
};

EventsGrid.propTypes = {
    events: PropTypes.array.isRequired,
    searchQuery: PropTypes.string,
};

export default EventsGrid;
