'use client';
import { useState } from 'react';
import { RegisterData, Bank } from '@/types';
import {
    validateEmail,
    validatePassword,
    validatePasswordConfirmation,
    validatePhone,
    validateNIK,
    validateUsername
} from '@/lib/validation';
import { Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react'; // ✅ Import Mata

interface RegisterFormProps {
    banks: Bank[];
    onSubmit: (data: RegisterData) => Promise<void>;
    loading?: boolean;
    error?: string;
}

export default function RegisterForm({ banks, onSubmit, loading = false, error }: RegisterFormProps) {
    const [formData, setFormData] = useState<RegisterData>({
        name: '', username: '', email: '', password: '', password_confirmation: '',
        no_hp: '', no_hp2: '', nama_no_hp2: '', relasi_no_hp2: '', NIK: '',
        Norek: '', Nama_Ibu: '', Pekerjaan: '', Gaji: '', alamat: '', kode_bank: ''
    });

    // ✅ State Mata (Ada 2, buat password & konfirmasi)
    const [showPw, setShowPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (name: string, value: string): string => {
        switch (name) {
            case 'email': return validateEmail(value) || '';
            case 'password': return validatePassword(value) || '';
            case 'password_confirmation': return validatePasswordConfirmation(formData.password, value) || '';
            case 'username': return validateUsername(value) || '';
            case 'no_hp':
            case 'no_hp2': return validatePhone(value) || '';
            case 'NIK': return validateNIK(value) || '';
            case 'name': return !value ? 'Nama wajib diisi' : '';
            case 'Norek': return !value || value.length < 5 ? 'Nomor rekening minimal 5 digit' : '';
            default: return '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        if (error) setErrors({ ...errors, [name]: error });
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key as keyof RegisterData]);
            if (error) newErrors[key] = error;
        });

        if (!formData.kode_bank) newErrors.kode_bank = 'Bank wajib dipilih';
        if (!formData.nama_no_hp2) newErrors.nama_no_hp2 = 'Nama kontak darurat wajib diisi';
        if (!formData.relasi_no_hp2) newErrors.relasi_no_hp2 = 'Relasi wajib diisi';
        if (!formData.Nama_Ibu) newErrors.Nama_Ibu = 'Nama ibu kandung wajib diisi';
        if (!formData.Pekerjaan) newErrors.Pekerjaan = 'Pekerjaan wajib diisi';
        if (!formData.Gaji) newErrors.Gaji = 'Gaji wajib diisi';
        if (!formData.alamat) newErrors.alamat = 'Alamat wajib diisi';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        await onSubmit(formData);
    };

    const inputClass = (hasError: boolean) => `
        w-full bg-white/5 border text-white rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-500
        ${hasError 
            ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
            : 'border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:border-white/20'
        }
    `;

    const labelClass = "block text-sm font-medium mb-1.5 text-slate-300 ml-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2 animate-pulse">
                    <AlertCircle size={18} />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            <div className="space-y-4">
                <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider border-b border-white/10 pb-2 mb-4">Identitas Diri</h3>
                
                {/* Nama & Username */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Nama Lengkap <span className="text-red-400">*</span></label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={inputClass(!!errors.name)} disabled={loading} placeholder="Sesuai KTP" />
                        {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className={labelClass}>Username <span className="text-red-400">*</span></label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} onBlur={handleBlur} className={inputClass(!!errors.username)} disabled={loading} placeholder="Tanpa spasi" />
                        {errors.username && <p className="text-red-400 text-xs mt-1 ml-1">{errors.username}</p>}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className={labelClass}>Email <span className="text-red-400">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={inputClass(!!errors.email)} disabled={loading} placeholder="nama@email.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>

                {/* Password & Konfirmasi (DENGAN FITUR MATA) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Password <span className="text-red-400">*</span></label>
                        <div className="relative">
                            <input
                                type={showPw ? "text" : "password"} // Toggle tipe
                                name="password"
                                value={formData.password} onChange={handleChange} onBlur={handleBlur}
                                className={`${inputClass(!!errors.password)} pr-12`} // pr-12 biar teks ga nabrak ikon
                                disabled={loading}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
                            >
                                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>}
                    </div>
                    <div>
                        <label className={labelClass}>Konfirmasi Password <span className="text-red-400">*</span></label>
                        <div className="relative">
                            <input
                                type={showConfirmPw ? "text" : "password"} // Toggle tipe
                                name="password_confirmation"
                                value={formData.password_confirmation} onChange={handleChange} onBlur={handleBlur}
                                className={`${inputClass(!!errors.password_confirmation)} pr-12`}
                                disabled={loading}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPw(!showConfirmPw)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
                            >
                                {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password_confirmation && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password_confirmation}</p>}
                    </div>
                </div>
            </div>

            {/* --- SISA FORM (Kontak, Pekerjaan, dll) SAMA SEPERTI SEBELUMNYA --- */}
            {/* Saya ringkas bagian ini biar ga kepanjangan, tapi kamu PASTI COPY BAGIAN ATAS TADI YA. */}
            {/* ... (Isi form lainnya tetap sama, tidak ada perubahan logic/tampilan selain yang password tadi) ... */}
            
            <div className="space-y-4 pt-4">
                <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider border-b border-white/10 pb-2 mb-4">Kontak & Data Pribadi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>No HP (WhatsApp) <span className="text-red-400">*</span></label>
                        <input type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} onBlur={handleBlur} maxLength={13} className={inputClass(!!errors.no_hp)} disabled={loading} placeholder="08xxxxxxxxxx" />
                        {errors.no_hp && <p className="text-red-400 text-xs mt-1 ml-1">{errors.no_hp}</p>}
                    </div>
                    <div>
                        <label className={labelClass}>NIK (16 Digit) <span className="text-red-400">*</span></label>
                        <input type="text" name="NIK" value={formData.NIK} onChange={handleChange} onBlur={handleBlur} maxLength={16} className={inputClass(!!errors.NIK)} disabled={loading} placeholder="35xxxxxxxxxxxxxx" />
                        {errors.NIK && <p className="text-red-400 text-xs mt-1 ml-1">{errors.NIK}</p>}
                    </div>
                </div>
                <div>
                    <label className={labelClass}>Alamat Lengkap <span className="text-red-400">*</span></label>
                    <textarea name="alamat" rows={3} value={formData.alamat} onChange={handleChange} onBlur={handleBlur} className={inputClass(!!errors.alamat)} disabled={loading} placeholder="Nama Jalan, No. Rumah, RT/RW, Kota" />
                    {errors.alamat && <p className="text-red-400 text-xs mt-1 ml-1">{errors.alamat}</p>}
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider border-b border-white/10 pb-2 mb-4">Pekerjaan & Keuangan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Pekerjaan Saat Ini <span className="text-red-400">*</span></label>
                        <input type="text" name="Pekerjaan" value={formData.Pekerjaan} onChange={handleChange} className={inputClass(!!errors.Pekerjaan)} disabled={loading} placeholder="Karyawan Swasta / PNS / Wirausaha" />
                    </div>
                    <div>
                        <label className={labelClass}>Gaji Per Bulan <span className="text-red-400">*</span></label>
                        <input type="number" name="Gaji" value={formData.Gaji} onChange={handleChange} className={inputClass(!!errors.Gaji)} disabled={loading} placeholder="Contoh: 5000000" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Bank Pencairan <span className="text-red-400">*</span></label>
                        <div className="relative">
                            <select name="kode_bank" value={formData.kode_bank} onChange={handleChange} className={`${inputClass(!!errors.kode_bank)} appearance-none bg-[#0F172A]`} disabled={loading || !banks || banks.length === 0}>
                                <option value="">-- Pilih Bank --</option>
                                {banks && banks.map(bank => (<option key={bank.kode_bank} value={bank.kode_bank}>{bank.nama_bank}</option>))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Nomor Rekening <span className="text-red-400">*</span></label>
                        <input type="number" name="Norek" value={formData.Norek} onChange={handleChange} onBlur={handleBlur} className={inputClass(!!errors.Norek)} disabled={loading} placeholder="Nomor rekening valid" />
                        {errors.Norek && <p className="text-red-400 text-xs mt-1 ml-1">{errors.Norek}</p>}
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wider border-b border-white/10 pb-2 mb-4">Kontak Darurat & Keluarga</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>Nama Ibu Kandung <span className="text-red-400">*</span></label>
                        <input type="text" name="Nama_Ibu" value={formData.Nama_Ibu} onChange={handleChange} className={inputClass(!!errors.Nama_Ibu)} disabled={loading} />
                    </div>
                    <div>
                        <label className={labelClass}>Nama Kontak Darurat <span className="text-red-400">*</span></label>
                        <input type="text" name="nama_no_hp2" value={formData.nama_no_hp2} onChange={handleChange} className={inputClass(!!errors.nama_no_hp2)} disabled={loading} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass}>No HP Darurat <span className="text-red-400">*</span></label>
                        <input type="text" name="no_hp2" value={formData.no_hp2} onChange={handleChange} onBlur={handleBlur} maxLength={13} className={inputClass(!!errors.no_hp2)} disabled={loading} />
                    </div>
                    <div>
                        <label className={labelClass}>Relasi Kontak Darurat <span className="text-red-400">*</span></label>
                        <input type="text" name="relasi_no_hp2" value={formData.relasi_no_hp2} onChange={handleChange} className={inputClass(!!errors.relasi_no_hp2)} disabled={loading} placeholder="Orang Tua / Saudara / Pasangan" />
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <button type="submit" disabled={loading || !banks || banks.length === 0} className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.01] active:scale-[0.99]">
                    {loading ? (<><Loader2 size={20} className="animate-spin" /><span>Memproses Pendaftaran...</span></>) : ("Daftar Akun Sekarang")}
                </button>
            </div>
        </form>
    );
}