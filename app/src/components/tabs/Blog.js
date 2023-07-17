import React, { useState, useEffect } from 'react';
import styles from './Blog.module.css';
import PostsPagination from './PostsPagination';
import { useWpSiteUrl } from '../../utils';
import parse from 'html-react-parser';

const Blog = () => {
  const wpUrl = useWpSiteUrl();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    getPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const getPosts = async () => {
    try {
      const response = await fetch(`${wpUrl}/wp/v2/posts?page=${currentPage}`);
      const data = await response.json();
      setPosts(data);
      const totalPages = response.headers.get('X-WP-TotalPages');
      setPageCount(Number(totalPages));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="Blog" className={styles.container}>
      <h2>Blog</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{parse(post.title.rendered)}</li>
        ))}
      </ul>
      <PostsPagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} />
    </div>
  );
};

export default Blog;
