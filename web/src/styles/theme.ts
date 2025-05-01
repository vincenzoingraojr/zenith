import { COLORS } from "./colors";
import { useThemeContext } from "./ThemeContext";

export interface Theme {
    background: string;
    color: string;
    inputText: string;
    inputBackground: string;
    overlayGrey: string;
}

export const lightTheme: Theme = {
    background: COLORS.white,
    color: COLORS.black,
    inputText: COLORS.black,
    inputBackground: COLORS.lightGrey,
    overlayGrey: COLORS.overlayLightGrey,
};

export const darkTheme: Theme = {
    background: COLORS.darkGrey,
    color: COLORS.white,
    inputText: COLORS.lightGrey,
    inputBackground: COLORS.grey,
    overlayGrey: COLORS.overlayDarkGrey,
};

export function useTheme(): Theme {
    const { isDarkMode } = useThemeContext();

    return isDarkMode ? darkTheme : lightTheme;
}