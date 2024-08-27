import { axiosInstance } from "@/lib/axios";
import { getSessionData } from "@/lib/session";

export async function getUsers() {
    try {
        // Ambil data sesi menggunakan fungsi getSessionData()
        const sessionData = await getSessionData();

        let token = '';
        if (sessionData) {
            // Ambil token akses dari data sesi
            token = sessionData.tokens.access;
        }

        // Buat konfigurasi dengan Authorization header
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        // Kirim permintaan dengan header Authorization
        const response = await axiosInstance.get('/administrator/', config);

        return response;
        
    } catch (error: any) {
        console.error('Fetching data failed:', error);
        // Return the error message
        return error;
    }
}
