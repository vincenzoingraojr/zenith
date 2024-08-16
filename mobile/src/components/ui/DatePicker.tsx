import { FunctionComponent, useState } from "react";
import { Pressable, SafeAreaView } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { globalStyles } from "../../constants/global";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

interface DatePickerProps {
    value: Date;
    onUpdateValue: (args: Date) => void;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({ value, onUpdateValue }) => {
    const [show, setShow] = useState(false);

    const onChange = (_event: DateTimePickerEvent, value?: Date) => {
        const currentDate = value;
        setShow(false);
        
        if (currentDate) {
            onUpdateValue(currentDate);
        }
    };

    return (
        <SafeAreaView>
            <Pressable style={globalStyles.calendarButton} onPress={() => setShow(true)}>
                <Ionicons name={"calendar-outline"} size={24} color={COLORS.white} />
            </Pressable>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={value}
                    mode={"date"}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </SafeAreaView>
    );
}

export default DatePicker;