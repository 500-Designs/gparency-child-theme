import React, { useState, useEffect } from "react";
import "./Glossary.scss";
import PostsPagination from "../tabs/PostsPagination";
import PostSearch from "../tabs/PostSearch";
import Loader from "../tabs/Loader";
import GlossaryGrid from "./GlossaryGrid";
import { useWpSiteUrl } from "../../utils";
import LetterNav from "./LetterNav";

const Glossary = () => {
  const wpUrl = useWpSiteUrl();
  const [glossaryItems, setGlossaryItems] = useState([]);
  const [currentPageState, setCurrentPageState] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [letterQuery, setLetterQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [firstLetters, setFirstLetters] = useState(false);

  const getGlossaryItems = async () => {
    try {
      setIsLoading(true);

      let url = `${wpUrl}/jetengine/v1/glossary?page=${currentPageState}&per_page=15`;

      if (searchQuery !== "") {
        url += `&search=${searchQuery}`;
      }

      if (letterQuery !== "") {
        url += `&start_letter=${letterQuery}`;
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

  useEffect(() => {
    getGlossaryItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageState]);

  useEffect(() => {
    getGlossaryItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, letterQuery]);

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
        <PostSearch onSearch={handleSearch} placeholder="Search Glossary" />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <GlossaryGrid items={glossaryItems} />
          <PostsPagination
            currentPage={currentPageState}
            pageCount={pageCount}
            onPageChange={setCurrentPageState}
          />
        </>
      )}

      {/* LetterNav component */}
      <LetterNav
        letters={firstLetters || []}
        activeLetter={letterQuery}
        onLetterClick={handleLetterQuery}
      />
    </div>
  );
};

export default Glossary;
