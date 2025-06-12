import { FunctionComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useMeData } from "../../../utils/userQueries";
import { Link, useLocation } from "react-router-dom";
import profilePicture from "../../../images/profile-picture.png";
import {
    Button,
    ControlContainer,
    PageBlock,
    PageText,
} from "../../../styles/global";
import { COLORS } from "../../../styles/colors";
import { mediaQuery } from "../../../utils/mediaQuery";
import { devices } from "../../../styles/devices";
import { MentionNode } from "./mentions/MentionNode";
import {
    $createParagraphNode,
    $createTextNode,
    $getRoot,
    CLEAR_EDITOR_COMMAND,
} from "lexical";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { AutoLinkNode } from "@lexical/link";
import { $createHashtagNode, HashtagNode } from "@lexical/hashtag";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import Image from "../../icons/Image";
import {
    EMPTY_CONTENT_REGEXP,
    MATCHERS,
    USER_TYPES,
} from "../../../utils/constants";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import MentionsPlugin from "./mentions/MentionsPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { Field } from "formik";
import Close from "../../icons/Close";
import { getExactSize } from "../../../utils/getExactSize";
import { useToasts } from "../../utils/ToastProvider";
import { FileWrapper, ProgressStatus } from "../commons";

interface EditorComponentProps {
    field: any;
    form: any;
    placeholder: string;
    status?: boolean;
    values: {
        type: string;
        content: string;
        media: FileWrapper[];
    };
    buttonText: string;
    progress: ProgressStatus[];
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
    max-height: 220px;
    overflow-y: auto;

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

const ProfileImage = styled.div.attrs((props: { type: string }) => props)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: ${(props) =>
        props.type === USER_TYPES.ORGANIZATION ? "6px" : "24px"};

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

    img,
    video {
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
    background-color: ${COLORS.overlayLightGrey};
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: ${COLORS.overlayDarkGrey};
    }
`;

const MediaAltContainer = styled.div`
    display: flex;
    width: 100%;
`;

interface ShouldClearEditorProps {
    setMedia: (items: FileWrapper[]) => void;
    setContent: (content: string) => void;
}

const ShouldClearEditorPlugin: FunctionComponent<ShouldClearEditorProps> = ({
    setMedia,
    setContent,
}) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.focus();
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        setMedia([]);
        setContent("");
    }, [editor, setMedia, setContent]);

    return null;
};

const EditorComponent: FunctionComponent<EditorComponentProps> = ({
    field,
    form,
    placeholder,
    status,
    values,
    buttonText,
    progress,
}) => {
    const { me } = useMeData();
    const [content, setContent] = useState(values.content || "");
    const [isEditorEmpty, setIsEditorEmpty] = useState(false);
    const { addToast } = useToasts();

    function onError(error: any) {
        console.error(error);

        addToast(error);
    }

    const location = useLocation();

    const initialConfig = {
        namespace: "Lumen",
        editorState: () => {
            const root = $getRoot();

            if (values.content.length > 0) {
                const parts = values.content.split("\n");

                for (const part of parts) {
                    const p = $createParagraphNode();
                    p.append($createTextNode(part));
                    root.append(p);
                }

                root.selectEnd();
            } else if (
                location &&
                location.state &&
                location.state.backgroundLocation
            ) {
                const p = $createParagraphNode();

                if (
                    location.state.backgroundLocation.search &&
                    location.state.backgroundLocation.search.length > 0
                ) {
                    const searchParams = new URLSearchParams(
                        location.state.backgroundLocation.search
                    );

                    if (searchParams.get("q")?.startsWith("#")) {
                        p.append(
                            $createHashtagNode(`${searchParams.get("q")}`)
                        );
                        root.append(p);
                        root.selectStart();
                    }
                }
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
    const [media, setMedia] = useState<FileWrapper[]>(values.media || []);

    useEffect(() => {
        if (EMPTY_CONTENT_REGEXP.test(content) || content === "") {
            setIsEditorEmpty(true);
        } else {
            setIsEditorEmpty(false);
        }
    }, [content]);

    useEffect(() => {
        form.setFieldValue("media", media);
    }, [media]);

    useEffect(() => {
        if (
            media.filter((item) => item.status === "uploading").length === 0 &&
            uploadPostMediaRef &&
            uploadPostMediaRef.current
        ) {
            uploadPostMediaRef.current.value = "";
        }
    }, [media]);

    return (
        <EditorComponentWrapper>
            <ProfileImageContainer>
                <Link
                    to={me ? `/${me.username}` : "/"}
                    title={me ? `${me.name}` : ""}
                    aria-label={me ? `${me.name}` : ""}
                >
                    <ProfileImage type={me?.type}>
                        <img
                            src={
                                me && me.profile.profilePicture.length > 0
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
                                const editorContent = editorState.read(() =>
                                    $getRoot().getTextContent()
                                );

                                setContent(editorContent);

                                form.setFieldValue(field.name, editorContent);
                            }}
                        />
                        <HistoryPlugin />
                        <AutoLinkPlugin matchers={MATCHERS} />
                        <ClearEditorPlugin />
                        <HashtagPlugin />
                        {status && (
                            <ShouldClearEditorPlugin
                                setMedia={setMedia}
                                setContent={setContent}
                            />
                        )}
                    </EditorContainer>
                    <MentionsPlugin />
                </LexicalComposer>
                {media.filter(
                    (mediaItem) => mediaItem.status !== "to_be_deleted"
                ).length > 0 && (
                    <MediaItemsList>
                        {media
                            .filter(
                                (mediaItem) =>
                                    mediaItem.status !== "to_be_deleted"
                            )
                            .map((mediaItem) => (
                                <MediaContainer key={mediaItem.id}>
                                    <MediaMainContainer>
                                        <MediaFileContainer>
                                            {mediaItem.file ? (
                                                <>
                                                    {mediaItem.file.type.includes(
                                                        "image"
                                                    ) ? (
                                                        <img
                                                            src={URL.createObjectURL(
                                                                mediaItem.file
                                                            )}
                                                            alt={mediaItem.alt}
                                                        />
                                                    ) : (
                                                        <video controls>
                                                            <source
                                                                src={URL.createObjectURL(
                                                                    mediaItem.file
                                                                )}
                                                                type={
                                                                    mediaItem
                                                                        .file
                                                                        .type
                                                                }
                                                            />
                                                        </video>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {mediaItem.src &&
                                                        mediaItem.src.length >
                                                            0 && (
                                                            <>
                                                                {mediaItem.type.includes(
                                                                    "image"
                                                                ) ? (
                                                                    <img
                                                                        src={
                                                                            mediaItem.src
                                                                        }
                                                                        alt={
                                                                            mediaItem.alt
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <video
                                                                        controls
                                                                    >
                                                                        <source
                                                                            src={
                                                                                mediaItem.src
                                                                            }
                                                                        />
                                                                    </video>
                                                                )}
                                                            </>
                                                        )}
                                                </>
                                            )}
                                        </MediaFileContainer>
                                        <MediaFileInfo>
                                            <MediaAltContainer>
                                                <Field
                                                    as="input"
                                                    aria-label="Description"
                                                    placeholder="Description"
                                                    autoCapitalize="none"
                                                    spellCheck="false"
                                                    autoComplete="off"
                                                    autoCorrect="off"
                                                    name={`mediaItemAlt[${mediaItem.id}]`}
                                                    type="text"
                                                    value={mediaItem.alt}
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        setMedia((prevArray) =>
                                                            prevArray.map(
                                                                (item) =>
                                                                    item.id ===
                                                                    mediaItem.id
                                                                        ? {
                                                                              ...item,
                                                                              alt: e
                                                                                  .target
                                                                                  .value,
                                                                          }
                                                                        : item
                                                            )
                                                        );
                                                    }}
                                                />
                                            </MediaAltContainer>
                                            <MediaSmallInfo>
                                                {mediaItem.status ===
                                                "uploaded" ? (
                                                    <>Already uploaded</>
                                                ) : (
                                                    <>
                                                        Size:{" "}
                                                        {getExactSize(
                                                            mediaItem.file?.size
                                                        )}
                                                        {" | Type: "}
                                                        {mediaItem.file?.type}
                                                        {progress.find(
                                                            (item) =>
                                                                item.id ===
                                                                mediaItem.id
                                                        ) &&
                                                            mediaItem.status ===
                                                                "uploading" &&
                                                            ` | Uploading: ${
                                                                progress.find(
                                                                    (item) =>
                                                                        item.id ===
                                                                        mediaItem.id
                                                                )?.progress
                                                            }%`}
                                                    </>
                                                )}
                                            </MediaSmallInfo>
                                        </MediaFileInfo>
                                    </MediaMainContainer>
                                    <DeleteMediaButton
                                        role="button"
                                        title="Delete media item"
                                        aria-label="Delete media item"
                                        onClick={() => {
                                            if (
                                                mediaItem.status === "uploaded"
                                            ) {
                                                setMedia((prevArray) =>
                                                    prevArray.map((item) =>
                                                        item.id === mediaItem.id
                                                            ? {
                                                                  ...item,
                                                                  status: "to_be_deleted",
                                                              }
                                                            : item
                                                    )
                                                );
                                            } else {
                                                setMedia((prevArray) =>
                                                    prevArray.filter(
                                                        (item) =>
                                                            item.id !==
                                                            mediaItem.id
                                                    )
                                                );
                                            }
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
                                    let mediaArrayToUpload: File[] = Array.from(
                                        event.target.files!
                                    );

                                    if (
                                        media.length +
                                            mediaArrayToUpload.length >
                                        4
                                    ) {
                                        addToast(
                                            "You can only upload up to 4 files."
                                        );
                                    } else {
                                        const newItems: FileWrapper[] =
                                            mediaArrayToUpload.map(
                                                (item, index) => ({
                                                    id:
                                                        media.length +
                                                        index +
                                                        new Date().getTime(),
                                                    alt: "",
                                                    file: item,
                                                    type: item.type,
                                                    status: "uploading",
                                                })
                                            );

                                        setMedia((prevArray) => [
                                            ...prevArray,
                                            ...newItems,
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
};

export default EditorComponent;
