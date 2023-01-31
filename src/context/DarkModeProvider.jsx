import React, { createContext, useState } from 'react';

export const DarkModeContext = createContext();

const getisDarkMode = () =>
  JSON.parse(localStorage.getItem('darkMode')) ?? false;

export default function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(getisDarkMode());
  const togleDarkMode = () => {
    localStorage.setItem('darkMode', `${!darkMode}`);
    setDarkMode((mode) => !mode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, togleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
