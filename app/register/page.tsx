'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { bankService } from '@/services/bank.service';
import { RegisterData, Bank } from '@/types';
import RegisterForm from '@/components/features/auth/RegisterForm';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Users, Star, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    // --- LOGIC AREA (DO NOT TOUCH) ---
    const router = useRouter();
    const [banks, setBanks] = useState<Bank[]>([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await bankService.getAll();
                console.log('Banks response:', response.data); 
                
                const banksData = response.data.data || response.data;
                setBanks(Array.isArray(banksData) ? banksData : []);
            } catch (err) {
                console.error('Error fetching banks:', err);
                setBanks([]); 
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
    // ----------------------------------

    return (
        <div className="min-h-screen w-full flex bg-[#030712] text-white selection:bg-indigo-500/30">
            
            {/* --- BAGIAN KIRI: FIXED SIDEBAR (Visual & Benefits) --- */}
            <div className="hidden lg:flex w-5/12 fixed h-full p-8 flex-col justify-between z-10">
                {/* Background Image Container */}
                <div className="absolute inset-0 rounded-r-3xl overflow-hidden z-0">
                    <Image 
                        src="/landing-bg.jpg" // Pastikan gambar ini ada di folder public
                        alt="Register Background"
                        fill
                        className="object-cover opacity-50 blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/40 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group">
                            <div className="p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition-all">
                                <ArrowLeft size={16} />
                            </div>
                            <span className="font-medium">Kembali ke Beranda</span>
                        </Link>
                    </div>

                    <div className="space-y-8 max-w-md">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-4xl font-bold mb-4 leading-tight">
                                Mulai Perjalanan <br/> 
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                                    Finansial Anda.
                                </span>
                            </h1>
                            <p className="text-slate-300 text-lg">
                                Bergabunglah dengan ribuan nasabah yang telah mempercayakan impian mereka kepada kami.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            <BenefitRow icon={ShieldCheck} text="Data Terenkripsi & Aman" delay={0.3} />
                            <BenefitRow icon={Users} text="50.000+ Komunitas Nasabah" delay={0.4} />
                            <BenefitRow icon={Star} text="Bunga Kompetitif & Transparan" delay={0.5} />
                        </div>
                    </div>

                    <div className="text-xs text-slate-500">
                        © 2025 PinjamanApp. All rights reserved.
                    </div>
                </div>
            </div>

            {/* --- BAGIAN KANAN: SCROLLABLE FORM --- */}
            <div className="w-full lg:w-7/12 ml-auto min-h-screen flex flex-col justify-center items-center p-6 lg:p-12 relative">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-xl"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">Buat Akun Baru</h2>
                        <p className="text-slate-400">Lengkapi data diri Anda untuk akses pinjaman instan.</p>
                    </div>

                    {/* WRAPPER FORM (Glassmorphism) */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                        
                        {/* 1. BANK LOADING STATE (Pro Style) */}
                        {banks.length === 0 && (
                            <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 animate-pulse">
                                <Loader2 className="animate-spin text-amber-400" size={20} />
                                <span className="text-amber-200 text-sm font-medium">Sedang memuat data bank dari server...</span>
                            </div>
                        )}
                        
                        {/* 2. THE FORM */}
                        {/* Note: RegisterForm akan merender input fields. Pastikan component tersebut support dark background atau transparan */}
                        <div className="register-form-wrapper">
                            <RegisterForm
                                banks={banks}
                                onSubmit={handleRegister}
                                loading={loading}
                                error={error}
                            />
                        </div>
                    </div>

                    {/* Footer Login Link */}
                    <p className="mt-8 text-center text-slate-500">
                        Sudah memiliki akun?{' '}
                        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors hover:underline underline-offset-4">
                            Login di sini
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

// --- SUB COMPONENT (Visual Sugar) ---
function BenefitRow({ icon: Icon, text, delay }: { icon: any, text: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
        >
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                <Icon size={20} />
            </div>
            <span className="font-medium text-slate-200">{text}</span>
        </motion.div>
    );
}