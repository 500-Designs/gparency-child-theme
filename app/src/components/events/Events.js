import React, { useState, useEffect } from "react";
import "./Events.scss";
import PostsPagination from "../tabs/PostsPagination";
import PostSearch from "../tabs/PostSearch";
import Loader from "../tabs/Loader";
import EventsGrid from "./EventsGrid";
import DateSearchDropdown from "./DateSearchDropdown";
import DateRangePicker from "./DateRangePicker";
import { useWpSiteUrl } from "../../utils";

const Events = () => {
  const wpUrl = useWpSiteUrl();
  const [events, setEvents] = useState([]);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState([]);
  const [locationQuery, setLocationQuery] = useState("");
  const [dateQuery, setDateQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

      if (dateQuery !== "") {
        url += `&date=${dateQuery}`;
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

  return (
    <div id="EventsGrid" className={isLoading ? "loading" : ""}>
      <div className="filters">
        <PostSearch onSearch={handleLocationChange} type="location" />
        {dateQuery[0] === 'custom' ?
          <DateRangePicker onChange={handleDateQueryChange} />
          :
          <DateSearchDropdown onChange={handleDateQueryChange} />
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
            onPageChange={setCurrentPageState}
          />
        </>
      )}
    </div>
  );
};

export default Events;
