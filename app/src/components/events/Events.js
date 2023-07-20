import React, { useState, useEffect } from "react";
import "./Events.scss";
import PostsPagination from "../tabs/PostsPagination";
import PostSearch from "../tabs/PostSearch";
import Loader from "../tabs/Loader";
import EventsGrid from "./EventsGrid";
import DateSearchDropdown from "./DateSearchDropdown";
import DateRangePicker from "./DateRangePicker";
import { useWpSiteUrl, scrollToTabs } from '../../utils';

const Events = () => {
  const wpUrl = useWpSiteUrl();
  const [events, setEvents] = useState([]);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState([]);
  const [locationQuery, setLocationQuery] = useState("");
  const [dateQuery, setDateQuery] = useState(['', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChangedPage, setHasChangedPage] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  

  const handlePageChange = (newPage) => {
    setCurrentPageState(newPage);
    setHasChangedPage(true);
  };

  const getEvents = async () => {
    try {
      setIsLoading(true);

      let url = `${wpUrl}/jetengine/v1/events?page=${currentPageState}&per_page=9`;

      if (searchQuery !== "") {
        url += `&search=${searchQuery}`;
      }

      if (locationQuery !== "") {
        url += `&location=${locationQuery}`;
      }

      if (dateQuery[0]) {
        url += `&start_date=${dateQuery[0]}`;
        url += `&end_date=${dateQuery[1]}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
      const totalPages = response.headers.get("X-WP-TotalPages");
      setPageCount(Number(totalPages));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageState]);

  useEffect(() => {
    if (dateQuery[0] === 'custom') return;
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, locationQuery, dateQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query !== searchQuery) {
      setCurrentPageState(1); // Reset to first page when search query changes
    }
  };

  const handleLocationChange = (location) => {
    setLocationQuery(location);
    if (location !== locationQuery) {
      setCurrentPageState(1); // Reset to first page when location changes
    }
  };

  const handleDateQueryChange = (date) => {
    setDateQuery(date);
    if (date !== dateQuery) {
      setCurrentPageState(1); // Reset to first page when date query changes
    }
  };

  // useEffect to scroll to element after data load
  useEffect(() => {
    if (!isLoading && hasChangedPage) {
      scrollToTabs();
      setHasChangedPage(false); // reset it back to false for next use.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div id="Events" className={isLoading ? "loading" : ""}>
      <div className="filters">
        <PostSearch onSearch={handleLocationChange} type="location" />
        {isCustom ?
          <DateRangePicker onChange={handleDateQueryChange} setIsCustom={setIsCustom}/>
          :
          <DateSearchDropdown onChange={handleDateQueryChange} setIsCustom={setIsCustom}/>
        }
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
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Events;
