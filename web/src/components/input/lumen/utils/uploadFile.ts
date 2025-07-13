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

export const uploadAllMedia = async (media: FileWrapper[], postMediaDirectory: string, setMediaUploadStatusArray: any) => {
    const updatedMedia = [...media];
    
    for (const item of updatedMedia) {
        if (item.status === "uploading") {
            const updatedItem = await uploadMedia(item, postMediaDirectory, setMediaUploadStatusArray);
            const index = updatedMedia.findIndex(m => m.id === item.id);
            if (index !== -1) {
                updatedMedia[index] = updatedItem;
            }
        }
    }

    return updatedMedia;
};

export const uploadMedia = async (item: FileWrapper, postMediaDirectory: string, setMediaUploadStatusArray: any): Promise<FileWrapper> => {
    const file = item.file as File;
    const postMediaKey = `${postMediaDirectory}/item-${item.id}.${file.name.split('.').pop()}`;
    setMediaUploadStatusArray((prev: any) =>
        prev.map((status: any) => status.id === item.id ? { ...status, progress: 0, status: "ok" } : status)
    );

    try {
        const { url } = await getPresignedUrl(file, postMediaKey);
        await uploadFile(url, file, (progress) => updateProgress(item.id, setMediaUploadStatusArray, progress));

        const mediaType = file.type.includes("image") ? "img" : "vid";
        const newSrc = `https://${mediaType}.zncdn.net/${postMediaKey}`;

        return { ...item, file: undefined, src: newSrc, status: "to_be_saved" };
    } catch (error: any) {
        markUploadError(item.id, setMediaUploadStatusArray);
        console.log("Error uploading media:", error);

        return item;
    }
}