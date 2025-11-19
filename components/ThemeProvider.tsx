import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEMES } from '../constants';
import { ThemeName } from '../types';

interface ThemeContextType {
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('zinc');
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Handle Dark Mode Class
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Handle CSS Variables Injection
    const themeConfig = THEMES[themeName];
    const vars = isDark ? themeConfig.cssVars.dark : themeConfig.cssVars.light;

    const styleId = 'theme-vars';
    let styleTag = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    const cssString = `
      :root {
        ${Object.entries(vars).map(([key, value]) => `${key}: ${value};`).join('\n')}
      }
    `;

    styleTag.textContent = cssString;

  }, [themeName, isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName, isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
