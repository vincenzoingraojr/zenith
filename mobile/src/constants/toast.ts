import { ToastProps } from "react-native-root-toast";
import { globalStyles } from "./global";
import { COLORS } from "./colors";

export const toastProps: ToastProps = {
    duration: 4000,
    position: 40,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 1,
    textColor: COLORS.white,
    containerStyle: globalStyles.toast,
    textStyle: {
        fontFamily: "Inter_400Regular",
        fontSize: 16,
        fontWeight: "400",
    },
};