import { StyleSheet, useColorScheme } from "react-native";
import { COLORS } from "./colors";

const lightTheme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        backgroundColor: COLORS.white,
    },
    text: {
        color: COLORS.black,
        fontFamily: "Inter_400Regular",
        fontSize: 18,
    },
    header: {
        backgroundColor: COLORS.white,
        fontFamily: "Inter_700Bold",
        fontSize: 20,
    },
    input: {
        height: "auto",
        width: "auto",
        fontFamily: "Inter_400Regular",
        fontSize: 18,
        color: COLORS.black,
    },
    tabBar: {
        backgroundColor: COLORS.white,
    },
});

const darkTheme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.darkGrey,
    },
    contentContainer: {
        backgroundColor: COLORS.darkGrey,
    },
    text: {
        color: COLORS.white,
        fontFamily: "Inter_400Regular",
        fontSize: 18,
    },
    header: {
        backgroundColor: COLORS.darkGrey,
        fontFamily: "Inter_700Bold",
        fontSize: 20,
    },
    input: {
        height: "auto",
        width: "auto",
        fontFamily: "Inter_400Regular",
        fontSize: 18,
        color: COLORS.lightGrey,
    },
    tabBar: {
        backgroundColor: COLORS.darkGrey,
    },
});

export const theme = () => {
    const colorScheme = useColorScheme();

    return colorScheme === "dark" ? darkTheme : lightTheme;
};

export const textColorProp = () => {
    const colorScheme = useColorScheme();

    return colorScheme === "dark" ? COLORS.white : COLORS.black;
};