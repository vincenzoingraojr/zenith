export interface InputProps {
    errors?: any;
    field: any;
}

export type ProgressStatus = {
    id: number;
    progress: number;
}

export type FileWrapper = {
    id: number;
    file?: File;
    type: string;
    alt: string;
    src?: string;
    status: "uploading" | "uploaded" | "to_be_deleted";
}