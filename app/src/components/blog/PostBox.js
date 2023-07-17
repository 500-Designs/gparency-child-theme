import { useEffect, useState } from "react";
import "./PostBox.scss";
import PostImage from "../media/PostImage";

import { useWpSiteUrl, formatDate } from "../../utils";

const PostBox = ({
  postId,

  postDate,
  postTitle,
  featuredMedia,
  postLink,
  postCategories,
  categories,
}) => {
  const wpUrl = useWpSiteUrl();

  const [readingTime, setReadingTime] = useState("");

  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : "";
  };

  useEffect(() => {
    const fetchReadingTime = async () => {
      try {
        const url = `${wpUrl}/reading-time/v1/${postId}`;
        const response = await fetch(url);
        const data = await response.json();
        setReadingTime(data.reading_time);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchReadingTime();
  }, [postId, wpUrl]);

  console.log("featuredMedia: ", featuredMedia);
  return (
    <div className="PostBox" data-post-id={postId}>
      <div className="image">
        {featuredMedia > 0 ? (
          <PostImage mediaId={featuredMedia} />
        ) : (
          // ? <span>featuredMedia: {featuredMedia}</span>
          <span>NO featured image</span>
        )}
      </div>
      <div className="categories">
        {postCategories.map((categoryId, i) => {
          if (categoryId === 1) return false;
          return (
            <span key={categoryId} data-id={categoryId}>
              {getCategoryName(categoryId)}
            </span>
          );
        })}
      </div>

      <h3>
        <a href={postLink} target="_blank" rel="noopener noreferrer">
          {postTitle}
        </a>
      </h3>
      <div className="meta">
        <span className="date">{formatDate(postDate)}</span>
        {readingTime && (
          <>
            |<div dangerouslySetInnerHTML={{ __html: readingTime }}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostBox;
