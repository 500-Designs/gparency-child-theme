import React from 'react';
import CloseIcon from '../vectors/CloseIcon';
import './LetterNav.scss';

const LetterNav = ({ letters, activeLetter, onLetterClick, clearQueries, isDisabled }) => {
  return (
    <div id="LetterNav" className={`letter-buttons ${isDisabled ? "is-disabled" : ""}`}>
      {letters.map((letter, index) => (
        <button
          key={index}
          onClick={() => onLetterClick(letter)}
          className={activeLetter === letter ? 'active' : ''}
        >
          {letter}
        </button>
      ))}
      {activeLetter &&
        <button
          className='clear'
          onClick={() => clearQueries()}
        >
          <CloseIcon />
        </button>
      }
    </div>
  );
};

export default LetterNav;
