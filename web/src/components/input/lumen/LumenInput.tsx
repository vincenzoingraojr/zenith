import { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { Form, Formik } from "formik";
import EditorField from "./EditorField";
import { useMeData } from "../../../utils/useMeData";
import axios from "axios";
import { useToasts } from "../../utils/ToastProvider";

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
    const [mediaUploadStatus, setMediaUploadStatus] = useState<number | null>(
        null
    );

    const folder = process.env.NODE_ENV === "development" ? "local-media" : "media";

    const { me } = useMeData();

    const [counter, setCounter] = useState<number>(0);

    const { addToast } = useToasts();

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
                    const media: (File | string)[][] = values.media;

                    if (media.length > 0 && me) {
                        postMediaDirectory = `${folder}/${new Date().getTime()}-${me.id}`;

                        setMediaUploadStatus(0);

                        for (const item of media) {
                            setCounter(counter + 1);

                            const file = item[0] as File;
                            const alt = item[1] as string;

                            const postMediaKey = `${postMediaDirectory}/item-${counter}.${file.name.split(".").pop()}`;

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
                                    setMediaUploadStatus(progress);
                                },
                                headers: {
                                    "Content-Type": file.type,
                                },
                            };

                            await axios
                                .put(postMediaUrl, file, postMediaConfig)
                                .then(() => {
                                    mediaArray.push({
                                        src: `https://img-sq.s3.us-east-1.amazonaws.com/${postMediaKey}`,
                                        alt: alt as string,
                                        type: file.type,
                                    });
                                })
                                .catch((error) => {
                                    addToast(`An error occurred while uploading the media item (${counter}). Error code: ${error.code}.`);
                                });
                        }
                    }
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
                            progress={mediaUploadStatus}
                        />
                    </Form>
                )}
            </Formik>
        </LumenInputContainer>
    );
}

export default LumenInput;