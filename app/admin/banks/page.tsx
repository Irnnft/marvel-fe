'use client';
import { useState, useEffect } from 'react';
import { bankService } from '@/services/bank.service';
import { Bank, BankFormData } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

function AdminBanksContent() {
    const [banks, setBanks] = useState<Bank[]>([]); // ✅ Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBank, setEditingBank] = useState<Bank | null>(null);
    const [formData, setFormData] = useState<BankFormData>({
        kode_bank: '',
        nama_bank: '',
        alamat: '',
        kota: '',
        provinsi: ''
    });
    const [error, setError] = useState('');
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        fetchBanks();
    }, []);

    const fetchBanks = async () => {
        try {
            console.log('Fetching banks...'); // ✅ Debug
            const response = await bankService.getAll();
            console.log('Banks response:', response.data); // ✅ Debug
            
            // ✅ Handle both response formats
            const banksData = response.data.data || response.data;
            setBanks(Array.isArray(banksData) ? banksData : []);
            setError('');
        } catch (error: any) {
            console.error('Error fetching banks:', error);
            setError(error.response?.data?.message || error.message || 'Gagal memuat data bank');
            setBanks([]); // ✅ Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingBank(null);
        setFormData({
            kode_bank: '',
            nama_bank: '',
            alamat: '',
            kota: '',
            provinsi: ''
        });
        setShowModal(true);
    };

    const handleEdit = (bank: Bank) => {
        setEditingBank(bank);
        setFormData({
            kode_bank: bank.kode_bank,
            nama_bank: bank.nama_bank,
            alamat: bank.alamat,
            kota: bank.kota,
            provinsi: bank.provinsi
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Kelola Bank</h1>
                    <div className="flex gap-3">
                        <button
                            onClick={handleCreate}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            + Tambah Bank
                        </button>
                        <Link
                            href="/dashboard"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {banks.length === 0 ? (
                        <div className="p-8 text-center text-gray-600">
                            Belum ada data bank. Klik "Tambah Bank" untuk menambah.
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kode</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Bank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kota</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provinsi</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {banks.map(bank => (
                                    <tr key={bank.kode_bank} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap font-mono">{bank.kode_bank}</td>
                                        <td className="px-6 py-4">{bank.nama_bank}</td>
                                        <td className="px-6 py-4">{bank.kota}</td>
                                        <td className="px-6 py-4">{bank.provinsi}</td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() => handleEdit(bank)}
                                                className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(bank.kode_bank)}
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">
                            {editingBank ? 'Edit Bank' : 'Tambah Bank'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Kode Bank</label>
                                <input
                                    type="text"
                                    value={formData.kode_bank}
                                    onChange={(e) => setFormData({ ...formData, kode_bank: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                    disabled={!!editingBank}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Nama Bank</label>
                                <input
                                    type="text"
                                    value={formData.nama_bank}
                                    onChange={(e) => setFormData({ ...formData, nama_bank: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Alamat</label>
                                <textarea
                                    value={formData.alamat}
                                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Kota</label>
                                <input
                                    type="text"
                                    value={formData.kota}
                                    onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Provinsi</label>
                                <input
                                    type="text"
                                    value={formData.provinsi}
                                    onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                                >
                                    {formLoading ? 'Loading...' : 'Simpan'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    disabled={formLoading}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
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
