import React from 'react';
import { Char } from '../models/Char';
import { SecretWord } from '../models/SecretWord';

export interface IGameProps {
  char: Char[];
  secretWord: SecretWord[];
  onClickChar: (char: Char) => void;
}

export const Game = (props: IGameProps) => {
  const clickChar = (char: Char) => {
    props.onClickChar(char);
  };

  return (
    <>
      <div className='word-container'>
        {props.secretWord.map((letter) => (
          <div key={letter.id} className='letter-container'>
            <span className={letter.isGuessed ? '' : 'hidden'}>
              {letter.letter}
            </span>
          </div>
        ))}
      </div>

      <div className='keyboard'>
        {props.char.map((char) => (
          <div key={char.id}>
            <button disabled={char.isClicked} onClick={() => clickChar(char)}>
              {char.char}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
