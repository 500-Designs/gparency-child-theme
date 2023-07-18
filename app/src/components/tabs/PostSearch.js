// PostSearch.js
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../utils';
import SearchIcon from '../vectors/SearchIcon';
import './PostSearch.scss';
import CalendarIcon from "../vectors/CalendarIcon";
import PinIcon from "../vectors/PinIcon";

const PostSearch = ({ onSearch, type = "blog" }) => {
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchValue = useDebounce(searchValue, 500);
    let placeholder = 'Search';
    let icon = <SearchIcon />;

    if (type === "location") {
        icon = <PinIcon />;
        placeholder = 'Enter Location';
    } else if (type === "event") {
        placeholder = 'Search';
    }

    useEffect(() => {
        onSearch(debouncedSearchValue);
    }, [debouncedSearchValue, onSearch]);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSearch(e.target.value);
        }
    };

    return (
        <div id="PostSearch">
            {icon}
            <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
        </div>
    );
};

export default PostSearch;
