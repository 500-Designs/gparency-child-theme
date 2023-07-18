import React from 'react';

const LetterNav = ({ letters, activeLetter, onLetterClick }) => {
  return (
    <div id="LetterNav" className="letter-buttons">
      {letters.map((letter, index) => (
        <button
          key={index}
          onClick={() => onLetterClick(letter)}
          className={activeLetter === letter ? 'active' : ''}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default LetterNav;
