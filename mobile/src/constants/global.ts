import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const globalStyles = StyleSheet.create({
    standardPageContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 16,
    },
    authPageContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 32,
    },
    authForm: {
        flex: 1,
        flexDirection: "column",
        gap: 24,
        width: "100%",
    },
    authTitle: {
        fontFamily: "Inter_700Bold",
        fontSize: 42,
        marginBottom: 24,
    },
    standardButton: {
        backgroundColor: COLORS.blue,
        color: COLORS.white,
    },
    smallButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderRadius: 24,
    },
    top24: {
        marginTop: 24,
    },
    input: {
        height: "auto",
        width: "auto",
        borderColor: "transparent",
        borderRadius: 0,
        borderWidth: 0,
        fontFamily: "Inter_400Regular",
        fontSize: 18,
        backgroundColor: "transparent",
        color: COLORS.lightGrey,
    },
    link: {
        color: COLORS.blue,
    },
    toast: {
        backgroundColor: COLORS.blue,
        borderRadius: 6,
        padding: 6,
    },
    authBottomNav: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 32,
        paddingRight: 32,
        height: 100,
        gap: 24,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    calendarButton: {
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: 9999,
        backgroundColor: COLORS.blue,
    },
    birthDateContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    birthDateInfo: {
        flex: 1,
        flexDirection: "column",
        gap: 4,
    },
    birthDateLabel: {
        fontSize: 16,
    },
    birthDateString: {
        fontSize: 14,
    },
    boldText: {
        fontFamily: "Inter_700Bold",
    },
    drawerUserButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
    }
});