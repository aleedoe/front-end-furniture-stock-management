"use server";

import { axiosInstance } from "@/lib/axios";
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
        

        cookies().set("session", JSON.stringify(response.data));
        // Assuming the token or user data is returned on successful login
        console.log('Login successful:', response.data);
        // router.push('/workspace/administrator');
    } catch (error) {
        console.error('Login failed:', error);
    }
}
