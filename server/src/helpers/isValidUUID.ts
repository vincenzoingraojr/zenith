import { isUUID } from "class-validator";

export function isValidUUID(s: string): boolean {
    return isUUID(s);
}