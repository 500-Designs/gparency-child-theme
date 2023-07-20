import React, { useState, useEffect } from 'react';
import './PostsPagination.scss';
import CircleArrowLeft from '../vectors/CircleArrowLeft';
import ArrowLeft from '../vectors/ArrowLeft';

const PostsPagination = ({ currentPage, pageCount, onPageChange }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handlePageChange = page => {
        onPageChange(page);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Calculate page numbers to display with truncation
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, pageCount);
    const truncatedStart = startPage > 2;
    const truncatedEnd = endPage < pageCount - 1;

    if (truncatedStart && !truncatedEnd) {
        startPage = pageCount - 4;
    } else if (!truncatedStart && truncatedEnd) {
        endPage = 5;
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

    return (
        <div id="PostsPagination">
            {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)} className='prev'>
                    {isMobile ? <ArrowLeft /> : <CircleArrowLeft />}
                </button>
            )}
            <div className="items">
                {truncatedStart && (
                    <>
                        <button onClick={() => handlePageChange(1)}>1</button>
                        {startPage > 2 && <span>...</span>}
                    </>
                )}
                {pageNumbers.map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                ))}
                {truncatedEnd && (
                    <>
                        {endPage < pageCount - 1 && <span>...</span>}
                        <button onClick={() => handlePageChange(pageCount)}>{pageCount}</button>
                    </>
                )}
            </div>
            {currentPage < pageCount && (
                <button onClick={() => handlePageChange(currentPage + 1)} className='next'>
                    {isMobile ? <ArrowLeft /> : <CircleArrowLeft />}
                </button>
            )}
        </div>
    );
};

export default PostsPagination;
