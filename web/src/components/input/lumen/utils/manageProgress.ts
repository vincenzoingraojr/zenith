import { ProgressStatus } from "../../commons";

export const updateProgress = (id: number, setMediaUploadStatusArray: any, progress: number) => {
    setMediaUploadStatusArray((prev: ProgressStatus[]) =>
        prev.some(status => status.id === id)
            ? prev.map(status => status.id === id ? { ...status, progress } : status)
            : [...prev, { id, progress, status: "ok" }]
    );
};

export const markUploadError = (id: number, setMediaUploadStatusArray: any) => {
    setMediaUploadStatusArray((prev: ProgressStatus[]) =>
        prev.map(status => status.id === id ? { ...status, progress: 0, status: "error" } : status)
    );
};

export const checkForDeletedFiles = (media: any[], setMediaUploadStatusArray: any) => {
    setMediaUploadStatusArray((prev: ProgressStatus[]) =>
        prev.filter(status => media.some(item => item.id === status.id))
    );
}