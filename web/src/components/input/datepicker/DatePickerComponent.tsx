import { FunctionComponent } from "react";
import DatePicker from "react-datepicker";
import { InputProps } from "../commons";

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
