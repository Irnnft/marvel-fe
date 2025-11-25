import apiClient from '@/lib/axios';
import { User, LoginCredentials, RegisterData, LoginResponse, ApiResponse } from '@/types';
import { AxiosResponse } from 'axios';

export const authService = {
    async register(data: RegisterData): Promise<AxiosResponse<LoginResponse>> {
        const response = await apiClient.post('/api/register', data);
        
        // ✅ Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
        }
        
        return response;
    },

    async login(credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> {
        const response = await apiClient.post('/api/login', credentials);
        
        // ✅ Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
        }
        
        return response;
    },

    async logout(): Promise<AxiosResponse<ApiResponse<null>>> {
        const response = await apiClient.post('/api/logout');
        
        // ✅ Remove token from localStorage
        localStorage.removeItem('auth_token');
        
        return response;
    },

    async getUser(): Promise<AxiosResponse<User>> {
        return apiClient.get('/api/user');
    },

    getToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('auth_token');
        }
        return null;
    }
};
