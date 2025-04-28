import { FunctionComponent } from "react";
import { MediaItem } from "../../../generated/graphql";
import styled from "styled-components";

interface EditorComponentProps {
    field: any;
    form: any;
    placeholder: string;
    status?: boolean;
    value?: string;
    buttonText: string;
    mediaArray?: MediaItem[];
}

const EditorComponentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 16px;
`;

const EditorComponent: FunctionComponent<EditorComponentProps> = ({ field, form, placeholder, status, value, buttonText, mediaArray }) => {
    return (
        <EditorComponentWrapper>
            Editor
        </EditorComponentWrapper>
    );
}

export default EditorComponent;