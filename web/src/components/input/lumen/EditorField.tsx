import { FunctionComponent } from "react";
import { MediaItem } from "../../../generated/graphql";
import styled from "styled-components";
import { CustomFieldError } from "../../../styles/global";
import { Field } from "formik";
import EditorComponent from "./EditorComponent";

interface EditorFieldProps {
    field: string;
    placeholder: string;
    errors: any;
    status?: boolean;
    value?: string;
    buttonText: string;
    media?: MediaItem[];
}

const EditorFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const EditorField: FunctionComponent<EditorFieldProps> = ({ field, placeholder, errors, status, value, buttonText, media }) => {
    return (
        <EditorFieldContainer>
            {errors[field] && (
                <CustomFieldError>{errors[field]}</CustomFieldError>
            )}
            <Field
                name={field}
                component={EditorComponent}
                placeholder={placeholder}
                status={status}
                value={value}
                buttonText={buttonText}
                mediaArray={media}
            />
        </EditorFieldContainer>
    );
}

export default EditorField;