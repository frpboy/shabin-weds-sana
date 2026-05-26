import React, { createContext, useContext, useState, useEffect } from 'react';
import { themeTokens } from '../theme/tokens';

type ThemeMode = 'light' | 'dark' | 'ivory';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  tokens: typeof themeTokens;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('ivory');

  useEffect(() => {
    let color = '#141412';
    let statusBarStyle = 'black-translucent';

    switch (mode) {
      case 'light':
        color = themeTokens.COLORS.WHITE;
        statusBarStyle = 'default';
        break;
      case 'dark':
        color = themeTokens.COLORS.SECONDARY;
        statusBarStyle = 'black-translucent';
        break;
      case 'ivory':
        color = themeTokens.COLORS.ACCENT;
        statusBarStyle = 'default';
        break;
    }

    const themeColorTags = document.querySelectorAll('meta[name="theme-color"]');
    if (themeColorTags.length > 0) {
      themeColorTags.forEach(tag => tag.setAttribute('content', color));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = color;
      document.head.appendChild(meta);
    }

    let appleStatusTag = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (appleStatusTag) {
      appleStatusTag.setAttribute('content', statusBarStyle);
    } else {
      appleStatusTag = document.createElement('meta');
      appleStatusTag.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
      appleStatusTag.setAttribute('content', statusBarStyle);
      document.head.appendChild(appleStatusTag);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, tokens: themeTokens }}>
      <div className={`theme-${mode} min-h-screen bg-transparent font-poppins text-text antialiased selection:bg-primary/20 selection:text-accent`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
