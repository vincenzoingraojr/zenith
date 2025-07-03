import axios from "axios";
import { FileWrapper } from "../../commons";
import { getPresignedUrl } from "./getPresignedUrl";
import { markUploadError, updateProgress } from "./manageProgress";

export const uploadFile = async (url: string, file: File, onProgress: (progress: number) => void) => {
    await axios.put(url, file, {
        onUploadProgress: (e) => {
            if (e.total) {
                onProgress(Math.round((e.loaded * 100) / e.total));
            }
        },
        headers: { "Content-Type": file.type, "Access-Control-Allow-Origin": "*" },
    });
};

export const uploadAllMedia = async (media: FileWrapper[], postMediaDirectory: string, setMediaUploadStatusArray: any, addToast: any) => {
    const updatedMedia = [...media];

    for (const item of media.filter(m => m.status === "uploading")) {
        const file = item.file as File;
        const postMediaKey = `${postMediaDirectory}/item-${item.id}.${file.name.split('.').pop()}`;

        try {
            const { url } = await getPresignedUrl(file, postMediaKey);
            await uploadFile(url, file, (progress) => updateProgress(item.id, setMediaUploadStatusArray, progress));

            const mediaType = file.type.includes("image") ? "img" : "vid";
            const newSrc = `https://${mediaType}.zncdn.net/${postMediaKey}`;

            const index = updatedMedia.findIndex(m => m.id === item.id);
            updatedMedia[index] = { ...updatedMedia[index], file: undefined, src: newSrc };
        } catch (error: any) {
            addToast(`An error occurred while uploading the media item (${item.id}). Error code: ${error.code}.`);
            markUploadError(item.id, setMediaUploadStatusArray);
        }
    }

    return updatedMedia;
};