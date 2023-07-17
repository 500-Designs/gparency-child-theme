import './PostBox.scss';

const PostBox = ({ postTitle, postLink, postCategories, categories  }) => {
    const getCategoryName = (categoryId) => {
        const category = categories.find((category) => category.id === categoryId);
        return category ? category.name : '';
    };


    return (
        <div className="PostBox">
            <div className="categories">
                {postCategories.map((categoryId, i) => (
                    <span key={i}>{getCategoryName(categoryId)}</span>
                ))}
            </div>
            <h3>
                <a href={postLink} target="_blank" rel="noopener noreferrer">
                    {postTitle}
                </a>
            </h3>
        </div>
    );
};

export default PostBox;
