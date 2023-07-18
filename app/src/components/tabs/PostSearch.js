// PostSearch.js
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../utils';
import SearchIcon from '../vectors/SearchIcon';
import './PostSearch.scss';
import CloseIcon from "../vectors/CloseIcon";
import PinIcon from "../vectors/PinIcon";

const PostSearch = ({ onSearch, type = "blog", clearQueries, searchQuery, isDisabled }) => {
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

    const handleClear = (e) => {
        e.preventDefault();
        onSearch("");
        setSearchValue("")
        clearQueries();
    };

    return (
        <div id="PostSearch" className={`${isDisabled ? "is-disabled" : ""}`}>
            {icon}
            <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
            {(searchQuery && type === "glossary") && 
                <button onClick={handleClear} className='clear'>
                    <CloseIcon />
                </button>
            }
        </div>
    );
};

export default PostSearch;
