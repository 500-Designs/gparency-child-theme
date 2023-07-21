import React from 'react';
import PropTypes from 'prop-types';
import './PostsGrid.scss';
import parse from 'html-react-parser';
import PostBox from './PostBox';
import { usePlaceHolderMediaData, useWpSiteUrl } from "../../utils";

const PostsGrid = ({ posts, searchQuery, categories }) => {

  const mediaDetails = usePlaceHolderMediaData(useWpSiteUrl(), 932);

  if (!Array.isArray(posts) || posts.length === 0 || !posts) {
    const emptyMessage = searchQuery
      ? `No posts found for "${searchQuery}"`
      : 'No posts found';

    return (
      <div id="PostsGrid">
        <p className="empty">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div id="PostsGrid">
      <div className="grid-container">
        {posts.map((post) => {
          const { id, date, title, featured_media, link, categories: postCategories } = post;

          // Ensure necessary post properties are available
          if (!id || !date || !title || !link) {
            console.error('Invalid post object', post);
            return null;
          }

          return (
            <PostBox
              key={id}
              postId={id}
              postDate={date}
              postTitle={parse(title.rendered)}
              featuredMedia={featured_media}
              postLink={link}
              postCategories={postCategories}
              categories={categories}
              placeholderMedia={mediaDetails}
            />
          );
        })}
      </div>
    </div>
  );
};

PostsGrid.propTypes = {
  posts: PropTypes.array.isRequired,
  searchQuery: PropTypes.string,
  categories: PropTypes.array.isRequired,
};

export default PostsGrid;
