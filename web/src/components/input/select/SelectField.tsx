import { Field } from "formik";
import { FunctionComponent } from "react";
import SelectComponent from "./SelectComponent";
import {
    CustomFieldWrapper,
    CustomFieldError,
    CustomFieldContainer,
    CustomInfoContainer,
    CustomInfo,
    CustomInnerFieldContainer,
} from "../../../styles/global";
import { InputProps } from "../commons";

interface SelectFieldProps extends InputProps {
    placeholder: string;
    options: any;
}

const SelectField: FunctionComponent<SelectFieldProps> = ({
    field,
    placeholder,
    options,
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
                    <Field
                        name={field}
                        component={SelectComponent}
                        options={options}
                    />
                </CustomInnerFieldContainer>
            </CustomFieldContainer>
        </CustomFieldWrapper>
    );
};

export default SelectField;