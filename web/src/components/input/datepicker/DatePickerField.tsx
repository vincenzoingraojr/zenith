import { Field } from "formik";
import { FunctionComponent } from "react";
import {
    CustomFieldWrapper,
    CustomFieldContainer,
    CustomInfoContainer,
    CustomInfo,
    CustomInnerFieldContainer,
    CustomFieldError,
} from "../../../styles/global";
import { InputProps } from "../commons";
import DatePickerComponent from "./DatePickerComponent";

interface DatePickerFieldProps extends InputProps {
    placeholder: string;
}

const DatePickerField: FunctionComponent<DatePickerFieldProps> = ({
    field,
    placeholder,
    errors,
}) => {
    return (
        <CustomFieldWrapper>
            {(errors && errors[field]) && (
                <CustomFieldError>{errors[field]}</CustomFieldError>
            )}
            <CustomFieldContainer>
                <CustomInfoContainer>
                    <CustomInfo>{placeholder}</CustomInfo>
                </CustomInfoContainer>
                <CustomInnerFieldContainer>
                    <Field name={field} component={DatePickerComponent} />
                </CustomInnerFieldContainer>
            </CustomFieldContainer>
        </CustomFieldWrapper>
    );
};

export default DatePickerField;