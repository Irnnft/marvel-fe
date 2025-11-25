// ========== User Types ==========
export interface User {
    id: number;
    
    // Identitas dasar
    name: string;
    username: string;
    email: string;
    
    // Data sistem pinjol
    no_hp: string;        // max 12 chars
    no_hp2: string;       // max 12 chars
    nama_no_hp2: string;
    relasi_no_hp2: string;
    NIK: string;          // 16 chars
    Norek: string;        // max 20 chars
    Nama_Ibu: string;
    Pekerjaan: string;
    Gaji: string;         // max 16 chars
    alamat: string;
    
    // Relasi bank
    kode_bank: string;
    bank?: Bank;          // optional relation
    
    // Role
    role: 'admin' | 'owner' | 'customer';
    
    // Security
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface RegisterData {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    
    // Data pinjol
    no_hp: string;
    no_hp2: string;
    nama_no_hp2: string;
    relasi_no_hp2: string;
    NIK: string;
    Norek: string;
    Nama_Ibu: string;
    Pekerjaan: string;
    Gaji: string;
    alamat: string;
    
    // Bank
    kode_bank: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}


// ========== Bank Types ==========
export interface Bank {
    kode_bank: string;    // PRIMARY KEY
    nama_bank: string;
    alamat: string;
    kota: string;
    provinsi: string;
    created_at: string;
    updated_at: string;
}

export interface BankFormData {
    kode_bank: string;
    nama_bank: string;
    alamat: string;
    kota: string;
    provinsi: string;
}


// ========== Peminjaman Types ==========
export interface Peminjaman {
    id: number;
    user_id: number;
    
    // Data pinjaman
    nominal: string;      // max 16 chars
    rentang: '3 Bulan' | '6 Bulan' | '12 Bulan';
    Waktu: string;        // timestamp
    status: 'pending' | 'disetujui' | 'ditolak' | 'selesai';
    
    created_at: string;
    updated_at: string;
    
    // Optional relations
    user?: User;
}

export interface PeminjamanFormData {
    nominal: string;
    rentang: '3 Bulan' | '6 Bulan' | '12 Bulan';
}

export interface PeminjamanUpdateStatus {
    status: 'pending' | 'disetujui' | 'ditolak' | 'selesai';
}


// ========== API Response Types ==========
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface LoginResponse {
    user: User;
    token: string;
    message: string;
}

export interface ErrorResponse {
    message: string;
    errors?: Record<string, string[]>;
}
