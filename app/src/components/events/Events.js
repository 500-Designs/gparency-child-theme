import React, { useState, useEffect } from 'react';
import './Events.scss';
import PostsPagination from '../tabs/PostsPagination';
import PostSearch from '../tabs/PostSearch';
import DateRangePicker from './DateRangePicker';
import Loader from '../tabs/Loader';
import EventsGrid from './EventsGrid';
import { useWpSiteUrl } from '../../utils';

const Events = () => {
  const wpUrl = useWpSiteUrl();
  const [events, setEvents] = useState([]);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [dateRange, setDateRange] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getEvents = async () => {
    try {
      setIsLoading(true);

      let url = `${wpUrl}/jetengine/v1/events?page=${currentPageState}&per_page=9`;

      if (searchQuery !== '') {
        url += `&search=${searchQuery}`;
      }

      if (locationQuery !== '') {
        url += `&location=${locationQuery}`;
      }

      if (dateRange) {
        const { startDate, endDate } = dateRange;
        url += `&start-date=${startDate}&end-date=${endDate}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
      const totalPages = response.headers.get('X-WP-TotalPages');
      setPageCount(Number(totalPages));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageState]);

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, locationQuery, dateRange]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPageState(1); // Reset to first page when search query changes
  };

  const handleLocationChange = (location) => {
    setLocationQuery(location);
    setCurrentPageState(1); // Reset to first page when location changes
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setCurrentPageState(1); // Reset to first page when date range changes
  };

  console.log("currentPage:", currentPageState);
  return (
    <div id="EventsGrid" className={isLoading ? 'loading' : ''}>
      <div className="filters">
        <PostSearch onSearch={handleLocationChange} placeholder="Filter by Location" />
        <DateRangePicker handleDateRangeChange={handleDateRangeChange} />
        <PostSearch onSearch={handleSearch} placeholder="Search Events" />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <EventsGrid events={events} />
          <PostsPagination
            currentPage={currentPageState}
            pageCount={pageCount}
            onPageChange={setCurrentPageState}
          />
        </>
      )}
    </div>
  );
};

export default Events;
