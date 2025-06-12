import { Field } from "formik";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Eye from "../icons/Eye";
import { InputProps } from "./commons";

interface InputFieldProps extends InputProps {
    type: string;
    placeholder: string;
    value?: string;
}

const InputFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const InputFieldError = styled.div`
    display: block;
    font-size: 14px;
`;

const InputFieldContainer = styled.div`
    display: block;
    position: relative;
    background-color: ${({ theme }) => theme.inputBackground};
    min-height: 60px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 6px;
`;

const InputInfoContainer = styled.div.attrs(
    (props: { focus: boolean }) => props
)`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: ${(props) => (props.focus ? "4px" : "19px")};
    margin-bottom: ${(props) => (props.focus ? "4px" : "0px")};
    transition: margin ease 0.2s;
`;

const LabelInputInfo = styled.label.attrs((props: { focus: boolean }) => props)`
    display: block;
    font-size: ${(props) => (props.focus ? "14px" : "16px")};
    cursor: pointer;
    transition: font-size ease 0.2s;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    min-height: 26px;
    width: 100%;
    margin-top: 30px;
    transition: margin ease 0.2s;
    margin-bottom: 4px;
`;

const InputContainerField = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 12px;
`;

const ShowPassword = styled.div`
    display: block;
    cursor: pointer;
    padding: 2px;

    &:hover,
    &:focus {
        border-radius: 9999px;
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

interface TextFieldProps extends InputFieldProps {
    inputRef: any;
    isFocused: boolean;
    setIsFocused: (value: React.SetStateAction<boolean>) => void;
    form: any;
}

const TextField: FunctionComponent<TextFieldProps> = ({
    field,
    type,
    placeholder,
    value,
    inputRef,
    isFocused,
    setIsFocused,
    form,
}) => {
    let isPassword = false;
    const [switchedType, setSwitchedType] = useState(false);
    let showType;

    if (type === "password") {
        isPassword = true;
    }

    if (!switchedType) {
        showType = "password";
    } else {
        showType = "text";
    }

    return (
        <InputContainerField>
            <Field
                id={field}
                as={type === "textarea" ? "textarea" : "input"}
                aria-required
                aria-label={placeholder}
                autoCapitalize="none"
                spellCheck="false"
                autoComplete="off"
                autoCorrect="off"
                maxLength={
                    type === "textarea" ? 1000 : type === "otp" ? 6 : 100
                }
                name={field}
                type={isPassword ? showType : type === "otp" ? "tel" : type}
                pattern={type === "otp" ? "[0-9]*" : undefined}
                onFocus={() => {
                    setIsFocused(true);
                }}
                onBlur={(e: any) => {
                    if (e.target.value.length === 0) {
                        setIsFocused(false);
                    }
                }}
                onChange={(e: any) => {
                    form.setFieldValue(field, e.target.value);

                    if (e.target.value.length > 0 || isFocused) {
                        setIsFocused(true);
                    } else {
                        setIsFocused(false);
                    }
                }}
                value={value}
                innerRef={inputRef}
            />
            {isPassword && (
                <ShowPassword
                    role="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFocused(true);
                        setSwitchedType(!switchedType);

                        if (inputRef && inputRef.current) {
                            inputRef.current.focus();
                        }
                    }}
                >
                    <Eye mode={switchedType} />
                </ShowPassword>
            )}
        </InputContainerField>
    );
};

const InputField: FunctionComponent<InputFieldProps> = ({
    field,
    type,
    placeholder,
    value,
    errors,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const inputField = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (
            inputField &&
            inputField.current &&
            inputField.current.value.length > 0
        ) {
            setIsFocused(true);
        }
    }, []);

    return (
        <InputFieldWrapper>
            {errors && errors[field] && (
                <InputFieldError>{errors[field]}</InputFieldError>
            )}
            <InputFieldContainer
                onClick={() => {
                    setIsFocused(true);

                    if (inputField && inputField.current) {
                        inputField.current.focus();
                    }
                }}
            >
                <InputInfoContainer focus={isFocused}>
                    <LabelInputInfo htmlFor={field} focus={isFocused}>
                        {placeholder}
                    </LabelInputInfo>
                </InputInfoContainer>
                <InputContainer>
                    <Field
                        field={field}
                        component={TextField}
                        placeholder={placeholder}
                        inputRef={inputField}
                        type={type}
                        value={value}
                        isFocused={isFocused}
                        setIsFocused={setIsFocused}
                    />
                </InputContainer>
            </InputFieldContainer>
        </InputFieldWrapper>
    );
};

export default InputField;
