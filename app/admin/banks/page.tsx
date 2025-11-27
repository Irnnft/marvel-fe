'use client';

import { useState, useEffect } from 'react';
import { bankService } from '@/services/bank.service';
import { Bank, BankFormData } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    Plus, 
    Building2, 
    MapPin, 
    Edit3, 
    Trash2, 
    Loader2, 
    Search 
} from 'lucide-react';

function AdminBanksContent() {
    // --- LOGIC START (TIDAK DIUBAH) ---
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBank, setEditingBank] = useState<Bank | null>(null);
    const [formData, setFormData] = useState<BankFormData>({
        kode_bank: '', nama_bank: '', alamat: '', kota: '', provinsi: ''
    });
    const [error, setError] = useState('');
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        fetchBanks();
    }, []);

    const fetchBanks = async () => {
        try {
            const response = await bankService.getAll();
            const banksData = response.data.data || response.data;
            setBanks(Array.isArray(banksData) ? banksData : []);
            setError('');
        } catch (error: any) {
            console.error('Error fetching banks:', error);
            setError(error.response?.data?.message || error.message || 'Gagal memuat data bank');
            setBanks([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingBank(null);
        setFormData({ kode_bank: '', nama_bank: '', alamat: '', kota: '', provinsi: '' });
        setShowModal(true);
    };

    const handleEdit = (bank: Bank) => {
        setEditingBank(bank);
        setFormData({
            kode_bank: bank.kode_bank, nama_bank: bank.nama_bank, alamat: bank.alamat, kota: bank.kota, provinsi: bank.provinsi
        });
        setShowModal(true);
    };

    const handleDelete = async (kode_bank: string) => {
        if (!confirm('Yakin ingin menghapus bank ini?')) return;
        try {
            await bankService.delete(kode_bank);
            alert('Bank berhasil dihapus');
            fetchBanks();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Gagal menghapus bank');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        setError('');
        try {
            if (editingBank) {
                await bankService.update(editingBank.kode_bank, formData);
                alert('Bank berhasil diupdate');
            } else {
                await bankService.create(formData);
                alert('Bank berhasil ditambahkan');
            }
            setShowModal(false);
            fetchBanks();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Gagal menyimpan bank');
        } finally {
            setFormLoading(false);
        }
    };
    // --- LOGIC END ---

    // Styling Helper
    const inputClass = "w-full bg-[#0B0F19] border border-slate-700 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all";
    const labelClass = "block text-sm font-medium text-slate-400 mb-1";

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

            <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                    <div>
                        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Kembali ke Dashboard</span>
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                            <Building2 className="text-orange-500" size={32} />
                            Database Bank
                        </h1>
                        <p className="text-slate-400 mt-1">Kelola daftar bank untuk pencairan dana.</p>
                    </div>

                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02]"
                    >
                        <Plus size={20} />
                        <span>Tambah Bank</span>
                    </button>
                </div>

                {/* CONTENT GRID */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                    </div>
                ) : banks.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-12 text-center">
                        <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg">Belum ada data bank terdaftar.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {banks.map((bank) => (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={bank.kode_bank}
                                className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-500/30 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Glow Effect */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none group-hover:bg-orange-500/20 transition-all"></div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500 font-bold text-xl font-mono border border-orange-500/20">
                                            {bank.kode_bank.substring(0, 3)}
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(bank)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors">
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(bank.kode_bank)} className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-1">{bank.nama_bank}</h3>
                                    <p className="text-xs font-mono text-slate-500 mb-4">KODE: {bank.kode_bank}</p>

                                    <div className="space-y-2 border-t border-white/5 pt-4">
                                        <div className="flex items-start gap-2 text-sm text-slate-400">
                                            <MapPin size={14} className="mt-0.5 text-orange-400/70" />
                                            <span className="line-clamp-2">{bank.alamat}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wide pl-6">
                                            {bank.kota}, {bank.provinsi}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL FORM (Pop Up) */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-[#151925] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <h2 className="text-xl font-bold text-white">
                                    {editingBank ? 'Edit Data Bank' : 'Tambah Bank Baru'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">✕</button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                                        {error}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Kode Bank</label>
                                        <input
                                            type="text" value={formData.kode_bank}
                                            onChange={(e) => setFormData({ ...formData, kode_bank: e.target.value })}
                                            className={inputClass}
                                            disabled={!!editingBank || formLoading}
                                            placeholder="001"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Nama Bank</label>
                                        <input
                                            type="text" value={formData.nama_bank}
                                            onChange={(e) => setFormData({ ...formData, nama_bank: e.target.value })}
                                            className={inputClass}
                                            disabled={formLoading}
                                            placeholder="Bank Central Asia"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Alamat Kantor Cabang</label>
                                    <textarea
                                        value={formData.alamat}
                                        onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                                        rows={3}
                                        className={inputClass}
                                        disabled={formLoading}
                                        placeholder="Jl. Jend. Sudirman No. 1"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Kota</label>
                                        <input
                                            type="text" value={formData.kota}
                                            onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                                            className={inputClass}
                                            disabled={formLoading}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Provinsi</label>
                                        <input
                                            type="text" value={formData.provinsi}
                                            onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                                            className={inputClass}
                                            disabled={formLoading}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        disabled={formLoading}
                                        className="flex-1 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition-all font-medium"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={formLoading}
                                        className="flex-1 bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        {formLoading ? <Loader2 className="animate-spin" size={18} /> : 'Simpan Data'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}

export default function AdminBanksPage() {
    return (
        <ProtectedRoute allowedRoles={['owner']}>
            <AdminBanksContent />
        </ProtectedRoute>
    );
}