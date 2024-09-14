import { FunctionComponent, useState } from "react";
import { Pressable, SafeAreaView } from "react-native";
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
            <Pressable style={globalStyles.calendarButton} onPress={() => setShow(true)}>
                <Calendar />
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