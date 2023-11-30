"use client";

import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => { }
})

const getFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem("themeMode");
    return value || "light";
  }
}

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setTheme] = useState(() => {
    return getFromLocalStorage() || "light";
  })

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const updateThemeBasedOnTime = () => {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour <= 6;

    setTheme(isNight ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode])

  useEffect(() => {
    updateThemeBasedOnTime();
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: themeMode, toggleTheme }}>{children}
    </ThemeContext.Provider>
  )
}
