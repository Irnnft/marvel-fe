'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { bankService } from '@/services/bank.service';
import { RegisterData, Bank } from '@/types';
import RegisterForm from '@/components/features/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [banks, setBanks] = useState<Bank[]>([]); // ✅ Initialize as empty array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await bankService.getAll();
                console.log('Banks response:', response.data); // ✅ Debug log
                
                // ✅ Handle both response formats
                const banksData = response.data.data || response.data;
                setBanks(Array.isArray(banksData) ? banksData : []);
            } catch (err) {
                console.error('Error fetching banks:', err);
                setBanks([]); // ✅ Set empty array on error
            }
        };
        fetchBanks();
    }, []);

    const handleRegister = async (data: RegisterData) => {
        setLoading(true);
        setError('');

        try {
            await authService.register(data);
            alert('Registrasi berhasil! Silakan login.');
            router.push('/login');
        } catch (err: any) {
            if (err.response?.status === 422 && err.response?.data?.errors) {
                setError('Terdapat kesalahan pada form. Periksa kembali data Anda.');
            } else {
                setError(err.response?.data?.message || 'Registrasi gagal');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6 text-center">Registrasi</h1>
                    
                    {banks.length === 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
                            Loading banks data...
                        </div>
                    )}
                    
                    <RegisterForm
                        banks={banks}
                        onSubmit={handleRegister}
                        loading={loading}
                        error={error}
                    />

                    <p className="mt-4 text-center text-sm">
                        Sudah punya akun?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Login di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
