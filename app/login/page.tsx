'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/features/auth/LoginForm';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Quote } from 'lucide-react';

export default function LoginPage() {
    // --- LOGIC (Tidak diubah sama sekali) ---
    const router = useRouter();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError('');

        try {
            await login(email, password);
            router.push('/dashboard'); 
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login gagal');
        } finally {
            setLoading(false);
        }
    };
    // ----------------------------------------

    return (
        <div className="min-h-screen w-full flex bg-[#030712] text-white overflow-hidden">
            
            {/* --- BAGIAN KIRI: VISUAL & BRANDING (Hanya tampil di layar besar) --- */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden">
                {/* Background Image & Effects */}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/landing-bg.jpg" // Pastikan gambar ini ada di folder public
                        alt="Login Background"
                        fill
                        className="object-cover opacity-40 blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/60 to-transparent"></div>
                </div>

                {/* Logo Area */}
                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                        <Sparkles className="text-white" size={20} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">Pinjaman<span className="text-indigo-500">App</span></span>
                </div>

                {/* Quote Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl max-w-md"
                >
                    <Quote className="text-indigo-400 mb-4 opacity-50" size={32} />
                    <p className="text-lg text-slate-200 font-light leading-relaxed mb-6">
                        "Hidup anda tenang?, pinjol solusinya. Dengan Hutang hidup akan semakin menantang, salam garuk dengkul."
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center font-bold text-sm">
                            IR
                        </div>
                        <div>
                            <p className="font-bold">Irfan Nurfathoni Putra</p>
                            <p className="text-xs text-slate-400">CEO, Tech Startups</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* --- BAGIAN KANAN: FORM LOGIN --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 relative">
                {/* Tombol Kembali */}
                <Link href="/" className="absolute top-8 right-8 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                    Kembali ke Beranda <ArrowLeft size={16} className="rotate-180"/>
                </Link>

                {/* Container Form */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold mb-3 tracking-tight">Welcome Back!</h2>
                        <p className="text-slate-400">Silakan masuk untuk mengelola akun Anda.</p>
                    </div>

                    {/* Wrapper untuk LoginForm agar sesuai tema */}
                    {/* Note: Jika LoginForm kamu punya background putih bawaan, dia akan jadi kotak putih. 
                        Jika transparan, dia akan menyatu dengan dark mode ini. */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
                        <LoginForm 
                            onSubmit={handleLogin} 
                            loading={loading}
                            error={error}
                        />
                    </div>

                    <p className="mt-8 text-center text-slate-500 text-sm">
                        Belum punya akun?{' '}
                        <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors hover:underline underline-offset-4">
                            Daftar Sekarang
                        </Link>
                    </p>
                </motion.div>

                {/* Footer Kecil */}
                <div className="absolute bottom-6 text-center text-xs text-slate-600">
                    &copy; 2025 PinjamanApp Financial. Secure Connection.
                </div>
            </div>
        </div>
    );
}