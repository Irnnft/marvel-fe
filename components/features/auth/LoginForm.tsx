'use client';
import { useState } from 'react';
import { validateEmail } from '@/lib/validation';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'; // ✅ Tambah Eye, EyeOff

interface LoginFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
    loading?: boolean;
    error?: string;
}

export default function LoginForm({ onSubmit, loading = false, error }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // ✅ State buat intip password
    const [showPassword, setShowPassword] = useState(false);
    
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateForm = (): boolean => {
        const emailError = validateEmail(email);
        const passwordError = password ? null : 'Password wajib diisi';

        setErrors({
            email: emailError || '',
            password: passwordError || ''
        });

        return !emailError && !passwordError;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        await onSubmit(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2 animate-pulse">
                    <AlertCircle size={18} />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({ ...errors, email: '' });
                    }}
                    onBlur={() => {
                        const err = validateEmail(email);
                        setErrors({ ...errors, email: err || '' });
                    }}
                    className={`w-full bg-white/5 border text-white rounded-xl px-4 py-3 outline-none focus:ring-1 transition-all placeholder:text-slate-500
                        ${errors.email 
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                            : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500'
                        }`}
                    placeholder="nama@email.com"
                    disabled={loading}
                />
                {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                <div className="relative">
                    <input
                        // ✅ Logika ganti tipe text/password
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({ ...errors, password: '' });
                        }}
                        className={`w-full bg-white/5 border text-white rounded-xl px-4 py-3 outline-none focus:ring-1 transition-all placeholder:text-slate-500 pr-12
                            ${errors.password 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                : 'border-white/10 focus:border-indigo-500 focus:ring-indigo-500'
                            }`}
                        placeholder="••••••••"
                        disabled={loading}
                    />
                    {/* ✅ Tombol Mata */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs ml-1">{errors.password}</p>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
                {loading ? (
                    <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>Memproses...</span>
                    </>
                ) : (
                    "Masuk ke Akun"
                )}
            </button>
        </form>
    );
}