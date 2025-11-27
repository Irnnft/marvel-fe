'use client';

import { Payment } from '@/services/peminjaman.service';
import { Calendar, CreditCard, FileText, AlertCircle } from 'lucide-react';

interface PaymentHistoryProps {
  payments: Payment[];
  loading?: boolean;
}

export default function PaymentHistory({ payments, loading = false }: PaymentHistoryProps) {
  
  // --- 1. LOADING STATE (Dark Skeleton) ---
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 animate-pulse">
            <div className="flex justify-between mb-2">
                <div className="h-4 bg-white/10 rounded w-1/3"></div>
                <div className="h-3 bg-white/10 rounded w-1/4"></div>
            </div>
            <div className="h-3 bg-white/10 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  // --- 2. EMPTY STATE ---
  if (!payments || payments.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
        <div className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle size={18} className="text-slate-500" />
        </div>
        <p className="text-sm text-slate-500">Belum ada riwayat pembayaran.</p>
      </div>
    );
  }

  // --- 3. LIST HISTORY (Dark Mode) ---
  return (
    <div className="space-y-3">
      {payments.map((payment, index) => (
        <div
          key={payment.id || index}
          className="group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 rounded-xl px-4 py-3 transition-all"
        >
          {/* Bagian Kiri: Nominal & Metode */}
          <div>
            <div className="font-bold text-emerald-400 text-lg flex items-center gap-2">
                <span className="text-xs text-emerald-500/50 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">Masuk</span>
                Rp {parseInt(payment.nominal, 10).toLocaleString('id-ID')}
            </div>
            
            <div className="flex flex-wrap gap-3 mt-1">
                {payment.metode && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <CreditCard size={12} />
                        {payment.metode}
                    </div>
                )}
                {payment.keterangan && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 italic">
                        <FileText size={12} />
                        {payment.keterangan}
                    </div>
                )}
            </div>
          </div>

          {/* Bagian Kanan: Tanggal */}
          <div className="text-xs text-slate-500 flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-lg">
            <Calendar size={12} />
            {payment.tanggal_bayar
              ? new Date(payment.tanggal_bayar).toLocaleString('id-ID', {
                  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })
              : '-'}
          </div>
        </div>
      ))}
    </div>
  );
}