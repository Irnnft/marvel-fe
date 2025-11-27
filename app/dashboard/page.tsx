'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import { motion } from 'framer-motion';
import { 
  User, 
  CreditCard, 
  Wallet, 
  Settings, 
  Building2, 
  FileText,
  ChevronRight,
  LayoutDashboard,
  Bell,
  LucideIcon,
  Calendar,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

// --- ANIMATION VARIANTS (Premium Feel) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Lebih cepat sedikit biar snappy
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 12 } 
  }
};

// --- TIPE CARD MENU ---
interface MenuCardProps {
  href: string;
  title: string;
  subtitle: string;
  icon: LucideIcon | any;
  gradient: string;
  delay?: number;
}

function DashboardContent() {
  // --- LOGIC (TIDAK DISENTUH) ---
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

  // Fungsi logout tetap ada di memory jaga-jaga, tapi tombolnya dihapus dari UI
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!mounted) return null;
  // -------------------------------

  const currentDate = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="min-h-screen relative text-slate-200 font-sans overflow-x-hidden bg-[#0B0F19]">
      
      {/* --- BACKGROUND PRO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image 
          src="/bg-dashboard.jpg" 
          alt="Background" 
          fill 
          className="object-cover blur-2xl opacity-40 scale-110" 
          priority
        />
        {/* Noise Texture Overlay untuk kesan mahal */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/90 to-[#0B0F19]"></div>
      </div>

      {/* --- NAVBAR (Tanpa Logout) --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled ? 'bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative w-12 h-12 rounded-xl bg-[#151925] border border-white/10 flex items-center justify-center shadow-2xl">
                    <LayoutDashboard size={22} className="text-indigo-400" />
                </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Pinjaman<span className="text-indigo-500">App</span>
              </h1>
              <p className="text-[11px] text-slate-400 tracking-[0.2em] uppercase font-medium">
                Executive Panel
              </p>
            </div>
          </div>
          
          {/* Notification Icon Only */}
          <div className="flex items-center gap-4">
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition relative group">
              <Bell size={20} className="text-slate-300 group-hover:text-white transition-colors" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 container mx-auto px-6 pt-36 pb-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* HEADER SECTION */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div>
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-2">
                    <Calendar size={14} />
                    <span>{currentDate}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">{user?.name}</span>
                </h2>
                <p className="text-slate-400 mt-2 text-lg max-w-xl">
                  Selamat datang kembali di pusat kontrol finansial Anda.
                </p>
            </div>
          </motion.div>

          {/* PROFILE & STATS GRID */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10"
          >
            {/* Main Profile Card */}
            <div className="lg:col-span-2 bg-[#151925]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                    <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-br from-indigo-500 to-purple-600">
                        <div className="w-full h-full rounded-full bg-[#0B0F19] flex items-center justify-center overflow-hidden">
                             <User size={40} className="text-slate-300" />
                        </div>
                    </div>
                    <div className="text-center sm:text-left flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1">{user?.username}</h3>
                        <p className="text-indigo-300 text-sm font-medium bg-indigo-500/10 inline-block px-3 py-1 rounded-full border border-indigo-500/20 mb-4 capitalize">
                            {user?.role} Account
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</p>
                                <p className="text-sm text-slate-200 font-medium truncate">{user?.email}</p>
                            </div>
                            {user?.role === 'customer' && (
                                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Nomor HP</p>
                                    <p className="text-sm text-slate-200 font-medium">{user?.no_hp || '-'}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats / Side Info */}
            <div className="bg-gradient-to-br from-[#151925]/80 to-[#0F121B]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                        <ShieldCheck size={24} className="text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white">Status Akun</h4>
                    <p className="text-emerald-400 text-sm font-medium flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Terverifikasi & Aktif
                    </p>
                </div>
                {user?.role === 'customer' && (
                    <div>
                        <p className="text-xs text-slate-500 uppercase mb-1">NIK Terdaftar</p>
                        <p className="text-xl font-mono text-white tracking-widest">
                            {user?.NIK ? `${user.NIK.substring(0,6)}••••••` : '-'}
                        </p>
                    </div>
                )}
            </div>
          </motion.div>

          {/* MENU GRID (BENTO BOX STYLE) */}
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
            Menu Utama
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.role === 'customer' && (
              <>
                <MenuCard 
                  href="/peminjaman/create"
                  title="Ajukan Pinjaman"
                  subtitle="Butuh dana cepat? Proses instan sekarang."
                  icon={CreditCard}
                  gradient="from-indigo-600 to-blue-600"
                />
                <MenuCard 
                  href="/peminjaman"
                  title="Pinjaman Saya"
                  subtitle="Pantau tagihan dan riwayat transaksi."
                  icon={Wallet}
                  gradient="from-emerald-600 to-teal-600"
                />
              </>
            )}

            {(user?.role === 'admin' || user?.role === 'owner') && (
              <MenuCard 
                href="/admin/peminjaman"
                title="Kelola Pinjaman"
                subtitle="Dashboard monitoring & approval nasabah."
                icon={FileText}
                gradient="from-purple-600 to-pink-600"
              />
            )}

            {user?.role === 'owner' && (
              <MenuCard 
                href="/admin/banks"
                title="Database Bank"
                subtitle="Konfigurasi sistem perbankan pusat."
                icon={Building2}
                gradient="from-orange-600 to-red-600"
              />
            )}

            <MenuCard 
              href="/profile"
              title="Pengaturan Akun"
              subtitle="Kelola keamanan & preferensi profil."
              icon={Settings}
              gradient="from-slate-600 to-slate-500"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENT: PRO CARD ---
function MenuCard({ href, title, subtitle, icon: Icon, gradient }: MenuCardProps) {
  return (
    <Link href={href}>
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="h-full bg-[#151925]/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 relative overflow-hidden group cursor-pointer"
      >
        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-[60px] rounded-full group-hover:opacity-20 transition-opacity duration-500`}></div>

        <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-black/50 text-white ring-1 ring-white/20`}>
              <Icon size={26} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-white group-hover:text-black transition-all duration-300 border border-white/5">
              <ChevronRight size={20} />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{subtitle}</p>
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