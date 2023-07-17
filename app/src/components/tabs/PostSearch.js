// PostSearch.js
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../utils';

const PostSearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    onSearch(debouncedSearchValue);
  }, [debouncedSearchValue, onSearch]);

  return (
    <input 
      type="text"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search posts..."
    />
  );
};

export default PostSearch;
