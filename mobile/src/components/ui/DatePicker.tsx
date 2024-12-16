import { FunctionComponent, useState } from "react";
import { Platform, Pressable, SafeAreaView } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { globalStyles } from "../../constants/global";
import Calendar from "../icons/Calendar";

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
            {Platform.OS !== "ios" && (
                <Pressable style={globalStyles.calendarButton} onPress={() => setShow(true)}>
                    <Calendar />
                </Pressable>
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={value}
                    mode={"date"}
                    onChange={onChange}
                />
            )}
        </SafeAreaView>
    );
}

export default DatePicker;