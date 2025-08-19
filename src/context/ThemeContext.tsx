import { createContext } from 'react';

import { IThemeContextProps } from '@/theme/providers/ThemeProvider';

export const ThemeContext = createContext<IThemeContextProps | undefined>(undefined);
