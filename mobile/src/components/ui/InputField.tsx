import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Animated, KeyboardTypeOptions, NativeSyntheticEvent, Pressable, StyleSheet, Text, TextInput, TextInputFocusEventData, View, useColorScheme } from "react-native";
import { theme } from "../../constants/theme";
import { COLORS } from "../../constants/colors";
import Eye from "../icons/Eye";

type InputType = "text" | "password";

interface InputFieldProps {
    field: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    value: string;
    onUpdateValue: (args: string) => void;
    type?: InputType;
    errors?: Record<string, string>;
}

const InputField: FunctionComponent<InputFieldProps> = ({
    field,
    placeholder,
    keyboardType = "default",
    value,
    onUpdateValue,
    type = "text",
    errors,
}) => {
    const colorScheme = useColorScheme();
    const styles = theme();
    const [secure, setSecure] = useState<boolean>(true);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput | null>(null);

    useEffect(() => {
        if (value.length > 0) {
            setIsFocused(true);
        }
    }, [value]);

    const marginTopValue = useRef(new Animated.Value(19)).current;
    const marginBottomValue = useRef(new Animated.Value(0)).current;
    const fontSizeValue = useRef(new Animated.Value(16)).current;

    useEffect(() => {
        if (isFocused) {
            Animated.timing(marginTopValue, {
                toValue: 4,
                duration: 100,
                useNativeDriver: false,
            }).start();

            Animated.timing(marginBottomValue, {
                toValue: 4,
                duration: 100,
                useNativeDriver: false,
            }).start();

            Animated.timing(fontSizeValue, {
                toValue: 14,
                duration: 100,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(marginTopValue, {
                toValue: 19,
                duration: 100,
                useNativeDriver: false,
            }).start();

            Animated.timing(marginBottomValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();

            Animated.timing(fontSizeValue, {
                toValue: 16,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }
    }, [isFocused]);

    return (
        <View style={inputStyles.wrapper}>
            {(errors && errors[field]) && (
                <Text style={[styles.text, inputStyles.error]}>{errors[field]}</Text>
            )}
            <Pressable
                onPress={() => {
                    setIsFocused(true);

                    if (inputRef && inputRef.current) {
                        inputRef.current.focus();
                    }
                }}
                style={[inputStyles.inputContainer, { backgroundColor: colorScheme === "dark" ? COLORS.grey : COLORS.lightGrey }]}
            >
                <Animated.View style={[inputStyles.inputInfoContainer, { marginTop: marginTopValue, marginBottom: marginBottomValue }]}>
                    <Animated.Text style={[styles.text, { fontSize: fontSizeValue }]}>{placeholder}</Animated.Text>
                </Animated.View>
                <View style={inputStyles.fieldContainer}>
                    <View style={inputStyles.container}>
                        <View style={inputStyles.inputBox}>
                            <TextInput
                                ref={inputRef}
                                style={[styles.input, inputStyles.input]}
                                autoCapitalize="none"
                                keyboardType={keyboardType}
                                placeholderTextColor={styles.input.color}
                                secureTextEntry={type === "password" ? secure : false}
                                value={value}
                                onChangeText={onUpdateValue}
                                cursorColor={styles.input.color}
                                selectionColor={COLORS.blue}
                                underlineColorAndroid="transparent"
                                onFocus={() => {
                                    setIsFocused(true);
                                }}
                                onBlur={() => {
                                    if (value.length === 0) {
                                        setIsFocused(false);
                                    }
                                }}
                                onChange={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {                
                                    if ((e.nativeEvent.text && e.nativeEvent.text.length > 0) || isFocused) {
                                        setIsFocused(true);
                                    } else {
                                        setIsFocused(false);
                                    }
                                }}
                            />
                        </View>
                        {type === "password" && (
                            <Pressable style={inputStyles.visibilityBox} onPress={() => setSecure(!secure)}>
                                <Eye mode={secure} color={styles.input.color} />
                            </Pressable>
                        )}
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

const inputStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        gap: 12,
    },
    inputContainer: {
        position: "relative",
        minHeight: 60,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 6,
    },
    inputInfoContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 12,
        paddingRight: 12,
        height: 22,
    },
    fieldContainer: {
        flex: 1,
        alignItems: "center",
        minHeight: 26,
        width: "100%",
        marginTop: 30,
        marginBottom: 4,
    },
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    error: {
        fontSize: 16,
        color: COLORS.red,
    },
    inputBox: {
        flex: 1,
        alignItems: "center",
    },
    input: {
        width: "100%",
    },
    visibilityBox: {
        flex: 0,
    },
});

export default InputField;