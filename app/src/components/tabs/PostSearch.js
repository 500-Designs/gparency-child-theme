// PostSearch.js
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../utils';
import SearchIcon from '../vectors/SearchIcon';
import './PostSearch.scss';

const PostSearch = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchValue = useDebounce(searchValue, 500);

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
            <SearchIcon />
            <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search"
            />
        </div>
    );
};

export default PostSearch;
