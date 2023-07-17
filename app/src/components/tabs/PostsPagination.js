import React, { useState, useEffect } from 'react';
import './PostsPagination.scss';
import CircleArrowLeft from '../vectors/CircleArrowLeft';
import ArrowLeft from '../vectors/ArrowLeft';

const PostsPagination = ({ currentPage, pageCount, onPageChange }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handlePageChange = page => {
        console.log("handlePageChange: ", page);
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

    return (
        <div id="PostsPagination">
            {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)} className='prev'>
                    {isMobile ? <ArrowLeft /> : <CircleArrowLeft />}
                </button>
            )}
            <div className="items">
                {Array.from({ length: pageCount }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
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
