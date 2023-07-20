
const PlaceHolderImage = ({data}) => {

    if (!data) {
        return null; // or show a placeholder/loading state
    }

    const { source_url, media_details } = data;

    // Get the available image sizes from media_details.sizes object
    const availableSizes = Object.keys(media_details.sizes);

    // Generate the source tags dynamically based on available sizes
    const sourceTags = availableSizes.map((size) => (
        <source
            key={size}
            srcSet={`${media_details.sizes[size].source_url} ${media_details.sizes[size].width}w`}
            media={`(min-width: ${media_details.sizes[size].width}px)`}
            type="image/jpeg"
        />
    ));

    // Generate the img tag dynamically using the original source_url
    const imgTag = (
        <img
            src={source_url}
            srcSet={`${source_url} ${media_details.width}w`}
            alt="flamingo"
        />
    );

    return <picture>{sourceTags}{imgTag}</picture>;
};

export default PlaceHolderImage;
