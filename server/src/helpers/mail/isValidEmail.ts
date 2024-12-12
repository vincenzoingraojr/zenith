import { isEmail } from "class-validator";

export function isValidEmailAddress(email: string): boolean {
    return isEmail(email);
}