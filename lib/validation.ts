export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email wajib diisi';
    if (!emailRegex.test(email)) return 'Format email tidak valid';
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) return 'Password wajib diisi';
    if (password.length < 8) return 'Password minimal 8 karakter';
    if (!/[A-Z]/.test(password)) return 'Password harus ada huruf besar';
    if (!/[a-z]/.test(password)) return 'Password harus ada huruf kecil';
    if (!/[0-9]/.test(password)) return 'Password harus ada angka';
    return null;
};

export const validatePasswordConfirmation = (password: string, confirmation: string): string | null => {
    if (password !== confirmation) return 'Konfirmasi password tidak cocok';
    return null;
};

export const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^[0-9]{10,12}$/;
    if (!phone) return 'No HP wajib diisi';
    if (!phoneRegex.test(phone)) return 'No HP harus 10-12 digit angka';
    return null;
};

export const validateNIK = (nik: string): string | null => {
    const nikRegex = /^[0-9]{16}$/;
    if (!nik) return 'NIK wajib diisi';
    if (!nikRegex.test(nik)) return 'NIK harus 16 digit';
    return null;
};

export const validateUsername = (username: string): string | null => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!username) return 'Username wajib diisi';
    if (!usernameRegex.test(username)) return 'Username 3-20 karakter (huruf, angka, underscore)';
    return null;
};
