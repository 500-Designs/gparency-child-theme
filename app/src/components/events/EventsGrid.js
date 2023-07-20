import React from 'react';
import PropTypes from 'prop-types';
import './EventsGrid.scss';
import EventBox from './EventBox';
import { usePlaceHolderMediaData, useWpSiteUrl } from "../../utils";

const EventsGrid = ({ events, searchQuery }) => {

    const mediaDetails = usePlaceHolderMediaData(useWpSiteUrl(), 932);
    if (!mediaDetails) return;

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
                            link={event['event-link']}
                            organizerName={event['organizer-name']}
                            startDate={event['start-date']}
                            endDate={event['end-date']}
                            location={event['event-location']}
                            eventLink={event['event-link']}
                            mediaID={event['_thumbnail_id']}
                            placeholderMedia={mediaDetails}
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
