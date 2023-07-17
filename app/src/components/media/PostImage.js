import React, { useEffect, useState } from 'react';
import { useWpSiteUrl } from '../../utils';

const PostImage = ({ mediaId }) => {
    const [mediaDetails, setMediaDetails] = useState(null);
    const wpUrl = useWpSiteUrl();

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
    }, [mediaId, wpUrl]);

    if (!mediaDetails) {
        return null; // or show a placeholder/loading state
    }

    const { source_url } = mediaDetails;

    const sourceTags = [
        <source
            key="768"
            srcSet={`${source_url.replace('.jpg', '-768x1024.jpg')}, ${source_url.replace('.jpg', '-768x1024.jpg.webp')} 1x, ${source_url.replace('.jpg', '-1152x1536.jpg')}, ${source_url.replace('.jpg', '-1152x1536.jpg.webp')} 2x`}
            media="(min-width: 768px) and (max-width: 1199px)"
            type="image/webp"
        />,
        <source
            key="1200"
            srcSet={`${source_url.replace('.jpg', '-450x600.jpg')}, ${source_url.replace('.jpg', '-450x600.jpg.webp')} 1x, ${source_url.replace('.jpg', '-768x1024.jpg')}, ${source_url.replace('.jpg', '-768x1024.jpg.webp')} 2x`}
            media="(min-width: 1200px)"
            type="image/webp"
        />,
    ];

    const imgTag = (
        <img
            src={`${source_url.replace('.jpg', '-250x250.jpg')}`}
            srcSet={`${source_url.replace('.jpg', '-250x250.jpg.webp')} 1x, ${source_url.replace('.jpg', '-450x600.jpg')}, ${source_url.replace('.jpg', '-450x600.jpg.webp')} 2x`}
            alt="flamingo"
        />
    );

    return <picture>{sourceTags}{imgTag}</picture>;
};

export default PostImage;
