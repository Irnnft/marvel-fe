'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
    Zap, 
    ShieldCheck, 
    Banknote, 
    CheckCircle2, 
    ArrowRight, 
    CreditCard,
    Star,
    TrendingUp
} from 'lucide-react';

// --- ANIMATION COMPONENTS (Reusable & Pro) ---

// Komponen untuk efek muncul saat di-scroll
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }} // Easing curve yang smooth
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function HomePage() {
    // Parallax Effect untuk Hero Background
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });
    
    // Background bergerak lebih lambat dari scroll (Parallax)
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div className="min-h-screen font-sans text-slate-900 overflow-x-hidden bg-white selection:bg-blue-100 selection:text-blue-900">
            
            {/* --- HERO SECTION (PARALLAX + CUSTOM BG) --- */}
            <section ref={targetRef} className="relative h-[110vh] flex items-center justify-center overflow-hidden">
                
                {/* 1. Background Image Custom dengan Parallax */}
                <motion.div 
                    style={{ y: yBg, opacity: opacityBg }} 
                    className="absolute inset-0 z-0"
                >
                    {/* GANTI '/landing-bg.jpg' DENGAN NAMA FILE KAMU DI FOLDER PUBLIC */}
                    <Image 
                        src="/landing-bg.jpg" 
                        alt="Hero Background" 
                        fill 
                        className="object-cover blur-sm scale-110" // blur-sm bikin agak blur, scale biar ga ada gap saat parallax
                        priority
                    />
                    {/* Overlay Gelap agar teks terbaca jelas (Pro Trick) */}
                    <div className="absolute inset-0 bg-slate-900/70 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-white"></div>
                </motion.div>

                <div className="container mx-auto px-6 relative z-10 text-center -mt-20">
                    <FadeIn delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8 shadow-2xl">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium tracking-wide">Platform Peminjaman #1 Indonesia</span>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-tight drop-shadow-lg">
                            Dana Cepat. <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
                                Mimpi Melesat.
                            </span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p className="text-lg md:text-2xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            Solusi finansial modern tanpa ribet. Cair dalam hitungan menit dengan keamanan enkripsi tingkat bank.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link href="/register">
                            <motion.button 
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.95 }}
                                className="group bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_20px_50px_rgba(37,99,235,0.5)] hover:bg-blue-500 transition-all flex items-center gap-2"
                            >
                                Ajukan Sekarang 
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        <Link href="/login">
                            <motion.button 
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 rounded-full font-bold text-lg text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all"
                            >
                                Masuk Akun
                            </motion.button>
                        </Link>
                    </FadeIn>

                    {/* Stats Floating (Optional Pro Touch) */}
                    <FadeIn delay={0.6} className="mt-16 flex justify-center gap-8 md:gap-16 text-white/80">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">50K+</div>
                            <div className="text-xs uppercase tracking-widest">Nasabah</div>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">5 Menit</div>
                            <div className="text-xs uppercase tracking-widest">Pencairan</div>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">24/7</div>
                            <div className="text-xs uppercase tracking-widest">Support</div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* --- FEATURES SECTION (Clean & Modern) --- */}
            <section className="py-32 bg-slate-50 relative">
                <div className="container mx-auto px-6 relative z-10">
                    <FadeIn className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Kenapa Kami Berbeda?</h2>
                        <p className="text-slate-600 text-xl max-w-2xl mx-auto">
                            Kami menggabungkan teknologi AI dengan kenyamanan nasabah untuk pengalaman meminjam yang manusiawi.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ProFeatureCard 
                            icon={Zap} 
                            title="Approval Kilat AI" 
                            desc="Algoritma cerdas kami memproses data Anda secara instan. Tidak ada lagi menunggu berhari-hari." 
                            delay={0.1}
                        />
                        <ProFeatureCard 
                            icon={ShieldCheck} 
                            title="Keamanan Terjamin" 
                            desc="Data dilindungi enkripsi AES-256. Privasi Anda adalah prioritas mutlak kami." 
                            delay={0.2}
                        />
                        <ProFeatureCard 
                            icon={Banknote} 
                            title="Bunga Transparan" 
                            desc="Apa yang Anda lihat adalah apa yang Anda bayar. Tanpa biaya admin tersembunyi." 
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* --- BENEFITS SECTION (Visual & Interactive) --- */}
            <section className="py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        
                        {/* Text Content */}
                        <div className="w-full lg:w-1/2">
                            <FadeIn>
                                <h2 className="text-4xl md:text-6xl font-bold mb-8 text-slate-900 leading-tight">
                                    Akses Finansial <br/> 
                                    <span className="text-blue-600">Tanpa Batas.</span>
                                </h2>
                                <p className="text-slate-500 mb-10 text-xl leading-relaxed">
                                    Lupakan tumpukan berkas. Kami menyederhanakan birokrasi agar Anda bisa fokus mewujudkan impian.
                                </p>
                                
                                <div className="space-y-6">
                                    <ProBenefitItem text="Hanya butuh KTP & NPWP" delay={0.1} />
                                    <ProBenefitItem text="Pencairan langsung ke rekening" delay={0.2} />
                                    <ProBenefitItem text="Tanpa Agunan (KTA Murni)" delay={0.3} />
                                    <ProBenefitItem text="Limit hingga 50 Juta Rupiah" delay={0.4} />
                                </div>
                            </FadeIn>
                        </div>

                        {/* Visual Card (Floating & Glass) */}
                        <div className="w-full lg:w-1/2 relative">
                            <FadeIn delay={0.3} className="relative z-10">
                                {/* Abstract Background Blobs */}
                                <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                                {/* The Card UI */}
                                <motion.div 
                                    whileHover={{ rotateY: 5, rotateX: -5 }}
                                    transition={{ type: "spring", stiffness: 100 }}
                                    style={{ perspective: 1000 }}
                                    className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                    
                                    <div className="flex justify-between items-start mb-12 relative z-10">
                                        <div>
                                            <p className="text-slate-400 text-sm font-medium tracking-wider uppercase mb-1">Available Limit</p>
                                            <h3 className="text-4xl font-bold">Rp 50.000.000</h3>
                                        </div>
                                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                                            <TrendingUp size={32} className="text-green-400"/>
                                        </div>
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "75%" }}
                                                transition={{ duration: 1.5, ease: "circOut" }}
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                            ></motion.div>
                                        </div>
                                        <div className="flex justify-between text-sm text-slate-400">
                                            <span>Credit Score</span>
                                            <span className="text-white font-bold">Excellent (850)</span>
                                        </div>
                                    </div>

                                    <div className="mt-12 flex items-center gap-4 pt-8 border-t border-white/10">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-black text-xs">
                                            VIP
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">Prioritas Utama</p>
                                            <p className="text-slate-400 text-xs">Bunga spesial 0.9%</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION (Minimalist & Strong) --- */}
            <section className="py-32 relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/landing-bg.jpg" // Pakai gambar background yang sama tapi digelapin banget
                        alt="Background"
                        fill
                        className="object-cover opacity-10 blur-xl"
                    />
                </div>
                
                <div className="container mx-auto px-6 text-center relative z-10">
                    <FadeIn>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Siap Upgrade Finansialmu?</h2>
                        <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto">
                            Bergabunglah dengan ribuan nasabah yang telah mempercayakan impian mereka kepada kami.
                        </p>
                        <Link href="/register">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold text-xl shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] transition-all"
                            >
                                Mulai Pengajuan Gratis
                            </motion.button>
                        </Link>
                    </FadeIn>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <h4 className="text-2xl font-bold text-slate-900">Pinjaman<span className="text-blue-600">App</span></h4>
                            <p className="text-slate-500 mt-2 text-sm">© 2025 PT Finansial Masa Depan.</p>
                        </div>
                        <div className="flex gap-8 text-slate-600 font-medium">
                            <a href="#" className="hover:text-blue-600 transition">Kebijakan Privasi</a>
                            <a href="#" className="hover:text-blue-600 transition">Syarat & Ketentuan</a>
                            <a href="#" className="hover:text-blue-600 transition">Bantuan</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// --- REUSABLE SUB-COMPONENTS (Agar kode bersih) ---

function ProFeatureCard({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) {
    return (
        <FadeIn delay={delay}>
            <motion.div 
                whileHover={{ y: -10 }}
                className="group bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-blue-100 transition-all duration-300 h-full"
            >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
            </motion.div>
        </FadeIn>
    );
}

function ProBenefitItem({ text, delay }: { text: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-5 p-4 rounded-2xl hover:bg-slate-50 transition-colors"
        >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <CheckCircle2 size={18} strokeWidth={3} />
            </div>
            <p className="text-lg text-slate-800 font-bold">{text}</p>
        </motion.div>
    );
}