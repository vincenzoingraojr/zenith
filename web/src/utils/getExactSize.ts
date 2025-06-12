export function getExactSize(size: any) {
    var fSExt = ["Bytes", "KB", "MB", "GB"];
    let i = 0;

    while (size > 900) {
        size /= 1024;
        i++;
    }

    let exactSize = Math.round(size * 100) / 100 + " " + fSExt[i];
    return exactSize;
}
