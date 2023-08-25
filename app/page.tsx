'use client';
import { useState } from 'react';
import { Game } from './components/Game';
import { Char } from './models/Char';
import axios from 'axios';
import { IWord } from './models/Word';
import { SecretWord } from './models/SecretWord';
import Image from 'next/image';

export default function Home() {
  const [startGame, setStartGame] = useState(false);
  const [chars, setChars] = useState<Char[]>([]);
  const [word, setWord] = useState<SecretWord[]>([]);
  const [guess, setGuess] = useState<SecretWord>();
  const [guessCount, setGuessCount] = useState(0);

  const getWord = async () => {
    const randomNumber = Math.floor(Math.random() * 5);
    const response = await axios.get('/api/' + randomNumber);

    const result: IWord = response.data;

    const secretWord = result.word.split('').map((char) => {
      return { id: Math.random(), letter: char, isGuessed: false };
    });

    setWord(secretWord);
  };

  const setKeyboard = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzpåäö';

    const keyBoard: Char[] = alphabet.split('').map((char) => {
      return { char: char, id: Math.random(), isClicked: false };
    });
    setChars(keyBoard);
  };

  const clickChar = (char: Char) => {
    const clickedChar = chars.map((c) => {
      if (char.id === c.id) return { ...c, isClicked: true };
      return c;
    });

    setChars(clickedChar);
    checkGuess(char.char);
  };
  const handleClick = () => {
    setStartGame(!startGame);
    setKeyboard();
    getWord();
    quitGame();
  };

  const quitGame = () => {
    if (!startGame) {
      setGuessCount(0);
    }
  };

  const checkGuess = (clickedChar: string) => {
    console.log(word);
    console.log(clickedChar);

    if (word.length > 0 && word.some((word) => word.letter === clickedChar)) {
      const secretLetter = word.map((w) => {
        if (w.letter === clickedChar) {
          return { ...w, isGuessed: true };
        }
        return w;
      });

      setWord(secretLetter);
    } else {
      setGuessCount(guessCount + 1);
    }
  };
  if (guessCount === 12) {
    return (
      <div>
        <p>Du förlorade</p>
        <button onClick={handleClick}>Avsluta</button>
      </div>
    );
  }
  return (
    <main>
      <div>
        <h1>Hangman</h1>
        {!startGame && <button onClick={handleClick}>Starta</button>}
        {startGame && (
          <div>
            <Game secretWord={word} char={chars} onClickChar={clickChar} />
            <Image
              src={`/${guessCount}.jpg`}
              alt='hangman'
              width={100}
              height={100}
            />
          </div>
        )}
      </div>
    </main>
  );
}
