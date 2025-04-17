import { FunctionComponent } from "react";
import DatePicker from "react-datepicker";
import { InputProps } from "../commons";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps extends InputProps {
    form: any;
}

const DatePickerComponent: FunctionComponent<DatePickerProps> = ({
    field,
    form,
}) => {
    return (
        <DatePicker
            selected={(field.value && new Date(field.value)) || null}
            onChange={(date) => form.setFieldValue(field.name, date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
        />
    );
};

export default DatePickerComponent;