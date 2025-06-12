import { FunctionComponent, useState } from "react";
import { Form, Formik } from "formik";
import EditorField from "./EditorField";
import { useMeData } from "../../../utils/userQueries";
import axios from "axios";
import { useToasts } from "../../utils/ToastProvider";
import { FileWrapper, ProgressStatus } from "../commons";
import {
    PostCommentsDocument,
    useCreatePostMutation,
} from "../../../generated/graphql";
import { BAD_REQUEST_MESSAGE, POST_TYPES } from "../../../utils/constants";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { LumenInputContainer } from "../../../styles/global";

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

    const { addToast } = useToasts();

    const [createPost, { client }] = useCreatePostMutation();

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
                onSubmit={async (values, { setErrors, setStatus }) => {
                    let postMediaDirectory = "";
                    const mediaArray: {
                        src: string;
                        alt: string;
                        type: string;
                    }[] = [];
                    const media: FileWrapper[] = [...values.media];

                    if (media.length > 0 && me) {
                        postMediaDirectory = `${folder}/${new Date().getTime()}-${
                            me.id
                        }`;

                        for (const item of media) {
                            const file = item.file as File;
                            const alt = item.alt as string;

                            const postMediaKey = `${postMediaDirectory}/item-${
                                item.id
                            }.${file.name.split(".").pop()}`;

                            const { url: postMediaUrl } = await fetch(
                                `${process.env.REACT_APP_SERVER_ORIGIN}/presigned-url`,
                                {
                                    method: "POST",
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        type: "put",
                                        key: postMediaKey,
                                        itemType: file.type,
                                    }),
                                }
                            ).then((res) => res.json());

                            const postMediaConfig = {
                                onUploadProgress: function (
                                    progressEvent: any
                                ) {
                                    const progress = Math.round(
                                        (progressEvent.loaded * 100) /
                                            progressEvent.total
                                    );

                                    setMediaUploadStatusArray(
                                        (mediaUploadStatusArray) =>
                                            mediaUploadStatusArray.some(
                                                (status) =>
                                                    status.id === item.id
                                            )
                                                ? mediaUploadStatusArray.map(
                                                      (status) =>
                                                          status.id === item.id
                                                              ? {
                                                                    ...status,
                                                                    progress,
                                                                }
                                                              : status
                                                  )
                                                : [
                                                      ...mediaUploadStatusArray,
                                                      {
                                                          id: item.id,
                                                          progress,
                                                          status: "ok",
                                                      } as ProgressStatus,
                                                  ]
                                    );
                                },
                                headers: {
                                    "Content-Type": file.type,
                                    "Access-Control-Allow-Origin": "*",
                                },
                            };

                            await axios
                                .put(postMediaUrl, file, postMediaConfig)
                                .then(() => {
                                    mediaArray.push({
                                        src: `https://${
                                            file.type.includes("image")
                                                ? "img"
                                                : "vid"
                                        }.zncdn.net/${postMediaKey}`,
                                        alt: alt as string,
                                        type: file.type,
                                    });
                                })
                                .catch((error) => {
                                    addToast(
                                        `An error occurred while uploading the media item (${item.id}). Error code: ${error.code}.`
                                    );

                                    setMediaUploadStatusArray(
                                        (mediaUploadStatusArray) =>
                                            mediaUploadStatusArray.map(
                                                (status) =>
                                                    status.id === item.id
                                                        ? {
                                                              ...status,
                                                              progress: 0,
                                                              status: "error",
                                                          }
                                                        : status
                                            )
                                    );
                                });
                        }
                    }

                    const response = await createPost({
                        variables: {
                            type: values.type,
                            content: values.content,
                            media: JSON.stringify(mediaArray),
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
                            setStatus(false);
                        } else if (
                            response.data.createPost.ok &&
                            response.data.createPost.post
                        ) {
                            setStatus(true);

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
                                                                views
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
                                                                mentions
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

                                const { totalCount: oldCount, hasMore } = (
                                    existing as {
                                        postComments: {
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

                            setStatus(false);
                        }
                    } else {
                        addToast(BAD_REQUEST_MESSAGE);
                        setStatus(false);
                    }

                    setMediaUploadStatusArray([]);
                }}
            >
                {({ errors, status, values }) => (
                    <Form>
                        <EditorField
                            field="content"
                            placeholder={placeholder}
                            errors={errors}
                            status={status}
                            values={values}
                            buttonText={buttonText}
                            progress={mediaUploadStatusArray}
                        />
                    </Form>
                )}
            </Formik>
        </LumenInputContainer>
    );
};

export default LumenInput;
