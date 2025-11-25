'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

function DashboardContent() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold mb-4">Selamat Datang, {user?.name}!</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Email: {user?.email}</p>
                            <p className="text-gray-600">Username: {user?.username}</p>
                            <p className="text-gray-600">
                                Role: <span className="font-semibold capitalize">{user?.role}</span>
                            </p>
                        </div>
                        {user?.role === 'customer' && (
                            <div>
                                <p className="text-gray-600">No HP: {user?.no_hp}</p>
                                <p className="text-gray-600">NIK: {user?.NIK}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* ✅ ONLY show for CUSTOMER */}
                    {user?.role === 'customer' && (
                        <>
                            <Link 
                                href="/peminjaman/create" 
                                className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 transition"
                            >
                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-2">Ajukan Pinjaman</h3>
                                    <p>Buat pengajuan pinjaman baru</p>
                                </div>
                            </Link>

                            <Link 
                                href="/peminjaman" 
                                className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition"
                            >
                                <div className="text-center">
                                    <h3 className="text-xl font-bold mb-2">Pinjaman Saya</h3>
                                    <p>Lihat daftar pinjaman Anda</p>
                                </div>
                            </Link>
                        </>
                    )}

                    {/* ✅ Show for ADMIN & OWNER */}
                    {(user?.role === 'admin' || user?.role === 'owner') && (
                        <Link 
                            href="/admin/peminjaman" 
                            className="bg-purple-600 text-white p-6 rounded-lg shadow-md hover:bg-purple-700 transition"
                        >
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-2">Kelola Pinjaman</h3>
                                <p>Manajemen semua pinjaman</p>
                            </div>
                        </Link>
                    )}

                    {/* ✅ ONLY show for OWNER */}
                    {user?.role === 'owner' && (
                        <Link 
                            href="/admin/banks" 
                            className="bg-indigo-600 text-white p-6 rounded-lg shadow-md hover:bg-indigo-700 transition"
                        >
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-2">Kelola Bank</h3>
                                <p>Manajemen data bank</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
