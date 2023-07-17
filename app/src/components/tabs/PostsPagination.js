import React from 'react';
import styles from './PostsPagination.module.scss';

const PostsPagination = ({ currentPage, pageCount, onPageChange }) => {
  const handlePageChange = page => {
    onPageChange(page);
  };

  return (
    <div id="PostsPagination">
      {Array.from({ length: pageCount }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
          className={styles.button}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PostsPagination;
