import React, { createContext, useContext, useState } from 'react';
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
