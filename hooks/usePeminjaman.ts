import { useState, useEffect } from 'react';
import { peminjamanService } from '@/services/peminjaman.service';
import { Peminjaman } from '@/types';

export function usePeminjaman() {
    const [loans, setLoans] = useState<Peminjaman[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMyLoans = async () => {
        try {
            setLoading(true);
            const response = await peminjamanService.getMyLoans();
            setLoans(response.data.data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllLoans = async () => {
        try {
            setLoading(true);
            const response = await peminjamanService.getAll();
            setLoans(response.data.data);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyLoans();
    }, []);

    return {
        loans,
        loading,
        error,
        refetch: fetchMyLoans,
        fetchAll: fetchAllLoans
    };
}
