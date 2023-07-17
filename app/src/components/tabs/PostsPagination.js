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

    const renderPageButtons = () => {
        let buttons = [];

        if (pageCount <= 5) {
            for (let i = 1; i <= pageCount; i++) {
                buttons.push(<button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={currentPage === i}
                >
                    {i}
                </button>);
            }
        } else {
            buttons.push(<button
                key={1}
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
            >
                {1}
            </button>);
            buttons.push(<button
                key={2}
                onClick={() => handlePageChange(2)}
                disabled={currentPage === 2}
            >
                {2}
            </button>);

            if (currentPage > 3) {
                buttons.push(<button key='before-ellipsis' disabled>...</button>);
            }

            if (currentPage > 2 && currentPage < pageCount - 1) {
                buttons.push(<button
                    key={currentPage}
                    onClick={() => handlePageChange(currentPage)}
                    disabled
                >
                    {currentPage}
                </button>);
            }

            if (currentPage < pageCount - 2) {
                buttons.push(<button key='after-ellipsis' disabled>...</button>);
            }

            buttons.push(<button
                key={pageCount}
                onClick={() => handlePageChange(pageCount)}
                disabled={currentPage === pageCount}
            >
                {pageCount}
            </button>);
        }

        return buttons;
    };

    return (
        <div id="PostsPagination">
            {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)} className='prev'>
                    {isMobile ? <ArrowLeft /> : <CircleArrowLeft />}
                </button>
            )}
            <div className="items">
                {renderPageButtons()}
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
