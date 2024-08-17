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

        // Encrypt data before storing it in a cookie
        const encryptedData = encrypt(JSON.stringify(response.data));
        cookies().set("session", encryptedData);

        console.log('Login successful:', response.data);

        return response.data
        
    } catch (error: any) {
        console.error('Login failed:', error.response.data);
        // Return the error message
        return error.response.data;
    }
}
