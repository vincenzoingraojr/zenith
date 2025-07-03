import { FunctionComponent, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { useMeData } from "../../../utils/userQueries";
import { useToasts } from "../../utils/ToastProvider";
import { FileWrapper, ProgressStatus } from "../commons";
import {
    Post,
    PostCommentsDocument,
    useCreatePostMutation,
} from "../../../generated/graphql";
import { BAD_REQUEST_MESSAGE, POST_TYPES } from "../../../utils/constants";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { CustomFieldError, EditorFieldContainer, LumenInputContainer } from "../../../styles/global";
import EditorComponent from "./EditorComponent";
import { client } from "../../..";
import { uploadAllMedia } from "./utils/uploadFile";

interface LumenInputProps {
    type: "post" | "comment";
    placeholder: string;
    isReplyToId?: number;
    isReplyToType?: string;
    quotedPostId?: number;
    buttonText: string;
    closingOnSubmit?: boolean;
}

const LumenInput: FunctionComponent<LumenInputProps> = ({
    type,
    placeholder,
    isReplyToId,
    isReplyToType,
    quotedPostId,
    buttonText,
    closingOnSubmit,
}) => {
    const folder =
        process.env.NODE_ENV === "development" ? "local-media" : "media";

    const { me } = useMeData();

    type EditorComponentHandle = {
        clearEditor: () => void;
    };
    const editorRef = useRef<EditorComponentHandle>(null);

    const { addToast } = useToasts();

    const [createPost] = useCreatePostMutation();

    const navigate = useNavigate();

    const [mediaUploadStatusArray, setMediaUploadStatusArray] = useState<
        ProgressStatus[]
    >([]);

    return (
        <LumenInputContainer>
            <Formik
                initialValues={{
                    type,
                    content: "",
                    media: [] as FileWrapper[],
                }}
                onSubmit={async (values, { setErrors }) => {
                    let postMediaDirectory = "";
                    let media = [...values.media];

                    if (media.length > 0 && me) {
                        postMediaDirectory = `${folder}/${new Date().getTime()}-${me.id}`;
                        media = await uploadAllMedia(media, postMediaDirectory, setMediaUploadStatusArray, addToast);
                    }

                    const response = await createPost({
                        variables: {
                            type: values.type,
                            content: values.content,
                            media: JSON.stringify(media),
                            isReplyToId,
                            isReplyToType,
                            quotedPostId,
                        },
                    });

                    if (response.data) {
                        if (
                            response.data.createPost.errors &&
                            response.data.createPost.errors.length > 0
                        ) {
                            setErrors(
                                toErrorMap(response.data.createPost.errors)
                            );
                        } else if (
                            response.data.createPost.ok &&
                            response.data.createPost.post
                        ) {
                            if (editorRef.current) {
                                editorRef.current.clearEditor();
                            }

                            if (type === "post") {
                                const newPost = response.data.createPost.post;

                                client.cache.modify({
                                    fields: {
                                        postFeed(
                                            existing = {
                                                posts: [],
                                                hasMore: true,
                                            }
                                        ) {
                                            const exists = existing.posts.some(
                                                (p: any) =>
                                                    p.__ref ===
                                                    `Post:${newPost.id}`
                                            );

                                            if (exists) return existing;

                                            return {
                                                hasMore: existing.hasMore,
                                                posts: [
                                                    client.cache.writeFragment({
                                                        data: newPost,
                                                        fragment: gql`
                                                            fragment NewPost on Post {
                                                                id
                                                                itemId
                                                                authorId
                                                                type
                                                                content
                                                                isEdited
                                                                lang
                                                                topics
                                                                author {
                                                                    id
                                                                    name
                                                                    username
                                                                    email
                                                                    type
                                                                    gender
                                                                    birthDate {
                                                                        date
                                                                        monthAndDayVisibility
                                                                        yearVisibility
                                                                    }
                                                                    emailVerified
                                                                    profile {
                                                                        profilePicture
                                                                        profileBanner
                                                                        bio
                                                                        website
                                                                    }
                                                                    userSettings {
                                                                        incomingMessages
                                                                        twoFactorAuth
                                                                    }
                                                                    searchSettings {
                                                                        hideSensitiveContent
                                                                        hideBlockedAccounts
                                                                    }
                                                                    createdAt
                                                                    updatedAt
                                                                    hiddenPosts
                                                                    identity {
                                                                        verified
                                                                        verifiedSince
                                                                    }
                                                                    verification {
                                                                        verified
                                                                        verifiedSince
                                                                    }
                                                                }
                                                                isReplyToId
                                                                isReplyToType
                                                                quotedPostId
                                                                media {
                                                                    id
                                                                    type
                                                                    src
                                                                    alt
                                                                }
                                                                hashtags
                                                                createdAt
                                                                updatedAt
                                                            }
                                                        `,
                                                    }),
                                                    ...existing.posts,
                                                ],
                                                totalCount:
                                                    existing.totalCount + 1,
                                            };
                                        },
                                    },
                                });
                            } else {
                                const existing = client.cache.readQuery({
                                    query: PostCommentsDocument,
                                    variables: {
                                        id: isReplyToId,
                                        type: isReplyToType,
                                        limit: 3,
                                    },
                                });

                                const {
                                    posts: existingPosts,
                                    totalCount: oldCount,
                                    hasMore,
                                } = (
                                    existing as {
                                        postComments: {
                                            posts: Post[];
                                            totalCount: number;
                                            hasMore: boolean;
                                        };
                                    }
                                ).postComments;

                                client.cache.writeQuery({
                                    query: PostCommentsDocument,
                                    variables: {
                                        id: isReplyToId,
                                        type: isReplyToType,
                                        limit: 3,
                                    },
                                    data: {
                                        postComments: {
                                            posts: [
                                                response.data.createPost.post,
                                                ...existingPosts,
                                            ],
                                            totalCount: oldCount + 1,
                                            hasMore,
                                        },
                                    },
                                });
                            }

                            addToast(
                                `Your ${
                                    values.type === POST_TYPES.COMMENT
                                        ? POST_TYPES.COMMENT
                                        : POST_TYPES.POST
                                } has been created successfully.`
                            );

                            if (closingOnSubmit) {
                                if (window.history.length > 2) {
                                    navigate(-1);
                                } else {
                                    navigate("/");
                                }
                            }
                        } else {
                            addToast(response.data.createPost.status as string);
                        }
                    } else {
                        addToast(BAD_REQUEST_MESSAGE);
                    }

                    setMediaUploadStatusArray([]);
                }}
            >
                {({ errors }) => (
                    <Form>
                        <EditorFieldContainer>
                            {errors && errors["content"] && (
                                <CustomFieldError>{errors["content"]}</CustomFieldError>
                            )}
                            <EditorComponent
                                ref={editorRef}
                                placeholder={placeholder}
                                buttonText={buttonText}
                                progress={mediaUploadStatusArray}
                            />
                        </EditorFieldContainer>
                    </Form>
                )}
            </Formik>
        </LumenInputContainer>
    );
};

export default LumenInput;
