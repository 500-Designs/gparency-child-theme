import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GlossaryGrid.scss';
import GlossaryBox from './GlossaryBox';

const GlossaryGrid = ({ items, searchQuery }) => {
    const [letters, setLetters] = useState([]);

    useEffect(() => {
        const firstLetters = [...new Set(items.map(item => item.title[0].toUpperCase()))].sort();
        setLetters(firstLetters);
    }, [items]);

    if (!Array.isArray(items) || items.length === 0) {
        const emptyMessage = searchQuery
            ? `No items found for "${searchQuery}"`
            : `No items found for "${searchQuery}"`

        return (
            <div id="GlossaryGrid">
                <div className="no-results">
                    <p>
                        {emptyMessage}

                    </p>
                    <h3>You can try the following:</h3>
                    <ul>
                        <li>Check your spelling</li>
                        <li>Clear your search</li>
                        <li>Use Alphabeth filter instead</li>
                    </ul>
                </div>

            </div>
        );
    }

    return (
        <div id="GlossaryGrid">
            {searchQuery &&
                <p className="not-empty">{items.length} Items found for "{searchQuery}"</p>
            }
            <div className="grid-container">
                {letters.map(letter => {
                    const filteredItems = items.filter(item => item.title[0].toUpperCase() === letter);
                    return (
                        <div key={letter} className='letter-group'>
                            <h3 className='letter-heading'>{letter}</h3>
                            {filteredItems.map(item => (
                                <GlossaryBox
                                    key={item.id}
                                    title={item.title}
                                    content={item['_content']}
                                />
                            ))}
                        </div>
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
