const regex = new RegExp(/^\s+\S*/);

export function isValidUserInput(input: string): boolean {
    return !regex.test(input) && input.trim() !== "";
}