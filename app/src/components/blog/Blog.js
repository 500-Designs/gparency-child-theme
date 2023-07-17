import React, { useState, useEffect } from 'react';
import styles from './Blog.scss';
import PostsPagination from '../tabs/PostsPagination';
import { useWpSiteUrl } from '../../utils';
import parse from 'html-react-parser';
import CategoriesList from './CategoriesList';

const Blog = () => {
  const wpUrl = useWpSiteUrl();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getPosts();
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const getPosts = async () => {
    try {
      let url = `${wpUrl}/wp/v2/posts`;
      if (currentCategory && currentCategory.id !== 0) {
        url += `?categories=${currentCategory.id}&`;
      } else {
        url += `?`;
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
    console.log("getCategory", categoryId);
    setCurrentCategory(categoryId === 0 ? null : categories.find((category) => category.id === categoryId));
    setCurrentPage(1);
  };

  return (
    <div id="Blog" className={styles.container}>
      <h2>Blog</h2>
      <CategoriesList categories={categories} getCategory={getCategory} />
      <ul>
        {posts.length &&
          posts.map((post) => (
            <li key={post.id}>{parse(post.title.rendered)}</li>
          ))}
      </ul>
      <PostsPagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} />
    </div>
  );
};

export default Blog;
