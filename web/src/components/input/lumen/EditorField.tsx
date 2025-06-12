import { FunctionComponent } from "react";
import styled from "styled-components";
import { CustomFieldError } from "../../../styles/global";
import { Field } from "formik";
import EditorComponent from "./EditorComponent";
import { FileWrapper, ProgressStatus } from "../commons";

interface EditorFieldProps {
    field: string;
    placeholder: string;
    errors: any;
    status?: boolean;
    values: {
        type: string;
        content: string;
        media: FileWrapper[];
    };
    buttonText: string;
    progress: ProgressStatus[];
}

const EditorFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const EditorField: FunctionComponent<EditorFieldProps> = ({
    field,
    placeholder,
    errors,
    status,
    buttonText,
    values,
    progress,
}) => {
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
                buttonText={buttonText}
                values={values}
                progress={progress}
            />
        </EditorFieldContainer>
    );
};

export default EditorField;
