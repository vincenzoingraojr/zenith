import { DeleteObjectCommand, PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const storageConfig: S3ClientConfig = {
    credentials: {
        accessKeyId: process.env.STORAGE_KEY_ID!,
        secretAccessKey: process.env.STORAGE_SECRET_KEY!,
    },
    region: "us-east-1",
};

const storageHelper = new S3Client(storageConfig);

export async function getPresignedUrlForPutCommand(key: string) {
    const command = new PutObjectCommand({ Bucket: process.env.STORAGE_BUCKET_NAME, Key: key });
    const url = await getSignedUrl(storageHelper, command, { expiresIn: 3600 });

    return url;
}

export async function getPresignedUrlForDeleteCommand(key: string) {
    const command = new DeleteObjectCommand({ Bucket: process.env.STORAGE_BUCKET_NAME, Key: key });
    const url = await getSignedUrl(storageHelper, command, { expiresIn: 3600 });

    return url;
}