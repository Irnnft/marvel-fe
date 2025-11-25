'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/features/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError('');

        try {
            await login(email, password);
            router.push('/dashboard'); // ✅ Explicit redirect
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login gagal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                
                <LoginForm 
                    onSubmit={handleLogin} 
                    loading={loading}
                    error={error}
                />

                <p className="mt-4 text-center text-sm">
                    Belum punya akun?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
    );
}
