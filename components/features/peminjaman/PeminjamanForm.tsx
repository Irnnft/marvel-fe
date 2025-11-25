'use client';
import { useState } from 'react';
import { PeminjamanFormData } from '@/types';

interface PeminjamanFormProps {
    onSubmit: (data: PeminjamanFormData) => Promise<void>;
    loading?: boolean;
    error?: string;
    onCancel?: () => void;
}

export default function PeminjamanForm({ onSubmit, loading = false, error, onCancel }: PeminjamanFormProps) {
    const [formData, setFormData] = useState<PeminjamanFormData>({
        nominal: '',
        rentang: '3 Bulan'
    });
    const [errors, setErrors] = useState({ nominal: '' });

    const validateForm = (): boolean => {
        const newErrors = { nominal: '' };
        
        if (!formData.nominal) {
            newErrors.nominal = 'Nominal wajib diisi';
        } else if (parseInt(formData.nominal) < 1000000) {
            newErrors.nominal = 'Nominal minimal Rp 1.000.000';
        } else if (parseInt(formData.nominal) > 50000000) {
            newErrors.nominal = 'Nominal maksimal Rp 50.000.000';
        }

        setErrors(newErrors);
        return !newErrors.nominal;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        await onSubmit(formData);
    };

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return number;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium mb-1">
                    Nominal Pinjaman <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">Rp</span>
                    <input
                        type="text"
                        value={formData.nominal ? parseInt(formData.nominal).toLocaleString('id-ID') : ''}
                        onChange={(e) => {
                            const value = formatCurrency(e.target.value);
                            setFormData({ ...formData, nominal: value });
                            setErrors({ ...errors, nominal: '' });
                        }}
                        placeholder="5.000.000"
                        maxLength={16}
                        className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                            errors.nominal ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={loading}
                        required
                    />
                </div>
                {errors.nominal && <p className="text-red-500 text-xs mt-1">{errors.nominal}</p>}
                <p className="text-xs text-gray-500 mt-1">Min: Rp 1.000.000 | Max: Rp 50.000.000</p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">
                    Jangka Waktu <span className="text-red-500">*</span>
                </label>
                <select
                    value={formData.rentang}
                    onChange={(e) => setFormData({ ...formData, rentang: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={loading}
                    required
                >
                    <option value="3 Bulan">3 Bulan</option>
                    <option value="6 Bulan">6 Bulan</option>
                    <option value="12 Bulan">12 Bulan</option>
                </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded">
                <p className="text-sm text-blue-800">
                    <strong>Perhatian:</strong> Pengajuan pinjaman akan diproses oleh admin dalam 1-3 hari kerja.
                </p>
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Ajukan Pinjaman'}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Batal
                    </button>
                )}
            </div>
        </form>
    );
}
