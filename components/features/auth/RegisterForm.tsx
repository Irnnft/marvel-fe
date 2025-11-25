'use client';
import { useState } from 'react';
import { RegisterData, Bank } from '@/types';
import {
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
    validatePhone,
    validateNIK,
    validateUsername
} from '@/lib/validation';

interface RegisterFormProps {
    banks: Bank[];
    onSubmit: (data: RegisterData) => Promise<void>;
    loading?: boolean;
    error?: string;
}

export default function RegisterForm({ banks, onSubmit, loading = false, error }: RegisterFormProps) {
    const [formData, setFormData] = useState<RegisterData>({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        no_hp: '',
        no_hp2: '',
        nama_no_hp2: '',
        relasi_no_hp2: '',
        NIK: '',
        Norek: '',
        Nama_Ibu: '',
        Pekerjaan: '',
        Gaji: '',
        alamat: '',
        kode_bank: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'email':
                return validateEmail(value) || '';
            case 'password':
                return validatePassword(value) || '';
            case 'password_confirmation':
                return validatePasswordConfirmation(formData.password, value) || '';
            case 'username':
                return validateUsername(value) || '';
            case 'no_hp':
            case 'no_hp2':
                return validatePhone(value) || '';
            case 'NIK':
                return validateNIK(value) || '';
            case 'name':
                return !value ? 'Nama wajib diisi' : '';
            case 'Norek':
                return !value || value.length < 5 ? 'Nomor rekening minimal 5 digit' : '';
            default:
                return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) {
            setErrors({ ...errors, [name]: error });
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key as keyof RegisterData]);
            if (error) newErrors[key] = error;
        });

        if (!formData.kode_bank) newErrors.kode_bank = 'Bank wajib dipilih';
        if (!formData.nama_no_hp2) newErrors.nama_no_hp2 = 'Nama kontak darurat wajib diisi';
        if (!formData.relasi_no_hp2) newErrors.relasi_no_hp2 = 'Relasi wajib diisi';
        if (!formData.Nama_Ibu) newErrors.Nama_Ibu = 'Nama ibu kandung wajib diisi';
        if (!formData.Pekerjaan) newErrors.Pekerjaan = 'Pekerjaan wajib diisi';
        if (!formData.Gaji) newErrors.Gaji = 'Gaji wajib diisi';
        if (!formData.alamat) newErrors.alamat = 'Alamat wajib diisi';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Identitas Dasar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Username <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.username ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-md ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={loading}
                    required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    <p className="text-xs text-gray-500 mt-1">Min 8 karakter, huruf besar, kecil, dan angka</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Konfirmasi Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>
                    )}
                </div>
            </div>

            {/* Data Pinjol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        No HP <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="no_hp"
                        value={formData.no_hp}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={12}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.no_hp ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.no_hp && <p className="text-red-500 text-xs mt-1">{errors.no_hp}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        NIK (16 digit) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="NIK"
                        value={formData.NIK}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={16}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.NIK ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.NIK && <p className="text-red-500 text-xs mt-1">{errors.NIK}</p>}
                </div>
            </div>

            {/* Kontak Darurat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        No HP Darurat <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="no_hp2"
                        value={formData.no_hp2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={12}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.no_hp2 ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.no_hp2 && <p className="text-red-500 text-xs mt-1">{errors.no_hp2}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nama Pemilik No HP Darurat <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="nama_no_hp2"
                        value={formData.nama_no_hp2}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.nama_no_hp2 ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.nama_no_hp2 && <p className="text-red-500 text-xs mt-1">{errors.nama_no_hp2}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Relasi dengan Kontak Darurat <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="relasi_no_hp2"
                    value={formData.relasi_no_hp2}
                    onChange={handleChange}
                    placeholder="Contoh: Keluarga, Teman"
                    className={`w-full px-3 py-2 border rounded-md ${
                        errors.relasi_no_hp2 ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={loading}
                    required
                />
                {errors.relasi_no_hp2 && <p className="text-red-500 text-xs mt-1">{errors.relasi_no_hp2}</p>}
            </div>

            {/* Data Tambahan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nama Ibu Kandung <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="Nama_Ibu"
                        value={formData.Nama_Ibu}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.Nama_Ibu ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.Nama_Ibu && <p className="text-red-500 text-xs mt-1">{errors.Nama_Ibu}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Pekerjaan <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="Pekerjaan"
                        value={formData.Pekerjaan}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.Pekerjaan ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.Pekerjaan && <p className="text-red-500 text-xs mt-1">{errors.Pekerjaan}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Gaji per Bulan <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="Gaji"
                    value={formData.Gaji}
                    onChange={handleChange}
                    maxLength={16}
                    placeholder="Contoh: 5000000"
                    className={`w-full px-3 py-2 border rounded-md ${
                        errors.Gaji ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={loading}
                    required
                />
                {errors.Gaji && <p className="text-red-500 text-xs mt-1">{errors.Gaji}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md ${
                        errors.alamat ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={loading}
                    required
                />
                {errors.alamat && <p className="text-red-500 text-xs mt-1">{errors.alamat}</p>}
            </div>

            {/* Bank Info - ✅ FIXED WITH SAFETY CHECK */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Pilih Bank <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="kode_bank"
                        value={formData.kode_bank}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.kode_bank ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading || !banks || banks.length === 0}
                        required
                    >
                        <option value="">-- Pilih Bank --</option>
                        {banks && Array.isArray(banks) && banks.length > 0 ? (
                            banks.map(bank => (
                                <option key={bank.kode_bank} value={bank.kode_bank}>
                                    {bank.nama_bank}
                                </option>
                            ))
                        ) : (
                            <option disabled>Loading banks...</option>
                        )}
                    </select>
                    {errors.kode_bank && <p className="text-red-500 text-xs mt-1">{errors.kode_bank}</p>}
                    {(!banks || banks.length === 0) && (
                        <p className="text-yellow-600 text-xs mt-1">Sedang memuat data bank...</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nomor Rekening <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="Norek"
                        value={formData.Norek}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        maxLength={20}
                        className={`w-full px-3 py-2 border rounded-md ${
                            errors.Norek ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                    {errors.Norek && <p className="text-red-500 text-xs mt-1">{errors.Norek}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={loading || !banks || banks.length === 0}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Loading...' : 'Daftar'}
            </button>
        </form>
    );
}
