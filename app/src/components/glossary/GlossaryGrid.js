import React from 'react';
import PropTypes from 'prop-types';
import './GlossaryGrid.scss';
import GlossaryBox from './GlossaryBox';

const GlossaryGrid = ({ items, searchQuery }) => {
    if (!Array.isArray(items) || items.length === 0) {
        const emptyMessage = searchQuery
            ? `No items found for "${searchQuery}"`
            : 'No items found';

        return (
            <div id="itemsGrid">
                <p className="empty">{emptyMessage}</p>
            </div>
        );
    }
    return (
        <div id="itemsGrid">
            <div className="grid-container">
                {items.map((item) => {

                    return (
                        <GlossaryBox
                            key={item.id}
                            title={item.title}
                            organizerName={item['organizer-name']}
                            startDate={item['start-date']}
                            endDate={item['end-date']}
                            location={item['item-location']}
                            itemLink={item['item-link']}
                            mediaID={item['_thumbnail_id']}
                        />
                    );
                })}
            </div>
        </div>
    );
};

GlossaryGrid.propTypes = {
    items: PropTypes.array.isRequired,
    searchQuery: PropTypes.string,
};

export default GlossaryGrid;
