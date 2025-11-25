'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';
import { authService } from '@/services/auth.service';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const checkAuth = async () => {
        const token = authService.getToken();
        
        if (!token) {
            setUser(null);
            return;
        }

        try {
            setLoading(true);
            const response = await authService.getUser();
            setUser(response.data);
        } catch (error) {
            setUser(null);
            localStorage.removeItem('auth_token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const response = await authService.login({ email, password });
        setUser(response.data.user);
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('auth_token');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, setUser, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
