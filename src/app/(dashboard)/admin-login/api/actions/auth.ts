"use server";

import { axiosInstance } from "@/lib/axios";
import { encrypt } from "@/lib/data-encript";
import { cookies } from "next/headers";

export async function handleLogin(
    username: string,
    password: string,
) {

    try {
        const response = await axiosInstance.post('/admin-login/', {
            username,
            password,
        });

        // Enkripsi data sebelum menyimpannya dalam cookie
        const encryptedData = encrypt(JSON.stringify(response.data));
        cookies().set("session", encryptedData);

        console.log('Login successful:', response.data);
        // const res = createSession(response.data);
        // Redirect to another page, e.g., dashboard
        // router.push('/workspace/administrator');
    } catch (error) {
        console.error('Login failed:', error);
    }
}
