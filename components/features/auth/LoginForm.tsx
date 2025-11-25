'use client';
import { useState } from 'react';
import { validateEmail } from '@/lib/validation';

interface LoginFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
    loading?: boolean;
    error?: string;
}

export default function LoginForm({ onSubmit, loading = false, error }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
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
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={loading}
                    required
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: '' });
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={loading}
                    required
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Loading...' : 'Login'}
            </button>
        </form>
    );
}
