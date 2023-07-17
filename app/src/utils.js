import { useState, useEffect } from 'react';

export const useWpSiteUrl = () => {
    let wpUrl = window.location.origin;
    if (wpUrl === 'http://localhost:3000') {
        wpUrl = 'https://gparency.local';
    }
    return wpUrl + '/wp-json';
};


export const useUrlSubfolder = () => {
    const [subfolder, setSubfolder] = useState('');

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const currentSubfolder = pathParts[1]; // Assuming the subfolder is the first part after the initial '/'
        setSubfolder(currentSubfolder);
    }, []);

    const updateSubfolder = (newSubfolder) => {
        setSubfolder(newSubfolder);
        const newPath = `/${newSubfolder}${window.location.search}${window.location.hash}`;
        window.history.pushState(null, '', newPath);
    };

    return { subfolder, updateSubfolder };
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

export function formatDate(dateString) {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
    return formatted;
}
