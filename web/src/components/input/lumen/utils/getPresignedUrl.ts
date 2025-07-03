export const getPresignedUrl = async (file: File, key: string) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/presigned-url`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ type: "put", key, itemType: file.type }),
    });
    return res.json();
};