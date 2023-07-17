import React, { useState, useEffect } from 'react';
import './Blog.scss';
import PostsPagination from '../tabs/PostsPagination';
import { useWpSiteUrl } from '../../utils';
import CategoriesList from './CategoriesList';
import PostSearch from '../tabs/PostSearch';
import PostsGrid from './PostsGrid';
import { CategoriesProvider } from '../../context/CategoriesContext';

const Blog = () => {
    const wpUrl = useWpSiteUrl();
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getPosts();
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, currentCategory, searchQuery]);

    const getPosts = async () => {
        try {
            let url = `${wpUrl}/wp/v2/posts?`;

            if (searchQuery !== '') {
                url += `search=${searchQuery}&`;
                setCurrentPage(1);
                setCurrentCategory(null);
            }

            if (currentCategory && currentCategory.id !== 0) {
                url += `categories=${currentCategory.id}&`;
            }

            url += `page=${currentPage}`;

            const response = await fetch(url);
            const data = await response.json();
            setPosts(data);
            const totalPages = response.headers.get('X-WP-TotalPages');
            setPageCount(Number(totalPages));
        } catch (error) {
            console.error('Error:', error);
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

    const getCategory = async (categoryId) => {
        setCurrentCategory(categoryId === 0 ? null : categories.find((category) => category.id === categoryId));
        setCurrentPage(1);
    };

    return (
        <CategoriesProvider>
            <div id="Blog">
                <PostSearch onSearch={setSearchQuery} />
                <CategoriesList categories={categories} getCategory={getCategory} />

                <PostsGrid posts={posts} categories={categories} />

                <PostsPagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} />
            </div>
        </CategoriesProvider>
    );
};

export default Blog;
