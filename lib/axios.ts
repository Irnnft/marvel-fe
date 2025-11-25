import axios, { AxiosInstance, AxiosError } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// ✅ Request interceptor - Add Bearer token
apiClient.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Response interceptor
apiClient.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        console.error('API Error:', error.response?.status, error.message);
        
        // ✅ Clear token on 401
        if (error.response?.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('auth_token');
            }
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;
