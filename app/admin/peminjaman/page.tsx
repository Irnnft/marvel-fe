'use client';
import { useState, useEffect } from 'react';
import { peminjamanService } from '@/services/peminjaman.service';
import { Peminjaman } from '@/types';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

function AdminPeminjamanContent() {
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'disetujui': return 'bg-green-100 text-green-800';
            case 'ditolak': return 'bg-red-100 text-red-800';
            case 'selesai': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Kelola Pinjaman</h1>
                    <Link href="/dashboard" className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
                        Kembali
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nominal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rentang</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loans.map(loan => (
                                <tr key={loan.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{loan.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {loan.user?.name || `User #${loan.user_id}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        Rp {parseInt(loan.nominal).toLocaleString('id-ID')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{loan.rentang}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(loan.status)}`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        {loan.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(loan.id)}
                                                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                                                >
                                                    Setujui
                                                </button>
                                                <button
                                                    onClick={() => handleReject(loan.id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                                >
                                                    Tolak
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
