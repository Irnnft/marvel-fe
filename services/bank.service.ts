import apiClient from '@/lib/axios';
import { Bank, BankFormData, ApiResponse } from '@/types';
import { AxiosResponse } from 'axios';

export const bankService = {
    getAll(): Promise<AxiosResponse<ApiResponse<Bank[]>>> {
        return apiClient.get('/api/bank');
    },
    
    getByKode(kode_bank: string): Promise<AxiosResponse<ApiResponse<Bank>>> {
        return apiClient.get(`/api/bank/${kode_bank}`);
    },
    
    create(data: BankFormData): Promise<AxiosResponse<ApiResponse<Bank>>> {
        return apiClient.post('/api/bank', data);
    },
    
    update(kode_bank: string, data: Partial<BankFormData>): Promise<AxiosResponse<ApiResponse<Bank>>> {
        return apiClient.put(`/api/bank/${kode_bank}`, data);
    },
    
    delete(kode_bank: string): Promise<AxiosResponse<ApiResponse<null>>> {
        return apiClient.delete(`/api/bank/${kode_bank}`);
    }
};
