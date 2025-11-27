"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Loader2, 
  AlertTriangle,
  User as UserIcon,
  Mail,
  Phone,
  CreditCard,
  Hash,
  Shield,
  LogOut
} from "lucide-react";

// --- LOGIC AUTH CONTEXT (Simple Version untuk dalam file) ---
// Kita pakai authService langsung biar ga error import context kalau file-nya beda
import { useAuth } from "@/context/AuthContext"; 

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuth(); // Ambil logout dari context
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await authService.getUser();
        if (!isMounted) return;
        setUser(res.data);
      } catch (err) {
        if (!isMounted) return;
        router.push("/login");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  // --- 1. LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-slate-400 text-sm font-medium tracking-wider animate-pulse">MEMUAT PROFIL...</p>
        </div>
      </div>
    );
  }

  // --- 2. ERROR STATE ---
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none"></div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl text-center max-w-md w-full relative z-10">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="text-red-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Data Tidak Ditemukan</h2>
          <button
            onClick={() => router.push("/login")}
            className="w-full py-3 bg-white text-indigo-950 font-bold rounded-xl hover:bg-indigo-50 transition-all shadow-lg mt-4"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  // --- 3. MAIN CONTENT ---
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-200 font-sans relative overflow-x-hidden">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image 
          src="/bg-dashboard.jpg" 
          alt="Background" 
          fill 
          className="object-cover blur-2xl opacity-30 scale-110" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/90 to-[#0B0F19]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        
        {/* HEADER */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
        >
            <Link 
                href="/dashboard" 
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Kembali ke Dashboard</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                <ShieldCheck size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Secure Area</span>
            </div>
        </motion.div>

        {/* GLASS CARD CONTAINER */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#151925]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="mb-10 border-b border-white/10 pb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Profil Pengguna</h1>
                    <p className="text-slate-400">Informasi akun Anda terenkripsi dengan aman.</p>
                </div>

                {/* --- BAGIAN UTAMA: GRID DATA USER (INLINE) --- */}
                {/* Tidak pakai komponen luar lagi, langsung di sini biar warnanya bener */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileItem label="Nama Lengkap" value={user.name} icon={UserIcon} />
                    <ProfileItem label="Username" value={`@${user.username}`} icon={Hash} />
                    <ProfileItem label="Email Address" value={user.email} icon={Mail} />
                    <ProfileItem label="Role Akses" value={user.role} icon={Shield} isBadge />

                    {/* Kondisional untuk Customer */}
                    {user.role === 'customer' && (
                        <>
                            <ProfileItem label="Nomor WhatsApp" value={user.no_hp || "-"} icon={Phone} />
                            <ProfileItem label="NIK Terdaftar" value={user.NIK || "-"} icon={CreditCard} />
                        </>
                    )}
                </div>

                {/* FOOTER & LOGOUT */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-xs text-slate-500 text-center md:text-left">
                        <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
                        <p>ID Akun: <span className="font-mono text-slate-400">{user.id}</span></p>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 group shadow-lg"
                    >
                      <span>Keluar Akun</span>
                      <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
}

// --- SUB COMPONENT KECIL DI DALAM FILE YANG SAMA ---
// Biar ga perlu bikin file baru, taruh di bawah sini aja
function ProfileItem({ label, value, icon: Icon, isBadge = false }: { label: string; value: string; icon: any; isBadge?: boolean }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-start gap-4 hover:bg-white/10 transition-colors group">
      <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:text-indigo-300 group-hover:scale-110 transition-all shrink-0">
        <Icon size={20} />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{label}</p>
        {isBadge ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-bold capitalize">
            {value}
          </span>
        ) : (
          <p className="text-white font-medium text-lg truncate" title={value}>{value}</p>
        )}
      </div>
    </div>
  );
}