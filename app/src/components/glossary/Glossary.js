import React, { useState, useEffect } from "react";
import "./Glossary.scss";
import PostsPagination from "../tabs/PostsPagination";
import PostSearch from "../tabs/PostSearch";
import Loader from "../tabs/Loader";
import GlossaryGrid from "./GlossaryGrid";
import { useWpSiteUrl, scrollToTabs } from "../../utils";
import LetterNav from "./LetterNav";

const Glossary = () => {
  const wpUrl = useWpSiteUrl();
  const [glossaryItems, setGlossaryItems] = useState([]);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [letterQuery, setLetterQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstLetters, setFirstLetters] = useState([]);
  const [hasChangedPage, setHasChangedPage] = useState(false);

  const handlePageChange = (newPage) => {
    setCurrentPageState(newPage);
    setHasChangedPage(true);
  };

  const clearQueries = () => {
    setSearchQuery("");
    setLetterQuery("");
  }


  const getGlossaryItems = async (justLetter) => {
    let per_page = 15;
    try {
      setIsLoading(true);
      let url = `${wpUrl}/jetengine/v1/glossary`;
      if (justLetter === "just_letter") {
        console.log("letterQuery: ", letterQuery);
        url += `?starts_with_letter=${letterQuery}`;
      } else {
        url += `?page=${currentPageState}&per_page=${per_page}`;
        if (searchQuery !== "") {
          url += `&search=${searchQuery}`;
        }
      }


      const response = await fetch(url);
      const data = await response.json();
      setGlossaryItems(data);
      const totalPages = response.headers.get("X-WP-TotalPages");
      setPageCount(Number(totalPages));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFirstLetters = async () => {
    try {
      let url = `${wpUrl}/jetengine/v1/glossary?starts_with_letter=1`;
      const response = await fetch(url);
      const data = await response.json();
      setFirstLetters(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getGlossaryItems();
    getFirstLetters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageState]);

  useEffect(() => {
    if (letterQuery !== "" && (typeof letterQuery === "string")) {
      getGlossaryItems("just_letter");
    } else {
      getGlossaryItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, letterQuery]);


  // useEffect to scroll to element after data load
  useEffect(() => {
    if (!isLoading && hasChangedPage) {
      scrollToTabs();
      setHasChangedPage(false); // reset it back to false for next use.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query !== searchQuery) {
      setCurrentPageState(1); // Reset to first page when search query changes
    }
  };

  const handleLetterQuery = (letter) => {
    setLetterQuery(letter);
    if (letter !== letterQuery) {
      setCurrentPageState(1); // Reset to first page when letter query changes
    }
  };

  return (
    <div id="GlossaryGrid" className={isLoading ? "loading" : ""}>
      <div className="filters">
        <LetterNav
          letters={firstLetters || []}
          activeLetter={letterQuery}
          onLetterClick={handleLetterQuery}
          clearQueries={clearQueries}
          isDisabled={searchQuery}
        />
        <PostSearch
          onSearch={handleSearch}
          placeholder="Search Glossary"
          searchQuery={searchQuery}
          clearQueries={clearQueries}
          type="glossary"
          isDisabled={letterQuery}
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <GlossaryGrid items={glossaryItems} searchQuery={searchQuery} />
          {!letterQuery &&
            <PostsPagination
              currentPage={currentPageState}
              pageCount={pageCount}
              onPageChange={handlePageChange}
            />

          }
        </>
      )}


    </div>
  );
};

export default Glossary;
