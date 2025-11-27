'use client';

import { useState, useEffect } from 'react';
import { peminjamanService } from '@/services/peminjaman.service';
import { Peminjaman } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    FileText, 
    Loader2, 
    CheckCircle, 
    XCircle, 
    User, 
    CreditCard, 
    Clock 
} from 'lucide-react';

function AdminPeminjamanContent() {
    // --- LOGIC START (TIDAK DIUBAH) ---
    const [loans, setLoans] = useState<Peminjaman[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            const response = await peminjamanService.getAll();
            setLoans(response.data.data);
        } catch (error) {
            console.error('Error fetching loans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        if (!confirm('Setujui pinjaman ini?')) return;
        
        try {
            await peminjamanService.approve(id);
            alert('Pinjaman disetujui!');
            fetchLoans();
        } catch (error) {
            alert('Gagal menyetujui pinjaman');
        }
    };

    const handleReject = async (id: number) => {
        if (!confirm('Tolak pinjaman ini?')) return;
        
        try {
            await peminjamanService.reject(id);
            alert('Pinjaman ditolak!');
            fetchLoans();
        } catch (error) {
            alert('Gagal menolak pinjaman');
        }
    };
    // --- LOGIC END ---

    // Helper untuk Badge Status (Styling Dark)
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'disetujui': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'ditolak': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'selesai':
            case 'lunas': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
        }
    };

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

            <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
                
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
                            <FileText className="text-indigo-500" size={32} />
                            Kelola Pinjaman
                        </h1>
                        <p className="text-slate-400 mt-1">Daftar semua pengajuan pinjaman nasabah.</p>
                    </div>
                </motion.div>

                {/* --- CONTENT AREA (TABLE) --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                            <p className="text-slate-500 animate-pulse">Memuat data pengajuan...</p>
                        </div>
                    ) : (
                        <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-white/5 border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">ID Transaksi</th>
                                            <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Data Nasabah</th>
                                            <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Nominal Pengajuan</th>
                                            <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase tracking-wider text-right">Aksi Persetujuan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {loans.map((loan, index) => (
                                            <tr key={loan.id} className={`hover:bg-white/5 transition-colors ${index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}`}>
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <span className="font-mono text-indigo-400 font-bold">#{loan.id}</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-white/5 rounded-lg text-slate-400">
                                                            <User size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">{loan.user?.name || `User #${loan.user_id}`}</p>
                                                            {loan.user && <p className="text-xs text-slate-400">@{loan.user.username}</p>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-white font-mono font-bold text-lg">
                                                            <CreditCard size={16} className="text-slate-400" />
                                                            Rp {parseInt(loan.nominal).toLocaleString('id-ID')}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-slate-400 ml-6">
                                                            <Clock size={14} />
                                                            {loan.rentang}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(loan.status)}`}>
                                                        {loan.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 whitespace-nowrap text-right">
                                                    {loan.status === 'pending' ? (
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => handleApprove(loan.id)}
                                                                className="flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-all group"
                                                                title="Setujui"
                                                            >
                                                                <CheckCircle size={16} className="group-hover:scale-110 transition-transform" />
                                                                <span className="hidden md:inline">Setujui</span>
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(loan.id)}
                                                                className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-all group"
                                                                title="Tolak"
                                                            >
                                                                <XCircle size={16} className="group-hover:scale-110 transition-transform" />
                                                                <span className="hidden md:inline">Tolak</span>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-slate-500 italic">Tidak ada aksi</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        {loans.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                                    Belum ada data pengajuan pinjaman.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </motion.div>

            </div>
        </div>
    );
}

export default function AdminPeminjamanPage() {
    return (
        <ProtectedRoute allowedRoles={['admin', 'owner']}>
            <AdminPeminjamanContent />
        </ProtectedRoute>
    );
}