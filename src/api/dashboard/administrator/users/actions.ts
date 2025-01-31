import { axiosInstance } from "@/lib/axios";
import { getSessionData } from "@/lib/session";

export async function getInternalUsers(page: number = 1) {
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

        // Kirim permintaan dengan header Authorization dan pagination
        const response = await axiosInstance.get(`/administrator/?page=${page}`, config);

        return response;
        
    } catch (error: any) {
        console.error('Fetching data failed:', error);
        // Return the error message
        return error;
    }
}

export async function getInternalUserById(id: number) {
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

        // Kirim permintaan dengan header Authorization dan pagination
        const response = await axiosInstance.get(`/administrator/${id}/`, config);

        return response;
        
    } catch (error: any) {
        console.error('Fetching data failed:', error);
        // Return the error message
        return error;
    }
}

export async function createInternalUser(data: any) {
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

        // Kirim permintaan dengan header Authorization dan pagination
        const response = await axiosInstance.post(`/administrator/`, data, config);

        return response;
        
    } catch (error: any) {
        console.error('Fetching data failed:', error);
        // Return the error message 
        return error;
    }
}


export async function updateInternalUser(id: number, data: any) {
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

        // Kirim permintaan dengan header Authorization dan pagination
        const response = await axiosInstance.patch(`/administrator/${id}/`, data, config);

        return response;
        
    } catch (error: any) {
        console.error('Fetching data failed:', error);
        // Return the error message
        return error;
    }
}

export async function deleteInternalUser(id: number) {
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

        // Kirim permintaan dengan header Authorization dan pagination
        const response = await axiosInstance.delete(`/administrator/${id}/`, config);

        return response;
        
    } catch (error: any) {
        console.error('Fetching data failed:', error);
        // Return the error message
        return error;
    }
}

export async function getResellers(page: number = 1) {
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
                // Authorization: `Bearer ${token}`,
            },
        };

        // Kirim permintaan dengan header Authorization dan pagination
        const response = await axiosInstance.get(`/reseller/?page=${page}`, config);

        return response;
        
    } catch (error: any) {
        console.error('Fetching data failed:', error);
        // Return the error message
        return error;
    }
}