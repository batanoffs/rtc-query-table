import { ConfigProvider, theme as antdTheme } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../theme.config';
import { ThemeContext } from '@/context/ThemeContext';

type ThemeMode = 'light' | 'dark';

export interface IThemeContextProps {
  mode: ThemeMode;
  toggleTheme: () => void;
  theme: typeof darkTheme;
}

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem('theme');
  return saved === 'dark' ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialTheme());

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const getTheme = () => {
    return mode === 'dark' ? darkTheme : lightTheme;
  };

  const theme = getTheme();

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      <ConfigProvider
        theme={{
          ...theme,
          algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
