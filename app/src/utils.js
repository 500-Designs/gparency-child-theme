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

        // Return the cleanup function
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

export const useGetPostFirstImage = (postId) => {
    const [imageId, setImageId] = useState(null);
    const wpUrl = useWpSiteUrl();

    useEffect(() => {
        const fetchFirstImage = async () => {
            try {
                const response = await fetch(`${wpUrl}/custom/v1/first-image/${postId}`);
                const data = await response.json();

                if (response.ok) {
                    setImageId(data.image_id || null);
                } else {
                    console.error(data.message || 'Failed to fetch first image.');
                }
            } catch (error) {
                console.error('An error occurred while fetching the first image:', error);
            }
        };

        fetchFirstImage();
    }, [postId, wpUrl]);

    return imageId;
};

export function renderDateRange(startDate, endDate) {
    // If no startDate, return null
    if (!startDate) {
        return null;
    }

    // Parse the startDate
    const start = new Date(startDate);

    // Create date formatters
    const monthDayFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
    const yearFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric' });

    // If no endDate, return only the startDate
    if (!endDate) {
        return `${monthDayFormat.format(start)}, ${yearFormat.format(start)}`;
    }

    // Parse the endDate
    const end = new Date(endDate);

    if (start.getFullYear() !== end.getFullYear()) {
        // Different years
        return `${monthDayFormat.format(start)}, ${yearFormat.format(start)} - ${monthDayFormat.format(end)}, ${yearFormat.format(end)}`;
    } else if (start.getMonth() !== end.getMonth()) {
        // Same year, different months
        return `${monthDayFormat.format(start)} - ${monthDayFormat.format(end)}, ${yearFormat.format(end)}`;
    } else {
        // Same month and year
        const dayFormat = new Intl.DateTimeFormat('en-US', { day: 'numeric' });
        return `${monthDayFormat.format(start).replace(/ \d+$/, '')} ${dayFormat.format(start)}-${dayFormat.format(end)}, ${yearFormat.format(end)}`;
    }
}
