import React, { useState, useEffect } from 'react';
import './Blog.scss';
import PostsPagination from '../tabs/PostsPagination';
import { useWpSiteUrl, scrollToTabs, filterPostsByTitle } from '../../utils';
import CategoriesList from './CategoriesList';
import PostSearch from '../tabs/PostSearch';
import Loader from '../tabs/Loader';
import PostsGrid from './PostsGrid';
import FeaturedPosts from './FeaturedPosts';
import { CategoriesProvider } from '../../context/CategoriesContext';

const Blog = () => {
    const wpUrl = useWpSiteUrl();
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasChangedPage, setHasChangedPage] = useState(false);
    const [isInitial, setIsInitial] = useState(true);

    const getPosts = async () => {
        try {
            setIsLoading(true);

            let url = `${wpUrl}/custom/v1/search?`;

            if (searchQuery !== '') {
                url += `search=${searchQuery}&`;
            }

            if (currentCategory && currentCategory.id !== 0) {
                url += `category=${currentCategory.id}&`;
            }

            url += `page=${currentPage}`;
            url += `&per_page=9`;

            const response = await fetch(url);
            const data = await response.json();
            setPosts(data);
            const totalPages = response.headers.get('X-WP-TotalPages');
            setPageCount(Number(totalPages));
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getCategories = async () => {
        try {
            const response = await fetch(`${wpUrl}/wp/v2/categories`);
            const data = await response.json();
            const categoriesData = data.map((category) => ({ id: category.id, name: category.name }));
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    useEffect(() => {
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (currentCategory || searchQuery ) {
            setIsInitial(false);
            setCurrentPage(1)
        } else {
            setIsInitial(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, currentCategory]);


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setHasChangedPage(true);
        setIsInitial(false)
    };

    const handleSearch = query => {
        setSearchQuery(query);
    };

    const handleCategoryChange = categoryId => {
        const category = categoryId === 0 ? null : categories.find((category) => category.id === categoryId);
        setCurrentCategory(category);
    };

    // useEffect to watch for changes in currentCategory
    useEffect(() => {
        if (currentCategory === null) {
            setSearchQuery('');
        }
    }, [currentCategory]); // Re-run when currentCategory changes

    useEffect(() => {
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    // useEffect to scroll to element after data load
    useEffect(() => {
        if (!isLoading && hasChangedPage) {
            scrollToTabs();
            setHasChangedPage(false); // reset it back to false for next use.
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <CategoriesProvider>
            <div id="Blog" className={isLoading ? 'loading' : ''}>
                <div className='filters'>
                    <CategoriesList categories={categories} getCategory={handleCategoryChange}
                        currentCategory={currentCategory ? currentCategory.id : 1} />
                    <PostSearch onSearch={handleSearch} />
                </div>

                {isLoading
                    ? <Loader />
                    :
                    <>
                        {isInitial &&
                            <FeaturedPosts categories={categories} />
                        }
                        <PostsGrid posts={posts} categories={categories} searchQuery={searchQuery} />
                        <PostsPagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />
                    </>
                }
            </div>
        </CategoriesProvider>
    );
};

export default Blog;
