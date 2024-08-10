import { axiosInstance } from "@/lib/axios";

export async function handleLogin(
    username: string,
    password: string,
) {

    try {
        const response = await axiosInstance.post('/admin-login/', {
            username,
            password,
        });

        // Assuming the token or user data is returned on successful login
        console.log('Login successful:', response.data);
        // Redirect to another page, e.g., dashboard
        // router.push('/workspace/administrator');
    } catch (error) {
        console.error('Login failed:', error);
    }
}
