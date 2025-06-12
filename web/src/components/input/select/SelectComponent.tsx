import { FunctionComponent } from "react";
import Select from "react-select";
import { InputProps } from "../commons";
import { useTheme } from "../../../styles/theme";
import { COLORS } from "../../../styles/colors";

interface SelectProps extends InputProps {
    options: any;
    form: any;
}

const SelectComponent: FunctionComponent<SelectProps> = ({
    options,
    field,
    form,
}) => {
    const theme = useTheme();

    return (
        <Select
            options={options}
            name={field.name}
            defaultValue={
                options.find((option: any) => option.value === field.value) ||
                options[0]
            }
            value={
                options.find((option: any) => option.value === field.value) ||
                options[0]
            }
            onChange={(option: any) =>
                form.setFieldValue(field.name, option.value)
            }
            onBlur={field.onBlur}
            styles={{
                container: (base) => ({
                    ...base,
                    backgroundColor: theme.inputBackground,
                    borderRadius: "6px",
                    width: "100%",
                }),
                control: (base) => ({
                    ...base,
                    backgroundColor: theme.inputBackground,
                    border: "none",
                    boxShadow: "none",
                    minHeight: "auto",
                }),
                valueContainer: (base) => ({
                    ...base,
                    padding: 0,
                }),
                singleValue: (base) => ({
                    ...base,
                    color: theme.inputText,
                    margin: 0,
                    padding: 0,
                }),
                input: (base) => ({
                    ...base,
                    color: theme.inputText,
                    margin: 0,
                    padding: 0,
                    overflow: "hidden",
                }),
                indicatorSeparator: (base) => ({
                    ...base,
                    display: "none",
                }),
                dropdownIndicator: (base) => ({
                    ...base,
                    padding: 0,
                    color: theme.inputText,
                }),
                menu: (base) => ({
                    ...base,
                    marginTop: "12px",
                    marginBottom: "12px",
                    backgroundColor: theme.inputBackground,
                    borderRadius: "6px",
                    boxSizing: "border-box",
                }),
                menuList: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0,
                }),
                option: (base: any, state: any) => ({
                    ...base,
                    paddingTop: "4px",
                    paddingBottom: "4px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    backgroundColor: state.isSelected
                        ? COLORS.blue
                        : state.isFocused
                        ? COLORS.white
                        : theme.inputBackground,
                    color: state.isSelected
                        ? COLORS.white
                        : state.isFocused
                        ? COLORS.black
                        : theme.inputText,
                    cursor: "pointer",
                }),
                noOptionsMessage: (base) => ({
                    ...base,
                    color: theme.inputText,
                }),
            }}
            classNamePrefix="select"
        />
    );
};

export default SelectComponent;
