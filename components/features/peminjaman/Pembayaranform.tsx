'use client';

import { useState } from 'react';
import { Loader2, AlertCircle, Banknote, CreditCard, FileText } from 'lucide-react';

interface PembayaranFormProps {
  sisa: number;
  loading: boolean;
  error: string;
  onSubmit: (data: { nominal: string; metode?: string; keterangan?: string }) => Promise<void>;
}

export default function PembayaranForm({ sisa, loading, error, onSubmit }: PembayaranFormProps) {
  const [nominal, setNominal] = useState('');
  const [metode, setMetode] = useState('');
  const [keterangan, setKeterangan] = useState('');

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
    const cleanNominal = nominal.replace(/\./g, '');
    onSubmit({
      nominal: cleanNominal,
      metode,
      keterangan
    });
  };

  // Styling Gelap & Transparan
  const labelClass = "block text-sm font-medium text-slate-300 mb-2 ml-1";
  const inputClass = "w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Info Sisa Hutang (Highlight Box) */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-6 flex flex-col items-center text-center">
            <p className="text-xs text-indigo-300 uppercase tracking-wide mb-1">Sisa Kewajiban Anda</p>
            <p className="text-2xl font-bold text-white">Rp {sisa.toLocaleString('id-ID')}</p>
        </div>

        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2 text-sm animate-pulse">
                <AlertCircle size={16} />
                {error}
            </div>
        )}

        {/* Input Nominal */}
        <div>
            <label className={labelClass}>Nominal Pembayaran <span className="text-red-400">*</span></label>
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
                    disabled={loading}
                    required
                />
            </div>
        </div>

        {/* Input Metode */}
        <div>
            <label className={labelClass}>Metode Pembayaran (Opsional)</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <CreditCard size={18} />
                </div>
                <input
                    type="text"
                    value={metode}
                    onChange={(e) => setMetode(e.target.value)}
                    className={`${inputClass} pl-12`}
                    placeholder="Transfer Bank / Cash / E-Wallet"
                    disabled={loading}
                />
            </div>
        </div>

        {/* Input Keterangan */}
        <div>
            <label className={labelClass}>Catatan (Opsional)</label>
            <div className="relative group">
                <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <FileText size={18} />
                </div>
                <textarea
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className={`${inputClass} pl-12 min-h-[100px] resize-none`}
                    placeholder="Tulis catatan tambahan..."
                    disabled={loading}
                />
            </div>
        </div>

        {/* Tombol Bayar */}
        <button
            type="submit"
            disabled={loading || !nominal}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
        >
            {loading ? (
                <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Memproses Pembayaran...</span>
                </>
            ) : (
                <>
                    <Banknote size={20} />
                    <span>Bayar Sekarang</span>
                </>
            )}
        </button>

    </form>
  );
}