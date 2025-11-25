import apiClient from '@/lib/axios';
import { Peminjaman, PeminjamanFormData, PeminjamanUpdateStatus, ApiResponse } from '@/types';
import { AxiosResponse } from 'axios';

interface PayRequest {
  nominal: string;
  metode?: string;
  keterangan?: string;
}

interface PaymentSummary {
  total_pinjam: number;
  total_bayar: number;
  sisa: number;
}

export interface Payment {
  id: number;
  peminjaman_id: number;
  user_id: number;
  nominal: string;
  metode?: string;
  keterangan?: string;
  tanggal_bayar: string;
  created_at: string;
  updated_at: string;
}

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
  },

  // ✅ Tambahan: pembayaran
  pay(id: number, data: PayRequest): Promise<AxiosResponse<{
    message: string;
    loan: Peminjaman;
    payment: Payment;
    summary: PaymentSummary;
  }>> {
    return apiClient.post(`/api/peminjaman/${id}/bayar`, data);
  },

  getPayments(id: number): Promise<AxiosResponse<{
    loan: Peminjaman;
    payments: Payment[];
    summary: PaymentSummary;
  }>> {
    return apiClient.get(`/api/peminjaman/${id}/pembayaran`);
  }
};
