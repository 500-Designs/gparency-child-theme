import React, { useEffect, useState } from 'react';
import { useWpSiteUrl } from '../../utils';

const PostImage = ({ mediaId }) => {
  const [mediaDetails, setMediaDetails] = useState(null);
  const wpUrl = useWpSiteUrl();

  console.log("mediaId: ", mediaId);
  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        const response = await fetch(`${wpUrl}/wp/v2/media/${mediaId}`);
        const media = await response.json();
        setMediaDetails(media);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMediaDetails();
}, [mediaId]);

  if (!mediaDetails) {
    return null; // or show a placeholder/loading state
  }

  const { source_url, media_details } = mediaDetails;

  // Define the responsive image sizes and dimensions
  const imageSizes = [
    { size: 'thumbnail', width: 150 },
    { size: 'medium', width: 500 },
    { size: 'medium_large', width: 1000 },
    // Add more sizes as per your requirements
  ];

  // Generate the <source> tags for different image sizes
  const sourceTags = imageSizes.map(({ size, width }) => (
    media_details?.sizes?.[size] && <source
      key={size}
      media={`(min-width: ${width}px)`}
      srcSet={`${media_details.sizes[size].source_url} ${size}`}
    />
  )).filter(Boolean); // Filters out sizes not present in media_details.sizes

  // Generate the <img> tag for fallback and small screens
  const imgTag = (
    <img
      src={source_url}
      alt="Post Media"
      width={media_details?.width}
      height={media_details?.height}
    />
  );


  return (
    <picture>
      {sourceTags}
      {imgTag}
    </picture>
  );
};

export default PostImage;
