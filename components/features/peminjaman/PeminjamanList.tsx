'use client';
import { Peminjaman } from '@/types';
import PeminjamanCard from './PeminjamanCard';

interface PeminjamanListProps {
    loans: Peminjaman[];
    loading?: boolean;
    emptyMessage?: string;
    onCardClick?: (loan: Peminjaman) => void;
}

export default function PeminjamanList({ 
    loans, 
    loading = false, 
    emptyMessage = 'Belum ada pinjaman',
    onCardClick
}: PeminjamanListProps) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (loans.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-600">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loans.map(loan => (
                <PeminjamanCard
                    key={loan.id}
                    loan={loan}
                    onClick={() => onCardClick && onCardClick(loan)}
                />
            ))}
        </div>
    );
}
