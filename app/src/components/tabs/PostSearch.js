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

    return (
        <div id='PostSearch'>
            <SearchIcon />
            <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search posts..."
            />
        </div>
    );
};

export default PostSearch;
