import { FunctionComponent } from "react";
import Select from "react-select";
import { InputProps } from "../commons";

interface SelectProps extends InputProps {
    options: any;
    form: any;
}

const SelectComponent: FunctionComponent<SelectProps> = ({
    options,
    field,
    form,
}) => {    
    return (
        <Select
            options={options}
            name={field.name}
            defaultValue={options.find((option: any) => option.value === field.value) || options[0]}
            value={
                options.find(
                    (option: any) => option.value === field.value
                ) || options[0]
            }
            onChange={(option: any) =>
                form.setFieldValue(field.name, option.value)
            }
            onBlur={field.onBlur}
        />
    );
};

export default SelectComponent;