import { COLORS } from "./colors";
import { useThemeContext } from "./ThemeContext";

export interface Theme {
    background: string;
    color: string;
    inputText: string;
}

export const lightTheme: Theme = {
    background: COLORS.white,
    color: COLORS.black,
    inputText: COLORS.black,
};

export const darkTheme: Theme = {
    background: COLORS.darkGrey,
    color: COLORS.white,
    inputText: COLORS.lightGrey,
};

export function useTheme(): Theme {
    const { isDarkMode } = useThemeContext();

    return isDarkMode ? darkTheme : lightTheme;
}