import { Peminjaman } from '@/types';
import { Calendar, CreditCard, Clock, ChevronRight, AlertCircle } from 'lucide-react';

interface PeminjamanListProps {
  loans: Peminjaman[];
  loading?: boolean;
  emptyMessage?: string;
  onCardClick?: (loan: Peminjaman) => void;
}

export default function PeminjamanList({ 
  loans, 
  loading = false, 
  emptyMessage = "Tidak ada data pinjaman.", 
  onCardClick 
}: PeminjamanListProps) {

  // --- LOADING STATE (SKELETON DARK) ---
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 h-40 animate-pulse">
            <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-white/10 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  // --- EMPTY STATE ---
  if (loans.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 border border-white/5 rounded-[2rem]">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-slate-500" size={32} />
        </div>
        <p className="text-slate-400">{emptyMessage}</p>
      </div>
    );
  }

  // --- LIST DATA ---
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {loans.map((loan) => (
        <div 
          key={loan.id} 
          onClick={() => onCardClick && onCardClick(loan)}
          className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          {/* Hover Glow Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header Card */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                    <CreditCard size={20} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Pinjaman #{loan.id}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(loan.created_at).toLocaleDateString('id-ID')}
                    </p>
                </div>
              </div>
              <StatusBadge status={loan.status} />
            </div>

            {/* Body Card */}
            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                    <span className="text-slate-400">Nominal</span>
                    <span className="text-white font-mono font-bold text-lg">
                        Rp {parseInt(loan.nominal).toLocaleString('id-ID')}
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-1">
                    <span className="text-slate-400 flex items-center gap-2">
                        <Clock size={14} /> Tenor
                    </span>
                    <span className="text-slate-200 font-medium">{loan.rentang}</span>
                </div>
            </div>

            {/* Footer Arrow */}
            <div className="mt-6 flex justify-end">
                <span className="text-xs font-medium text-indigo-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lihat Detail <ChevronRight size={14} />
                </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- SUB COMPONENT: STATUS BADGE ---
function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        disetujui: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        ditolak: "bg-red-500/10 text-red-400 border-red-500/20",
        lunas: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        selesai: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    };

    const defaultStyle = "bg-slate-500/10 text-slate-400 border-slate-500/20";

    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || defaultStyle}`}>
            {status}
        </span>
    );
}