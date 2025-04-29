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
    file: File;
    alt: string;
}