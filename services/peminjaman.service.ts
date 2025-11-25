import apiClient from '@/lib/axios';
import { Peminjaman, PeminjamanFormData, PeminjamanUpdateStatus, ApiResponse } from '@/types';
import { AxiosResponse } from 'axios';

export const peminjamanService = {
    // User routes
    getMyLoans(): Promise<AxiosResponse<ApiResponse<Peminjaman[]>>> {
        return apiClient.get('/api/peminjaman/my');
    },
    
    getById(id: number): Promise<AxiosResponse<ApiResponse<Peminjaman>>> {
        return apiClient.get(`/api/peminjaman/${id}`);
    },
    
    create(data: PeminjamanFormData): Promise<AxiosResponse<ApiResponse<Peminjaman>>> {
        return apiClient.post('/api/peminjaman', data);
    },
    
    // Admin routes
    getAll(): Promise<AxiosResponse<ApiResponse<Peminjaman[]>>> {
        return apiClient.get('/api/peminjaman');
    },
    
    approve(id: number): Promise<AxiosResponse<ApiResponse<Peminjaman>>> {
        return apiClient.put(`/api/peminjaman/${id}/approve`);
    },
    
    reject(id: number): Promise<AxiosResponse<ApiResponse<Peminjaman>>> {
        return apiClient.put(`/api/peminjaman/${id}/reject`);
    },
    
    updateStatus(id: number, data: PeminjamanUpdateStatus): Promise<AxiosResponse<ApiResponse<Peminjaman>>> {
        return apiClient.put(`/api/peminjaman/${id}/status`, data);
    }
};
