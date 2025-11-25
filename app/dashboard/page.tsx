'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { 
    LogOut, 
    User, 
    CreditCard, 
    Wallet, 
    Settings, 
    Building2, 
    FileText,
    ChevronRight,
    LayoutDashboard,
    Bell,
    LucideIcon // Import tipe icon biar ga error
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1, 
        transition: { type: "spring", stiffness: 100, damping: 10 } 
    }
};

// --- DEFINISI TIPE DATA (Biar Typescript Senang) ---
interface MenuCardProps {
    href: string;
    title: string;
    subtitle: string;
    icon: LucideIcon | any; // 'any' biar aman kalau ada konflik versi
    gradient: string;
}

function DashboardContent() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen relative text-white font-sans overflow-x-hidden">
            
            {/* --- BACKGROUND IMAGE --- */}
            <div className="fixed inset-0 z-0">
                {/* Pastikan file bg-dashboard.jpg ada di folder public */}
                <Image 
                    src="/bg-dashboard.jpg" 
                    alt="Background" 
                    fill 
                    className="object-cover blur-lg scale-110" 
                    priority
                />
                <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            </div>

            {/* --- NAVBAR --- */}
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled ? 'bg-black/40 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
                }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <LayoutDashboard size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Dashboard<span className="text-indigo-400"></span></h1>
                            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Financial Panel</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-white/10 transition relative">
                            <Bell size={20} className="text-gray-300" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group"
                        >
                            <span className="group-hover:translate-x-[-2px] transition-transform">Logout</span>
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* --- MAIN CONTENT --- */}
            <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto"
                >
                    {/* Welcome Text */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-2">
                            Selamat Datang, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{user?.name}</span> 👋
                        </h2>
                        <p className="text-gray-400 text-lg">Berikut adalah ringkasan aktivitas finansial Anda hari ini.</p>
                    </motion.div>

                    {/* Profile Card */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 border-2 border-white/20 flex items-center justify-center text-3xl font-bold text-gray-300 shadow-xl">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1">{user?.username}</h3>
                                    <p className="text-gray-400 text-sm flex items-center gap-2">
                                        <User size={14}/> {user?.email}
                                    </p>
                                    <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                                        {user?.role}
                                    </div>
                                </div>
                            </div>

                            {user?.role === 'customer' && (
                                <div className="flex gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                                    <div className="text-center md:text-left">
                                        <p className="text-xs text-gray-500 uppercase mb-1">Nomor HP</p>
                                        <p className="text-lg font-mono text-white">{user?.no_hp || '-'}</p>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <p className="text-xs text-gray-500 uppercase mb-1">NIK Terdaftar</p>
                                        <p className="text-lg font-mono text-white tracking-wide">
                                            {user?.NIK ? `${user.NIK.substring(0,6)}******` : '-'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user?.role === 'customer' && (
                            <>
                                <MenuCard 
                                    href="/peminjaman/create"
                                    title="Ajukan Pinjaman"
                                    subtitle="Butuh dana cepat? Ajukan sekarang."
                                    icon={CreditCard}
                                    gradient="from-blue-600 to-indigo-600"
                                />
                                <MenuCard 
                                    href="/peminjaman"
                                    title="Pinjaman Saya"
                                    subtitle="Cek status dan riwayat tagihan."
                                    icon={Wallet}
                                    gradient="from-emerald-500 to-teal-600"
                                />
                            </>
                        )}

                        {(user?.role === 'admin' || user?.role === 'owner') && (
                            <MenuCard 
                                href="/admin/peminjaman"
                                title="Kelola Pinjaman"
                                subtitle="Validasi dan monitoring nasabah."
                                icon={FileText}
                                gradient="from-purple-600 to-pink-600"
                            />
                        )}

                        {user?.role === 'owner' && (
                            <MenuCard 
                                href="/admin/banks"
                                title="Database Bank"
                                subtitle="Pengaturan referensi bank sistem."
                                icon={Building2}
                                gradient="from-orange-500 to-red-600"
                            />
                        )}

                        {/* Menu Tambahan (Opsional) */}
                        <MenuCard 
                            href="/profile"
                            title="Pengaturan Akun"
                            subtitle="Update password & data diri."
                            icon={Settings}
                            gradient="from-slate-700 to-slate-600"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

// --- REUSABLE COMPONENT: GLASS CARD (FIXED FOR TS) ---
function MenuCard({ href, title, subtitle, icon: Icon, gradient }: MenuCardProps) {
    return (
        <Link href={href}>
            <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-20 blur-[50px] rounded-full group-hover:opacity-30 transition-opacity`}></div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg text-white`}>
                            <Icon size={28} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-black transition-all">
                            <ChevronRight size={18} />
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{subtitle}</p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}