import { useNavigate, useParams } from "react-router-dom";
import { CustomFieldError, EditorFieldContainer, LumenInputContainer, LumenModalContainer } from "../../styles/global";
import { useFindPost } from "../../utils/post/postQueries";
import ModalLoading from "../../components/layouts/modal/ModalLoading";
import ErrorOrItemNotFound from "../../components/utils/ErrorOrItemNotFound";
import {
    BAD_REQUEST_MESSAGE,
    ERROR_SOMETHING_WENT_WRONG,
    POST_TYPES,
} from "../../utils/constants";
import {
    FindPostDocument,
    FindPostQuery,
    useEditPostMutation,
} from "../../generated/graphql";
import { Form, Formik } from "formik";
import { FileWrapper, ProgressStatus } from "../../components/input/commons";
import { useMeData } from "../../utils/user/userQueries";
import { useToasts } from "../../components/utils/ToastProvider";
import { toErrorMap } from "../../utils/toErrorMap";
import { useRef, useState } from "react";
import Head from "../../components/Head";
import EditorComponent from "../../components/input/lumen/EditorComponent";
import { client } from "../..";
import { uploadAllMedia } from "../../components/input/lumen/utils/uploadFile";

function EditPost() {
    const params = useParams();

    const { post, loading, error } = useFindPost(params.itemId as string);

    const [editPost] = useEditPostMutation();

    const { me } = useMeData();

    type EditorComponentHandle = {
            clearEditor: () => void;
        };
    const editorRef = useRef<EditorComponentHandle>(null);

    const folder =
        process.env.NODE_ENV === "development" ? "local-media" : "media";

    const { addToast } = useToasts();

    const navigate = useNavigate();

    const [mediaUploadStatusArray, setMediaUploadStatusArray] = useState<
        ProgressStatus[]
    >([]);

    return (
        <>
            <Head
                title="Edit your post | Zenith"
                description="In this page, you can edit your post on Zenith. Change the content, media, and more."
            />
            <LumenModalContainer>
                {loading ? (
                    <ModalLoading />
                ) : (
                    <>
                        {error ? (
                            <ErrorOrItemNotFound
                                isError={true}
                                title={ERROR_SOMETHING_WENT_WRONG.title}
                                content={ERROR_SOMETHING_WENT_WRONG.message}
                            />
                        ) : (
                            <LumenInputContainer>
                                <Formik
                                    initialValues={{
                                        type: post ? post.type : "",
                                        content: post ? post.content : "",
                                        media:
                                            post && post.media
                                                ? (post.media.map((item) => ({
                                                      id: item.id,
                                                      type: item.type,
                                                      alt: item.alt,
                                                      src: item.src,
                                                      status: "uploaded",
                                                  })) as FileWrapper[])
                                                : [],
                                    }}
                                    onSubmit={async (
                                        values,
                                        { setErrors }
                                    ) => {
                                        if (!post) {
                                            addToast("Post not found.");
                                            setMediaUploadStatusArray([]);
                                            return;
                                        }

                                        let postMediaDirectory = "";
                                        let media = [...values.media];
                                        const filteredMedia = media.filter(item => item.status === "uploading");

                                        if (filteredMedia.length > 0 && me) {
                                            postMediaDirectory = `${folder}/${new Date().getTime()}-${me.id}`;
                                            media = await uploadAllMedia(media, postMediaDirectory, setMediaUploadStatusArray, addToast);
                                        }

                                        const response = await editPost({
                                            variables: {
                                                postId: post.itemId,
                                                type: post.type,
                                                content: values.content,
                                                media: JSON.stringify(
                                                    media
                                                ),
                                            },
                                        });

                                        if (response.data) {
                                            if (
                                                response.data.editPost
                                                    .errors &&
                                                response.data.editPost
                                                    .errors.length > 0
                                            ) {
                                                setErrors(
                                                    toErrorMap(
                                                        response.data
                                                            .editPost.errors
                                                    )
                                                );

                                                
                                            } else if (
                                                response.data.editPost.ok &&
                                                response.data.editPost.post
                                            ) {
                                                if (editorRef.current) {
                                                    editorRef.current.clearEditor();
                                                }

                                                client.cache.writeQuery<FindPostQuery>(
                                                    {
                                                        query: FindPostDocument,
                                                        data: {
                                                            findPost:
                                                                response
                                                                    .data
                                                                    .editPost
                                                                    .post,
                                                        },
                                                        variables: {
                                                            postId: post.itemId,
                                                        },
                                                    }
                                                );

                                                addToast(
                                                    `Your ${
                                                        post.type ===
                                                        POST_TYPES.COMMENT
                                                            ? POST_TYPES.COMMENT
                                                            : POST_TYPES.POST
                                                    } has been edited successfully.`
                                                );

                                                if (
                                                    window.history.length >
                                                    2
                                                ) {
                                                    navigate(-1);
                                                } else {
                                                    navigate("/");
                                                }
                                            } else {
                                                addToast(
                                                    response.data.editPost
                                                        .status as string
                                                );
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
                                                    placeholder={"Edit your post"}
                                                    buttonText={"Edit post"}
                                                    progress={mediaUploadStatusArray}
                                                />
                                            </EditorFieldContainer>
                                        </Form>
                                    )}
                                </Formik>
                            </LumenInputContainer>
                        )}
                    </>
                )}
            </LumenModalContainer>
        </>
    );
}

export default EditPost;
