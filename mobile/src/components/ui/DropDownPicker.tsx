import { FunctionComponent, useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { theme } from "../../constants/theme";

interface DropDownPickerProps {
    field: string;
    value: string;
    onUpdateValue: React.Dispatch<React.SetStateAction<string>>;
    options: { label: string, value: string }[];
    errors?: Record<string, string>;
}

const DropDownPickerField: FunctionComponent<DropDownPickerProps> = ({ field, value, onUpdateValue, options, errors }) => {
    const [open, setOpen] = useState(false);
    const styles = theme();
    const [items, setItems] = useState(options);

    return (
        <View>
            {(errors && errors[field]) && (
                <Text style={styles.text}>{errors[field]}</Text>
            )}
            <DropDownPicker
                value={value}
                setValue={onUpdateValue}
                items={items}
                setItems={setItems}
                open={open}
                setOpen={setOpen}
                listMode="SCROLLVIEW"
            />
        </View>
    );
}

export default DropDownPickerField;