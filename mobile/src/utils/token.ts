import * as SecureStore from "expo-secure-store";

const token = "token";

export async function getItem(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
}

export async function setItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
}

export const getToken = async () => await getItem(token);
export const setToken = (value: string) => setItem(token, value);