import React, { useEffect, useMemo, useState } from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import { WotdCard } from './components/card';
import { rollingShuffle } from './utils';

function App() {
  let [dark, setDark] = useState(false);
  let [wordList, setWordList] = useState<string[]>([]);
  let [word, setWord] = useState<string | null>();
  
  useEffect(() => {
    (async () => {
      let rawResponse = await fetch("https://api.github.com/repos/aderhall/vocab_list/contents/vocab_list.txt");
      let obj = await rawResponse.json();
      let str = atob(obj.content);
      
      let entries = str
        .split("\n")
        .filter(line => line !== "");
      
      setWordList(entries);
    })();
  }, []);
  
  let today = Math.floor(new Date().valueOf() / (24 * 3600 * 1000));
  
  useMemo(() => {
    // How many cycles have happened January 1st, 1970
    let currentCycle = Math.floor(today / wordList.length);
    // How far are we into the current cycle
    let index = today % wordList.length;
    // Get a deterministically shuffled word list
    let shuffled = rollingShuffle(wordList, currentCycle);
    // Find today's word from the shuffled list
    let word = shuffled[index];
    if (word) {
      setWord(word.toLowerCase());
    }
  }, [today, wordList]);
  
  return (
    <div className={`${dark ? 'dark' : ''}`}>
      <Header />
      <DarkModeToggle dark={dark} setDark={setDark}/>
      <div className='min-h-screen min-w-full bg-sky-100 dark:bg-gray-800 pt-16 sm:pt-20 p-3 sm:p-10 space-y-10'>
        {word &&
          <WotdCard word={word} />
        }
      </div>
    </div>
  );
}

function Header() {
  return <header className="bg-gradient-to-l from-sky-400 to-cyan-400 dark:from-gray-700 dark:to-gray-700 dark:border-b dark:border-sky-400 min-w-full h-12 sm:h-16 fixed z-10 p-3 sm:px-10">
    <div className="max-w-screen-md mx-auto h-full flex justify-between items-center">
      <h1 className="text-white sm:text-xl">Daily</h1>
    </div>
  </header>
}

export default App;
