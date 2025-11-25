'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ('admin' | 'owner' | 'customer')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, loading, checkAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // ✅ Check auth on mount
        if (!user && !loading) {
            checkAuth();
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/login');
                return;
            }

            if (allowedRoles && !allowedRoles.includes(user.role)) {
                router.push('/dashboard');
            }
        }
    }, [user, loading, router, allowedRoles]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
