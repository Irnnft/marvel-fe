'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PeminjamanForm from '@/components/features/peminjaman/PeminjamanForm';
import { peminjamanService } from '@/services/peminjaman.service';
import { PeminjamanFormData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Wallet, ShieldCheck } from 'lucide-react';

export default function CreatePeminjamanPage() {
  // --- LOGIC START (TIDAK DIUBAH) ---
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'customer') {
      alert('Admin dan Owner tidak bisa mengajukan pinjaman');
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (data: PeminjamanFormData) => {
    try {
      await peminjamanService.create(data);
      alert('Pengajuan pinjaman berhasil!');
      router.push('/peminjaman');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal mengajukan pinjaman');
    }
  };
  // --- LOGIC END ---

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans relative overflow-x-hidden flex flex-col justify-center py-12">
      
      {/* BACKGROUND (Seragam dengan Dashboard) */}
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

      <div className="relative z-10 container mx-auto px-4 max-w-2xl">
        
        {/* HEADER NAVIGATION */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
        >
            <Link 
                href="/peminjaman" 
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Batal & Kembali</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Encrypted Form</span>
            </div>
        </motion.div>

        {/* MAIN CARD FORM */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-[#151925]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden"
        >
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
                        <Wallet size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Ajukan Pinjaman Baru</h1>
                    <p className="text-slate-400 max-w-md mx-auto">
                        Isi formulir di bawah ini untuk mengajukan dana. Proses approval otomatis dalam 5 menit.
                    </p>
                </div>

                {/* WRAPPER FORM */}
                {/* Note: Pastikan component PeminjamanForm di dalamnya sudah distyle dark mode juga ya */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                    <PeminjamanForm
                        onSubmit={handleSubmit}
                        loading={false}
                        error={''}
                        onCancel={() => router.push('/peminjaman')}
                    />
                </div>
                
                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-500">
                        Dengan mengajukan, Anda menyetujui <span className="text-indigo-400 cursor-pointer hover:underline">Syarat & Ketentuan</span> kami.
                    </p>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
}