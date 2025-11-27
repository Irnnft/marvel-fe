'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import { peminjamanService, Payment } from '@/services/peminjaman.service';
import { Peminjaman } from '@/types';
import PembayaranForm from '@/components/features/peminjaman/Pembayaranform';
import PaymentHistory from '@/components/features/peminjaman/PaymentHistory';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  CreditCard, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Wallet,
  TrendingUp,
  FileText,
  Loader2,
  Building2
} from 'lucide-react';

interface PaymentSummary {
  total_pinjam: number;
  total_bayar: number;
  sisa: number;
}

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

function PeminjamanDetailContent() {
  // --- LOGIC START (TIDAK DIUBAH) ---
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [loan, setLoan] = useState<Peminjaman | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState('');

  const numericId = Number(id);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await peminjamanService.getPayments(numericId);
      setLoan(res.data.loan);
      setPayments(res.data.payments || []);
      setSummary(res.data.summary || null);
    } catch (err: any) {
      console.error('Error fetching loan detail:', err);
      setError(err.response?.data?.message || 'Gagal memuat data pinjaman');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!numericId) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericId]);

  const handlePay = async (data: { nominal: string; metode?: string; keterangan?: string }) => {
    try {
      setPayLoading(true);
      setError('');

      const res = await peminjamanService.pay(numericId, data);
      setLoan(res.data.loan);
      setSummary(res.data.summary);
      await fetchData();
      alert('Pembayaran berhasil');
    } catch (err: any) {
      console.error('Error paying loan:', err);
      setError(err.response?.data?.message || 'Gagal melakukan pembayaran');
    } finally {
      setPayLoading(false);
    }
  };
  // --- LOGIC END ---

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-slate-400 text-sm font-medium tracking-wider animate-pulse">MEMUAT DATA TRANSAKSI...</p>
        </div>
      </div>
    );
  }

  // --- NOT FOUND STATE ---
  if (!loan) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Data Tidak Ditemukan</h2>
          <p className="text-slate-400 mb-6">ID Pinjaman tidak valid atau data telah dihapus.</p>
          <button
            onClick={() => router.push('/peminjaman')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Kembali ke Daftar
          </button>
        </div>
      </div>
    );
  }

  // Calculation Logic
  const totalPinjam = parseInt(loan.nominal, 10) || 0;
  const sisa = summary?.sisa ?? totalPinjam;
  const totalBayar = summary?.total_bayar ?? 0;
  const progress = totalPinjam > 0 ? Math.min((totalBayar / totalPinjam) * 100, 100) : 0;
  const bolehBayar = user?.role === 'customer' && loan.status !== 'selesai' && sisa > 0;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans relative overflow-x-hidden">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image 
          src="/bg-dashboard.jpg" 
          alt="Background" 
          fill 
          className="object-cover blur-2xl opacity-30 scale-110" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/90 to-[#0B0F19]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        
        {/* HEADER */}
        <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
            <div>
                <Link 
                    href="/peminjaman" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">Kembali ke Daftar Pinjaman</span>
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                    Detail Transaksi
                    <span className={`text-xs px-3 py-1 rounded-full border ${
                        (loan.status as string) === 'selesai' || (loan.status as string) === 'lunas'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                    } uppercase tracking-wider`}>
                        {loan.status}
                    </span>
                </h1>
            </div>
        </motion.div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl mb-6 flex items-center gap-3">
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: INFO & PROGRESS */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* CARD UTAMA: SUMMARY PINJAMAN */}
                <motion.div 
                    initial="hidden" animate="visible" variants={fadeInUp}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
                    
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <FileText size={20} className="text-indigo-400" />
                        Ringkasan Kontrak
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <InfoItem label="Nominal Pinjaman" value={`Rp ${totalPinjam.toLocaleString('id-ID')}`} icon={CreditCard} isHighlight />
                        <InfoItem label="Tanggal Pengajuan" value={loan.created_at ? new Date(loan.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'}) : '-'} icon={Calendar} />
                        <InfoItem label="Jangka Waktu" value={loan.rentang} icon={Clock} />
                        <InfoItem label="Pemberi Dana" value={loan.user?.name || 'System'} icon={Building2} />
                    </div>

                    {/* PROGRESS BAR VISUAL */}
                    <div className="bg-[#0B0F19]/50 rounded-2xl p-6 border border-white/5">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Progres Pembayaran</p>
                                <p className="text-2xl font-bold text-white">
                                    {progress.toFixed(0)}% <span className="text-sm font-normal text-slate-500">Terbayar</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Dibayar</p>
                                <p className="text-lg font-bold text-emerald-400">Rp {totalBayar.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                        {/* Bar */}
                        <div className="h-3 w-full bg-slate-700/30 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "circOut" }}
                                className={`h-full rounded-full ${progress >= 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-blue-500'}`}
                            ></motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* SECTION: HISTORY PEMBAYARAN */}
                <motion.div 
                    initial="hidden" animate="visible" variants={fadeInUp}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8"
                >
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-emerald-400" />
                        Riwayat Pembayaran
                    </h2>
                    {/* Note: PaymentHistory component mungkin perlu di-style manual juga jika masih putih */}
                    <div className="glass-table-wrapper">
                        <PaymentHistory payments={payments} loading={loading} />
                    </div>
                </motion.div>

            </div>

            {/* RIGHT COLUMN: ACTION & STATUS */}
            <div className="lg:col-span-1 space-y-8">
                
                {/* SISA TAGIHAN CARD */}
                <motion.div 
                    initial="hidden" animate="visible" variants={fadeInUp}
                    className="bg-gradient-to-br from-[#151925] to-[#0F121B] border border-white/10 rounded-[2rem] p-8 relative overflow-hidden"
                >
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                    
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Sisa Tagihan</p>
                    <h3 className="text-4xl font-bold text-white mb-4">
                        Rp {sisa.toLocaleString('id-ID')}
                    </h3>
                    
                    {sisa <= 0 ? (
                        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-xl border border-emerald-500/20">
                            <CheckCircle2 size={20} />
                            <span className="font-bold">LUNAS</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-4 py-3 rounded-xl border border-orange-500/20">
                            <AlertCircle size={20} />
                            <span className="font-medium">Belum Lunas</span>
                        </div>
                    )}
                </motion.div>

                {/* FORM PEMBAYARAN (Hanya muncul jika boleh bayar) */}
                {bolehBayar && (
                    <motion.div 
                        initial="hidden" animate="visible" variants={fadeInUp}
                        className="bg-indigo-600/10 border border-indigo-500/20 rounded-[2rem] p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none"></div>
                        
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Wallet size={18} className="text-indigo-400" />
                            Bayar Sekarang
                        </h2>
                        
                        {/* Note: PembayaranForm mungkin perlu styling CSS terpisah jika inputnya masih putih */}
                        <div className="payment-form-wrapper">
                            <PembayaranForm
                                sisa={sisa}
                                loading={payLoading}
                                error={error}
                                onSubmit={handlePay}
                            />
                        </div>
                    </motion.div>
                )}

            </div>
        </div>

      </div>
    </div>
  );
}

// --- SUB COMPONENT (INFO ITEM) ---
function InfoItem({ label, value, icon: Icon, isHighlight = false }: { label: string; value: string | number; icon: any, isHighlight?: boolean }) {
    return (
        <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-xl ${isHighlight ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/5 text-slate-400'}`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                <p className={`font-medium ${isHighlight ? 'text-xl text-white' : 'text-slate-200'}`}>
                    {value}
                </p>
            </div>
        </div>
    );
}

export default function PeminjamanDetailPage() {
  return (
    <ProtectedRoute allowedRoles={['customer', 'admin', 'owner']}>
      <PeminjamanDetailContent />
    </ProtectedRoute>
  );
}