import { ThemeConfig as AntdThemeConfig } from 'antd';
import { BASE_COLORS_DARK, BASE_COLORS_LIGHT } from './colors/base';

// TODO: extend the default theme token fields instead of completely overwriting them
export const createTheme = (BASE_COLORS: typeof BASE_COLORS_DARK): AntdThemeConfig => ({
  token: {
    colorPrimary: BASE_COLORS.primary,
    colorInfo: BASE_COLORS.primary,
    colorTextBase: BASE_COLORS.textBase,
    colorBgBase: BASE_COLORS.bgBase,
    fontSize: 15,
    fontFamily: 'Inter, system-ui',
    colorBgContainer: BASE_COLORS.bgContainer,
    colorBgElevated: BASE_COLORS.bgContainer,
    green: BASE_COLORS.primary,
    colorSuccess: BASE_COLORS.primary,
    colorBgSolid: BASE_COLORS.bgSolid,
    colorTextSecondary: BASE_COLORS.colorTextSecondary,
  },
});

export const lightTheme = createTheme(BASE_COLORS_LIGHT);
export const darkTheme = createTheme(BASE_COLORS_DARK);
