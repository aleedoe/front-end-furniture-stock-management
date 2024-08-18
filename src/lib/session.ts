"use server";

import { cookies } from "next/headers";
import { decrypt } from "./data-encript";

export async function getSessionData() {
    const encryptedData = cookies().get("session");
    if (encryptedData) {
        const decryptedData = decrypt(encryptedData.value);
        return JSON.parse(decryptedData);
    }
    return null;
}
