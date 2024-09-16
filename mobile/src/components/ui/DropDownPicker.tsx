import { FunctionComponent, useState } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { textColorProp, theme } from "../../constants/theme";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS } from "../../constants/colors";
import Down from "../icons/Down";
import { globalStyles } from "../../constants/global";

interface DropDownPickerProps {
    field: string;
    value: string;
    placeholder: string;
    onUpdateValue: React.Dispatch<React.SetStateAction<string>>;
    options: { label: string, value: string }[];
    errors?: Record<string, string>;
}

const DropDownPickerField: FunctionComponent<DropDownPickerProps> = ({ field, value, placeholder, onUpdateValue, options, errors }) => {
    const colorScheme = useColorScheme();
    const styles = theme();
    const [isFocus, setIsFocus] = useState(false);
    const color = textColorProp();

    return (
        <View style={dropDownStyles.wrapper}>
            {(errors && errors[field]) && (
                <Text style={[styles.text, globalStyles.error]}>{errors[field]}</Text>
            )}
            <Dropdown
                style={[dropDownStyles.dropDownContainer, { backgroundColor: colorScheme === "dark" ? COLORS.grey : COLORS.lightGrey }]}
                containerStyle={[dropDownStyles.containerStyle, { backgroundColor: colorScheme === "dark" ? COLORS.grey : COLORS.lightGrey }]}
                placeholderStyle={[styles.text, dropDownStyles.text]}
                selectedTextStyle={[styles.text, dropDownStyles.text]}
                itemTextStyle={[styles.text, dropDownStyles.text]}
                activeColor={COLORS.blue}
                data={options}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    onUpdateValue(item.value);
                    setIsFocus(false);
                }}
                renderRightIcon={() => (
                    <Down mode={isFocus} color={color} />
                )}
            />
        </View>
    );
}

const dropDownStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        gap: 12,
    },
    dropDownContainer: {
        height: 60,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 6,
    },
    containerStyle: {
        paddingTop: 8,
        borderRadius: 6,
        borderWidth: 0,
        paddingBottom: 8,
    },
    text: {
        fontSize: 16,
    },
});

export default DropDownPickerField;