'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type ColorMode = 'default' | 'dark' | 'green' | 'orange';

interface ColorModeContextType {
  mode: ColorMode;
  setMode: (mode: ColorMode) => void;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ColorMode>('default');

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark', 'green-mode', 'orange-mode', 'default-mode');

    switch (mode) {
      case 'dark':
        html.classList.add('dark');
        break;
      case 'green':
        html.classList.add('green-mode');
        break;
      case 'orange':
        html.classList.add('orange-mode');
        break;
      default:
        html.classList.add('default-mode');
    }
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) throw new Error('useColorMode must be used within ColorModeProvider');
  return context;
};
