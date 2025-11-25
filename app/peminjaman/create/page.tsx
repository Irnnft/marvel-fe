'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function CreatePeminjamanPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // ✅ Redirect admin/owner ke dashboard
        if (user && user.role !== 'customer') {
            alert('Admin dan Owner tidak bisa mengajukan pinjaman');
            router.push('/dashboard');
        }
    }, [user, router]);

    // Rest of your create page code...
}
