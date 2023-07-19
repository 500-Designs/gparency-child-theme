import React, { useState, useEffect } from "react";
import "./FeaturedPosts.scss";
import parse from "html-react-parser";
import PostBox from "./PostBox";
import Loader from "../tabs/Loader";
import { useWpSiteUrl } from "../../utils";

const FeaturedPosts = ({ categories }) => {
  const wpUrl = useWpSiteUrl();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${wpUrl}/wp/v2/posts?sticky=true`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, [wpUrl]);

  if (isLoading) {
    return (
      <div id="FeaturedPosts">
        <Loader />
      </div>
    );
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    return;
  }

  return (
    <div id="FeaturedPosts">
      <div className="grid-container">
        <div className="main">
          <PostBox
            postId={posts[0].id}
            postDate={posts[0].date}
            postTitle={parse(posts[0].title.rendered)}
            featuredMedia={posts[0].featured_media}
            postLink={posts[0].link}
            postCategories={posts[0].categories}
            categories={categories}
          />
        </div>
        <div className="secondary">
          {posts.slice(0, 5).map((post) => {
            const {
              id,
              date,
              title,
              featured_media,
              link,
              categories: postCategories,
            } = post;

            // Ensure necessary post properties are available
            if (!id || !date || !title || !link) {
              console.error("Invalid post object", post);
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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
