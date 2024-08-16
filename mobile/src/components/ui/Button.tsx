import { FunctionComponent } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
    buttonStyle: { backgroundColor: string; color: string, borderColor?: string, borderWidth?: number, borderRadius?: number };
    text: string;
    onPress: () => void;
    disabled?: boolean;
    smallButton?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({ buttonStyle, text, onPress, disabled, smallButton }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                buttonStyles.button,
                pressed && buttonStyles.pressed,
                {
                    backgroundColor: buttonStyle.backgroundColor,
                    borderRadius: buttonStyle.borderRadius || 24,
                    borderWidth: buttonStyle.borderWidth || 0,
                    borderColor: buttonStyle.borderColor || "transparent",
                    paddingTop: smallButton ? 6 : 12,
                    paddingLeft: smallButton ? 18 : 24,
                    paddingRight: smallButton ? 18 : 24,
                    paddingBottom: smallButton ? 6 : 12,
                    opacity: disabled ? 0.7 : 1,
                }
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[buttonStyles.text, { color: buttonStyle.color }]}>{text}</Text>
        </Pressable>
    );
};

const buttonStyles = StyleSheet.create({
    button: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        opacity: 1,
    },
    text: {
        fontFamily: "Inter_700Bold",
        fontSize: 18,
    },
    pressed: {
        opacity: 0.7,
    },
});

export default Button;