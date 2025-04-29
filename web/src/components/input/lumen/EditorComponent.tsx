import { FunctionComponent, useEffect, useRef, useState } from "react";
import { MediaItem } from "../../../generated/graphql";
import styled from "styled-components";
import { useMeData } from "../../../utils/useMeData";
import { Link } from "react-router-dom";
import profilePicture from "../../../images/profile-picture.png";
import { Button, ControlContainer, PageBlock, PageText } from "../../../styles/global";
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
import { EMPTY_CONTENT_REGEXP, MATCHERS } from "../../../utils/constants";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import MentionsPlugin from "./mentions/MentionsPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { Field } from "formik";
import Close from "../../icons/Close";
import { getExactSize } from "../../../utils/getExactSize";
import { useToasts } from "../../utils/ToastProvider";

interface EditorComponentProps {
    field: any;
    form: any;
    placeholder: string;
    status?: boolean;
    value?: string;
    buttonText: string;
    mediaArray?: MediaItem[];
    progress: number | number;
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

const MediaItemsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: 100%;
`;

const MediaContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.inputBackground};
    height: auto;
    position: relative;
`;

const MediaMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: auto;
`;

const MediaFileContainer = styled.div`
    display: block;
    width: 100%;
    height: auto;
    border-radius: 12px 12px 0px 0px;

    img, video {
        display: block;
        width: inherit;
        height: inherit;
        border-radius: inherit;
    }
`;

const MediaFileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`;

const MediaSmallInfo = styled(PageText)`
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color};
`;

const DeleteMediaButton = styled(ControlContainer)`
    position: absolute;
    top: 6px;
    left: unset;
    right: 6px;
    bottom: unset;
    width: 24px;
    height: 24px;
    background-color: ${COLORS.opaqueLightGrey};
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: ${COLORS.opaqueDarkGrey};
    }
`;

const MediaAltContainer = styled.div`
    display: flex;
    width: 100%;
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

const EditorComponent: FunctionComponent<EditorComponentProps> = ({ field, form, placeholder, status, value, buttonText, mediaArray, progress }) => {
    const { me } = useMeData();
    const [content, setContent] = useState("");
    const [isEditorEmpty, setIsEditorEmpty] = useState(false);
    const { addToast } = useToasts();

    function onError(error: any) {
        console.error(error);

        addToast(error);
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

    const uploadPostMediaRef = useRef<HTMLInputElement | null>(null);

    const [media, setMedia] = useState<File[]>([]);
    const [altTexts, setAltTexts] = useState<string[]>([]);
    const [existingAltTexts, setExistingAltTexts] = useState<(number | string)[][]>([]);
    const [existingMedia, setExistingMedia] = useState<MediaItem[]>(mediaArray || []);
    const [deletedMedia, setDeletedMedia] = useState<number[]>([]);

    useEffect(() => {
        if (EMPTY_CONTENT_REGEXP.test(content) || content === "") {
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
    
    useEffect(() => {
        if (existingMedia.length > 0) {
            setExistingAltTexts(existingMedia.map(item => [item.id, item.alt]));
        }
    }, [existingMedia]);

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (media.length > 0) {
            setVisible(true);
        } else {
            setVisible(false);

            if (uploadPostMediaRef && uploadPostMediaRef.current) {
                uploadPostMediaRef.current.value = "";
            }
        }
    }, [media]);

    useEffect(() => {
        form.setFieldValue("existingAltTexts", existingAltTexts);
    }, [existingAltTexts]);

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
                {existingMedia && existingMedia.length > 0 && existingAltTexts.length > 0 && (
                    <MediaItemsList>
                        {existingMedia.map((item: MediaItem, i: number) => (
                            <MediaContainer key={i}>
                                <MediaMainContainer>
                                    <MediaFileContainer>
                                        {item.type.includes("image") ? (
                                            <img
                                                src={item.src}
                                                alt={altTexts[i]}
                                            />
                                        ) : (
                                            <video controls>
                                                <source src={item.src} type={item.type} />
                                            </video>
                                        )}
                                    </MediaFileContainer>
                                    <MediaFileInfo>
                                        <MediaAltContainer>
                                            <Field
                                                as="input"
                                                aria-label="Alt"
                                                placeholder="Alt"
                                                autoCapitalize="none"
                                                spellCheck="false"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                name={`existingAltTexts[${item.id}]`}
                                                type="text"
                                                value={existingAltTexts[i][1] || ""}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    const updatedAltTexts = existingAltTexts.map(([existingNumber, existingStringValue]) => {
                                                        if (existingNumber === item.id) {
                                                            return [existingNumber, e.target.value];
                                                        }

                                                        return [existingNumber, existingStringValue];
                                                    });
                                                
                                                    setExistingAltTexts(updatedAltTexts);
                                                }}
                                            />
                                        </MediaAltContainer>
                                        <MediaSmallInfo>
                                            Already uploaded
                                        </MediaSmallInfo>
                                    </MediaFileInfo>
                                </MediaMainContainer>
                                <DeleteMediaButton
                                    role="button"
                                    title="Delete media item"
                                    aria-label="Delete media item"
                                    onClick={() => {
                                        setExistingMedia([
                                            ...existingMedia.slice(0, i),
                                            ...existingMedia.slice(i + 1),
                                        ]);
                                        let toBeDeletedMedia = deletedMedia;
                                        toBeDeletedMedia.push(item.id);
                                        setDeletedMedia(toBeDeletedMedia);

                                        form.setFieldValue(
                                            "deletedMedia",
                                            toBeDeletedMedia
                                        );
                                    }}
                                >
                                    <Close type="small" />
                                </DeleteMediaButton>
                            </MediaContainer>
                        ))}
                    </MediaItemsList>
                )}
                {visible && (
                    <MediaItemsList>
                        {media.map((item, i) => (
                            <MediaContainer key={i}>
                                <MediaMainContainer>
                                    <MediaFileContainer>
                                        {item.type.includes("image") ? (
                                            <img
                                                src={URL.createObjectURL(item)}
                                                alt={altTexts[i]}
                                            />
                                        ) : (
                                            <video controls>
                                                <source src={URL.createObjectURL(item)} type={item.type} />
                                            </video>
                                        )}
                                    </MediaFileContainer>
                                    <MediaFileInfo>
                                        <MediaAltContainer>
                                            <Field
                                                as="input"
                                                aria-label="Alt"
                                                placeholder="Alt"
                                                autoCapitalize="none"
                                                spellCheck="false"
                                                autoComplete="off"
                                                autoCorrect="off"
                                                name={`altTexts[${i}]`}
                                                type="text"
                                                value={altTexts[i] || ""}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setAltTexts([
                                                        ...altTexts.slice(0, i),
                                                        e.target.value,
                                                        ...altTexts.slice(
                                                            i + 1
                                                        ),
                                                    ]);
                                                }}
                                            />
                                        </MediaAltContainer>
                                        <MediaSmallInfo>
                                            Size: {getExactSize(item.size)}
                                            {" | Type: "}
                                            {item.type}
                                        </MediaSmallInfo>
                                    </MediaFileInfo>
                                </MediaMainContainer>
                                <DeleteMediaButton
                                    role="button"
                                    title="Delete media item"
                                    aria-label="Delete media item"
                                    onClick={() => {
                                        setMedia([
                                            ...media.slice(0, i),
                                            ...media.slice(i + 1),
                                        ]);
                                        setAltTexts([
                                            ...altTexts.slice(0, i),
                                            ...altTexts.slice(i + 1),
                                        ]);
                                    }}
                                >
                                    <Close type="small" />
                                </DeleteMediaButton>
                            </MediaContainer>
                        ))}
                    </MediaItemsList>
                )}
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
                                    
                                    if ((media.length + mediaArray.length) > 4) {
                                        addToast("You can only upload up to 4 files.");
                                    } else {
                                        setMedia((media) => [
                                            ...media,
                                            ...mediaArray,
                                        ]);
                                    }
                                }}
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