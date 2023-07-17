import { useState, useEffect } from 'react';

export const useWpSiteUrl = () => {
    let wpUrl = window.location.origin;
    if (wpUrl === 'http://localhost:3000') {
        wpUrl = 'https://gparency.local';
    }
    return wpUrl + '/wp-json';
};

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  }
  