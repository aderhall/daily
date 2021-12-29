import React from "react";

export default function DarkModeToggle({dark, setDark}: DarkModeToggleProps) {
  return <button className='bg-white dark:bg-black dark:text-white p-2 fixed bottom-0 right-0 z-10' onClick={() => setDark(!dark)}>Toggle dark theme</button>
}

type DarkModeToggleProps = {
  dark: boolean,
  setDark: React.Dispatch<React.SetStateAction<boolean>>
}