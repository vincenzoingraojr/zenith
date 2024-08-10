import * as crypto from "crypto";
import { SecretKey } from "../entities/User";

const algorithm = "aes-256-cbc";
const key = crypto.createHash("sha256").update(String(process.env.SECRET_KEY)).digest("base64").substring(0, 32);

export function encrypt(text: string): SecretKey {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedData: encrypted.toString() };
}

export function decrypt(data: SecretKey) {
    let iv = Buffer.from(data.iv, "hex");
    let encryptedText = Buffer.from(data.encryptedData, "hex");
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}