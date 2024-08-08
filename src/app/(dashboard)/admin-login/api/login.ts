import { axiosInstance } from "@/lib/axios";
import Cookies from 'js-cookie'

// Use client-side cookies management, such as js-cookie

export async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    router: any
) {
    event.preventDefault();

    try {
        const response = await axiosInstance.post('/login', {
            username,
            password,
        });

        // Assuming the token or user data is returned on successful login
        Cookies.set("data", JSON.stringify(response.data), { expires: 1 }); // Store in cookies for 1 day
        console.log('Login successful:', response.data);
        // Redirect to another page, e.g., dashboard
        router.push('/workspace/administrator');
    } catch (error) {
        console.error('Login failed:', error);
        setError('Login failed. Please check your credentials and try again.');
    }
}
