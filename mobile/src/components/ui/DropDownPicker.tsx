import { FunctionComponent } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { theme } from "../../constants/theme";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS } from "../../constants/colors";

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

    return (
        <View>
            {(errors && errors[field]) && (
                <Text style={styles.text}>{errors[field]}</Text>
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
                onChange={item => {
                    onUpdateValue(item.value);
                }}
            />
        </View>
    );
}

const dropDownStyles = StyleSheet.create({
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