"use server";

import { axiosInstance } from "@/lib/axios";
import { decrypt } from "@/lib/crypto-data";
import { getSessionData } from "@/lib/session";

export async function getAdministrators() {
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
                Authorization: `Bearer ${token}`,
            },
        };

        // Kirim permintaan dengan header Authorization
        const response = await axiosInstance.post('/administrator/', {}, config);

        // Dekripsi data sebelum mengembalikannya (jika diperlukan)
        const decryptedData = decrypt(JSON.stringify(response.data));
        console.log('data administrator: ', decryptedData);

        return decryptedData;
        
    } catch (error: any) {
        console.error('Login failed:', error.response.data);
        // Return the error message
        return error.response.data;
    }
}
