import { COLORS } from "./colors";
import { useTheme } from "./ThemeContext";

export interface Theme {
    background: string;
    color: string;
}

export const lightTheme: Theme = {
    background: COLORS.white,
    color: COLORS.black,
};

export const darkTheme: Theme = {
    background: COLORS.darkGrey,
    color: COLORS.white,
};

export function getTheme(): Theme {
    const { isDarkMode } = useTheme();

    return isDarkMode ? darkTheme : lightTheme;
}