import React, { useState } from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import { WotdCard } from './components/card';

function App() {
  let [dark, setDark] = useState(false);
  return (
    <div className={`${dark ? 'dark' : ''}`}>
      <Header />
      <DarkModeToggle dark={dark} setDark={setDark}/>
      <div className='min-h-screen min-w-full bg-sky-100 dark:bg-gray-800 pt-16 sm:pt-20 p-3 sm:p-10 space-y-10'>
        <WotdCard word="induce" />
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
