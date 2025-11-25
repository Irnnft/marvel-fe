'use client';
import { useState, useEffect } from 'react';
import { peminjamanService } from '@/services/peminjaman.service';
import { Peminjaman } from '@/types';
import PeminjamanList from '@/components/features/peminjaman/PeminjamanList';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

function MyLoansContent() {
    const [loans, setLoans] = useState<Peminjaman[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                console.log('Fetching loans...'); // ✅ Debug
                const response = await peminjamanService.getMyLoans();
                console.log('Response:', response.data); // ✅ Debug
                
                // ✅ Handle both response formats
                const loansData = response.data.data || response.data;
                setLoans(Array.isArray(loansData) ? loansData : []);
            } catch (error: any) {
                console.error('Error fetching loans:', error); // ✅ Debug
                setError(error.response?.data?.message || error.message || 'Gagal memuat data');
                setLoans([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLoans();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Pinjaman Saya</h1>
                    <div className="flex gap-3">
                        <Link
                            href="/peminjaman/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Ajukan Pinjaman
                        </Link>
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

                <PeminjamanList
                    loans={loans}
                    loading={loading}
                    emptyMessage="Belum ada pinjaman. Klik tombol di atas untuk mengajukan pinjaman baru."
                />
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
