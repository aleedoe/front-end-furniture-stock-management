import { axiosInstance } from "@/lib/axios";
import { NextRouter } from 'next/router';

export async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    router: NextRouter
) {
    event.preventDefault();

    try {
        const response = await axiosInstance.post('/admin-login/', {
            username,
            password,
        });

        // Assuming the token or user data is returned on successful login
        console.log('Login successful:', response.data);
        // Redirect to another page, e.g., dashboard
        router.push('/workspace/administrator');
    } catch (error) {
        console.error('Login failed:', error);
        setError('Login failed. Please check your credentials and try again.');
    }
}
