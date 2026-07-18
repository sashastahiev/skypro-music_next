'use client';

import React, { useState, useEffect } from 'react';
import ThemeContext, { Theme } from '../context/ThemeContext';
import { ThemeContextType } from '@/context/ThemeContext';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('app-theme') as Theme | null;
    return savedTheme || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
