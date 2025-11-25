'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href={user ? '/dashboard' : '/'} className="text-2xl font-bold text-blue-600">
                        PinjamanApp
                    </Link>

                    <nav className="flex items-center gap-4">
                        {user ? (
                            <>
                                <span className="text-gray-600">Halo, {user.name}</span>
                                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                                    Dashboard
                                </Link>
                                <Link href="/peminjaman" className="text-gray-700 hover:text-blue-600">
                                    Pinjaman
                                </Link>
                                {(user.role === 'admin' || user.role === 'owner') && (
                                    <Link href="/admin/peminjaman" className="text-gray-700 hover:text-blue-600">
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-700 hover:text-blue-600">
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
