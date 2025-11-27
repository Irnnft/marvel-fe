'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { peminjamanService } from '@/services/peminjaman.service';
import { Peminjaman } from '@/types';
import PeminjamanList from '@/components/features/peminjaman/PeminjamanList';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Plus, 
  Wallet, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';

function MyLoansContent() {
  // --- LOGIC START (TIDAK DIUBAH) ---
  const [loans, setLoans] = useState<Peminjaman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await peminjamanService.getMyLoans();
        const loansData = response.data.data || response.data;
        setLoans(Array.isArray(loansData) ? loansData : []);
      } catch (error: any) {
        console.error('Error fetching loans:', error);
        setError(error.response?.data?.message || error.message || 'Gagal memuat data');
        setLoans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);
  // --- LOGIC END ---

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans relative overflow-x-hidden">
      
      {/* --- BACKGROUND (Standard Pro Theme) --- */}
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

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        {/* --- HEADER SECTION --- */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
        >
            <div>
                <Link 
                    href="/dashboard" 
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">Kembali ke Dashboard</span>
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                    <Wallet className="text-indigo-500" size={32} />
                    Pinjaman Saya
                </h1>
                <p className="text-slate-400 mt-1">Pantau status pengajuan dan riwayat pembayaran Anda.</p>
            </div>
        </motion.div>

        {/* --- CONTENT AREA --- */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                    <p className="text-slate-500 animate-pulse">Sedang mengambil data portofolio...</p>
                </div>
            )}

            {/* List Pinjaman */}
            {!loading && (
                <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 md:p-8 min-h-[400px]">
                    {/* NOTE: Pastikan component <PeminjamanList> di dalamnya 
                        sudah menggunakan style dark mode (text-white, bg-transparent) 
                        agar menyatu dengan container ini.
                    */}
                    <PeminjamanList
                        loans={loans}
                        loading={loading}
                        emptyMessage="Belum ada riwayat pinjaman aktif saat ini."
                        onCardClick={(loan) => router.push(`/peminjaman/${loan.id}`)} 
                    />
                </div>
            )}
        </motion.div>

      </div>
    </div>
  );
}

export default function MyLoansPage() {
  return (
    <ProtectedRoute>
      <MyLoansContent />
    </ProtectedRoute>
  );
}