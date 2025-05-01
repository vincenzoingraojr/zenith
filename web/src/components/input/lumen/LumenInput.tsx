import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import EditorField from "./EditorField";
import { useMeData } from "../../../utils/userQueries";
import axios from "axios";
import { useToasts } from "../../utils/ToastProvider";
import { FileWrapper, ProgressStatus } from "../commons";
import { PostFeedDocument, PostFeedQuery, useCreatePostMutation, usePostFeedQuery } from "../../../generated/graphql";
import { BAD_REQUEST_MESSAGE } from "../../../utils/constants";
import { toErrorMap } from "../../../utils/toErrorMap";

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
    padding-bottom: 12px;
`;

const LumenInput: FunctionComponent<LumenInputProps> = ({ type, placeholder, isReplyToId, isReplyToType, quotedPostId, buttonText }) => {
    const [mediaUploadStatusArray, setMediaUploadStatusArray] = useState<ProgressStatus[]>([]);

    const folder = process.env.NODE_ENV === "development" ? "local-media" : "media";

    const { me } = useMeData();

    const { addToast } = useToasts();

    const [createPost] = useCreatePostMutation();

    const { data: postFeedData } = usePostFeedQuery({
        fetchPolicy: "cache-and-network",
    });

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
                    let postMediaDirectory = "";
                    let mediaArray: { src: string; alt: string; type: string }[] = [];
                    const media: FileWrapper[] = values.media;

                    if (media.length > 0 && me) {
                        postMediaDirectory = `${folder}/${new Date().getTime()}-${me.id}`;

                        for (const item of media) {
                            const file = item.file as File;
                            const alt = item.alt as string;

                            const postMediaKey = `${postMediaDirectory}/item-${item.id}.${file.name.split(".").pop()}`;

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
                                    
                                    setMediaUploadStatusArray((mediaUploadStatusArray) =>
                                        mediaUploadStatusArray.some(status => status.id === item.id)
                                            ? mediaUploadStatusArray.map(status =>
                                                  status.id === item.id ? { ...status, progress } : status
                                              )
                                            : [...mediaUploadStatusArray, { id: item.id, progress } as ProgressStatus]
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
                                        src: `https://${file.type.includes("image") ? "img" : "vid"}.zncdn.net/${postMediaKey}`,
                                        alt: alt as string,
                                        type: file.type,
                                    });
                                })
                                .catch((error) => {
                                    addToast(`An error occurred while uploading the media item (${item.id}). Error code: ${error.code}.`);

                                    setMediaUploadStatusArray((mediaUploadStatusArray) =>
                                        mediaUploadStatusArray.map(status =>
                                            status.id === item.id ? { ...status, progress: -1 } : status
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
                            isReplyToId: values.isReplyToId,
                            isReplyToType: values.isReplyToType,
                            quotedPostId: values.quotedPostId,
                        },
                        update: (store, { data }) => {
                            if (
                                data &&
                                data.createPost &&
                                data.createPost.post
                            ) {
                                if (type === "post" && postFeedData) {
                                    store.writeQuery<PostFeedQuery>({
                                        query: PostFeedDocument,
                                        data: {
                                            postFeed: [
                                                data.createPost.post,
                                                ...(postFeedData.postFeed ||
                                                    []),
                                            ],
                                        },
                                    });
                                }
                            }
                        },
                    });

                    if (response.data) {
                        if (
                            response.data.createPost.errors &&
                            response.data.createPost.errors.length > 0
                        ) {
                            setErrors(toErrorMap(response.data.createPost.errors));
                            setStatus(false);
                        } else if (response.data.createPost.ok && response.data.createPost.post) {
                            setStatus(true);
                        } else {
                            addToast(response.data.createPost.status as string);
                        }
                    } else {
                        addToast(BAD_REQUEST_MESSAGE);
                    }

                    setMediaUploadStatusArray([]);
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
                            progress={mediaUploadStatusArray}
                        />
                    </Form>
                )}
            </Formik>
        </LumenInputContainer>
    );
}

export default LumenInput;