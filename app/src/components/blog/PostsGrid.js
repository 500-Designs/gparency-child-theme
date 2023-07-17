import React from 'react';
import './PostsGrid.scss';
import parse from 'html-react-parser';
import PostBox from './PostBox';

const PostsGrid = ({ posts, searchQuery, categories }) => {
  if (posts.length === 0) {
    const emptyMessage = searchQuery
      ? `No posts found for ${searchQuery}`
      : 'No posts found';

    return (
      <div id="PostsGrid">
        <p className="empty">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div id="PostsGrid">
      <div className="container">
        {posts.map((post) => (
          <PostBox
            key={post.id}
            postTitle={parse(post.title.rendered)}
            postLink={post.link}
            postCategories={post.categories}
            categories={categories}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
