import { FunctionComponent } from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import EditorField from "./EditorField";

interface LumenInputProps {
    type: "post" | "comment";
    placeholder: string;
    isReplyToId?: number;
    isReplyToType?: string;
    quotedPostId?: number;
    buttonText: string;
}

const LumenInputContainer = styled.div`
    display: block;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 36px;
`;

const LumenInput: FunctionComponent<LumenInputProps> = ({ type, placeholder, isReplyToId, isReplyToType, quotedPostId, buttonText }) => {
    return (
        <LumenInputContainer>
            <Formik
                initialValues={{
                    type,
                    content: "",
                    media: [],
                    isReplyToId,
                    isReplyToType,
                    quotedPostId,
                }}
                onSubmit={async (values, { setErrors, setStatus }) => {

                }}
            >
                {({ errors, status }) => (
                    <Form>
                        <EditorField
                            field="content"
                            placeholder={placeholder}
                            errors={errors}
                            status={status}
                            buttonText={buttonText}
                        />
                    </Form>
                )}
            </Formik>
        </LumenInputContainer>
    );
}

export default LumenInput;