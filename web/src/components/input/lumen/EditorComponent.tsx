import { FunctionComponent, useEffect, useRef, useState } from "react";
import { MediaItem } from "../../../generated/graphql";
import styled from "styled-components";
import { useMeData } from "../../../utils/useMeData";
import { Link } from "react-router-dom";
import profilePicture from "../../../images/profile-picture.png";
import { Button, ControlContainer, PageBlock } from "../../../styles/global";
import { COLORS } from "../../../styles/colors";
import { mediaQuery } from "../../../utils/mediaQuery";
import { devices } from "../../../styles/devices";
import { MentionNode } from "./mentions/MentionNode";
import { $createParagraphNode, $createTextNode, $getRoot, CLEAR_EDITOR_COMMAND } from "lexical";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { AutoLinkNode } from "@lexical/link";
import { HashtagNode } from "@lexical/hashtag";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import Image from "../../icons/Image";
import { MATCHERS } from "../../../utils/constants";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import MentionsPlugin from "./mentions/MentionsPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

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

const EditorComponentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
    overflow-x: hidden;
`;

const EditorContainer = styled.div`
    display: block;
    position: relative;
    min-height: 54px;
    font-size: 22px;

    div p {
        margin: 0;
    }
`;

const EditorPlaceholder = styled.div`
    color: ${({ theme }) => theme.inputText};
    top: 0;
    left: 0;
    overflow: hidden;
    position: absolute;
    user-select: none;
    pointer-events: none;
`;

const EditorButton = styled(Button)`
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
    opacity: 1;
    cursor: pointer;

    &:disabled {
        opacity: 0.6;
        cursor: unset;
    }
`;

const EditorCommandsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
`;

const EditorButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
`;

const ProfileImageContainer = styled.div`
    display: none;

    ${mediaQuery(
        "(min-width: 600px) and (min-height: 480px)",
        devices.laptopM
    )} {
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }

    a {
        display: block;
        text-decoration: none;
        opacity: 1;
        transition: opacity ease 0.2s;
    }

    a:hover,
    a:active {
        text-decoration: none;
        opacity: 0.8;
    }
`;

const ProfileImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 24px;

    img {
        width: inherit;
        height: inherit;
        border-radius: inherit;
    }
`;

const PostMediaUploadButton = styled(ControlContainer)`
    input[type="file"] {
        position: absolute;
        width: 36px;
        height: 36px;
        visibility: hidden;
    }
`;

interface ShouldClearEditorProps {
    setMedia: (media: File[]) => void;
    setAltTexts: (altTexts: string[]) => void;
    setContent: (content: string) => void;
}

const ShouldClearEditorPlugin: FunctionComponent<ShouldClearEditorProps> = ({
    setMedia,
    setAltTexts,
    setContent,
}) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.focus();
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        setMedia([]);
        setAltTexts([]);
        setContent("");
    }, [editor, setMedia, setAltTexts, setContent]);

    return null;
};

const EditorComponent: FunctionComponent<EditorComponentProps> = ({ field, form, placeholder, status, value, buttonText, mediaArray }) => {
    const { me } = useMeData();
    const [content, setContent] = useState("");
    const [isEditorEmpty, setIsEditorEmpty] = useState(false);

    function onError(error: any) {
        console.error(error);
    }

    const initialConfig = {
        namespace: "Lumen",
        editorState: () => {
            const root = $getRoot();

            if (value) {
                const parts = value.split("\n");
                
                for (const part of parts) {
                    const p = $createParagraphNode();
                    p.append($createTextNode(part));
                    root.append(p);
                }

                root.selectEnd();

                setContent(value);
            } else {
                root.clear();
            }
        },
        nodes: [AutoLinkNode, MentionNode, HashtagNode],
        onError,
        theme: {
            hashtag: "editor-hashtag",
        },
    };

    const uploadPostMediaRef = useRef<HTMLInputElement>(null);

    const [media, setMedia] = useState<File[]>([]);
    const [altTexts, setAltTexts] = useState<string[]>([]);

    useEffect(() => {
        if (/^\s+\S*/.test(content) || content === "") {
            setIsEditorEmpty(true);
        } else {
            setIsEditorEmpty(false);
        }
    }, [content]);

    const [combinedArray, setCombinedArray] = useState<(File | string)[][]>([]);

    useEffect(() => {
        setCombinedArray(
            media.map((item, i) => [item, altTexts[i] ? altTexts[i] : ""])
        );
    }, [media, altTexts]);

    useEffect(() => {
        form.setFieldValue("media", combinedArray);
    }, [combinedArray]);
    
    return (
        <EditorComponentWrapper>
            <ProfileImageContainer>
                <Link
                    to={me ? `/${me.username}` : "/"}
                    title={me ? `${me.name}` : ""}
                    aria-label={me ? `${me.name}` : ""}
                >
                    <ProfileImage>
                        <img
                            src={
                                (me && me.profile.profilePicture.length > 0)
                                    ? me.profile.profilePicture
                                    : profilePicture
                            }
                            title={me ? `${me.name}'s profile picture` : ""}
                            alt={me ? `${me.name}` : ""}
                        />
                    </ProfileImage>
                </Link>
            </ProfileImageContainer>
            <EditorComponentContainer>
                <LexicalComposer initialConfig={initialConfig}>
                    <EditorContainer>
                        <PlainTextPlugin
                            contentEditable={<ContentEditable />}
                            placeholder={
                                <EditorPlaceholder>
                                    {placeholder}
                                </EditorPlaceholder>
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <OnChangePlugin
                            onChange={(editorState) => {
                                const editorContent = editorState.read(() => $getRoot().getTextContent());
                                
                                setContent(editorContent);

                                form.setFieldValue(
                                    field.name,
                                    editorContent,
                                );
                            }}
                        />
                        <HistoryPlugin />
                        <AutoLinkPlugin matchers={MATCHERS} />
                        <ClearEditorPlugin />
                        <HashtagPlugin />
                        <MentionsPlugin />
                        {status && (
                            <ShouldClearEditorPlugin
                                setMedia={setMedia}
                                setAltTexts={setAltTexts}
                                setContent={setContent}
                            />
                        )}
                    </EditorContainer>
                </LexicalComposer>
                <EditorCommandsContainer>
                    <EditorButtonsContainer>
                        <PostMediaUploadButton
                            role="button"
                            title="Upload media"
                            aria-label="Upload media"
                            onClick={() => {
                                if (uploadPostMediaRef.current) {
                                    uploadPostMediaRef.current.click();
                                }
                            }}
                        >
                            <input
                                type="file"
                                multiple={true}
                                ref={uploadPostMediaRef}
                                name="upload-media"
                                accept="image/png , image/jpeg, image/webp, video/mp4, video/mkv"
                                onChange={(event) => {
                                    let mediaArray: File[] = Array.from(
                                        event.target.files!
                                    );
                                    setMedia((media) => [
                                        ...media,
                                        ...mediaArray,
                                    ]);
                                }}
                                max={4}
                            />
                            <Image />
                        </PostMediaUploadButton>
                    </EditorButtonsContainer>
                    <PageBlock>
                        <EditorButton
                            type="submit"
                            role="button"
                            title={buttonText}
                            aria-label={buttonText}
                            disabled={isEditorEmpty}
                        >
                            {buttonText}
                        </EditorButton>
                    </PageBlock>
                </EditorCommandsContainer>
            </EditorComponentContainer>
        </EditorComponentWrapper>
    );
}

export default EditorComponent;