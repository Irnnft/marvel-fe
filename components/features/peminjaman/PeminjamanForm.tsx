'use client';

import { useState } from 'react';
import { PeminjamanFormData } from '@/types';
import { Loader2, AlertCircle, Calendar, Wallet } from 'lucide-react';

interface PeminjamanFormProps {
  onSubmit: (data: PeminjamanFormData) => Promise<void>;
  loading: boolean;
  error: string;
  onCancel: () => void;
}

export default function PeminjamanForm({ onSubmit, loading, error, onCancel }: PeminjamanFormProps) {
  const [nominal, setNominal] = useState('');
  const [rentang, setRentang] = useState('1 Bulan');

  // Format Rupiah saat mengetik
  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value) {
      setNominal(parseInt(value).toLocaleString('id-ID'));
    } else {
      setNominal('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hapus titik sebelum kirim ke API
    const cleanNominal = nominal.replace(/\./g, '');
    onSubmit({
      nominal: cleanNominal,
      rentang: rentang as any,
    });
  };

  // Reusable Class biar rapi
  const labelClass = "block text-sm font-medium text-slate-300 mb-2 ml-1";
  const inputClass = "w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2 animate-pulse">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Input Nominal */}
      <div>
        <label className={labelClass}>
            Nominal Pinjaman <span className="text-red-400">*</span>
        </label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                <span className="font-bold text-sm">Rp</span>
            </div>
            <input
                type="text"
                value={nominal}
                onChange={handleNominalChange}
                className={`${inputClass} pl-12`}
                placeholder="0"
                required
                disabled={loading}
            />
        </div>
        <p className="text-xs text-slate-500 mt-1.5 ml-1">
            Min: Rp 1.000.000 | Max: Rp 50.000.000
        </p>
      </div>

      {/* Input Jangka Waktu */}
      <div>
        <label className={labelClass}>
            Jangka Waktu <span className="text-red-400">*</span>
        </label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                <Calendar size={18} />
            </div>
            {/* Pakai bg solid untuk select option biar ga bug di browser */}
            <select
                value={rentang}
                onChange={(e) => setRentang(e.target.value)}
                className={`${inputClass} pl-12 appearance-none bg-[#0B0F19]`} 
                disabled={loading}
            >
                <option value="1 Bulan">1 Bulan</option>
                <option value="3 Bulan">3 Bulan</option>
                <option value="6 Bulan">6 Bulan</option>
                <option value="12 Bulan">12 Bulan</option>
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                ▼
            </div>
        </div>
      </div>

      {/* Info Box Kecil */}
      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex gap-3 items-start">
        <Wallet className="text-indigo-400 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-indigo-200 leading-relaxed">
            <span className="font-bold">Perhatian:</span> Pengajuan pinjaman akan diproses oleh admin dalam 1-3 hari kerja. Pastikan data diri Anda sudah lengkap.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="w-full py-3.5 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 hover:text-white transition-all"
        >
            Batal
        </button>
        
        <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
            {loading ? (
                <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Memproses...</span>
                </>
            ) : (
                "Ajukan Pinjaman"
            )}
        </button>
      </div>

    </form>
  );
}