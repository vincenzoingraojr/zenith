import { COLORS } from "./colors";

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