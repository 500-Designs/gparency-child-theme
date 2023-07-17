import React from 'react';

const CategoriesList = ({ categories, getCategory }) => {
  return (
    <div className='categories-list'>
      <button onClick={() => getCategory(0)}>All</button>
      {categories.map((category) => (
        <button key={category.id} onClick={() => getCategory(category.id)}>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoriesList;
