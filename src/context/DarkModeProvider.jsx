import React, { createContext, useState } from 'react';

export const DarkModeContext = createContext();

const getisDarkMode = () =>
  JSON.parse(localStorage.getItem('darkMode')) ?? false;

export default function DarkModeProvider({ children }) {
  const [isDarkMode, setDarkMode] = useState(getisDarkMode());
  const togleDarkMode = () => {
    localStorage.setItem('darkMode', `${!isDarkMode}`);
    setDarkMode((mode) => !mode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, togleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
