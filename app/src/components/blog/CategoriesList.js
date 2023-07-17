import React from 'react';

const CategoriesList = ({ categories, getCategory, currentCategory }) => {
  return (
    <div className='categories-list'>
      <button onClick={() => getCategory(0)} className={currentCategory === 1 ? 'current' : ''}>All</button>
      {categories.map((category) => {
        if (category.id === 1) return false;
        return <button key={category.id} onClick={() => getCategory(category.id)}
          data-id={category.id}
          className={currentCategory === category.id ? 'current' : ''}
        >
          {category.name}
        </button>
      }
      )}
    </div>
  );
};

export default CategoriesList;
