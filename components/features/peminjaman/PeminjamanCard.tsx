'use client';
import { Peminjaman } from '@/types';

interface PeminjamanCardProps {
    loan: Peminjaman;
    onClick?: () => void;
}

export default function PeminjamanCard({ loan, onClick }: PeminjamanCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'disetujui': return 'bg-green-100 text-green-800';
            case 'ditolak': return 'bg-red-100 text-red-800';
            case 'selesai': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'pending': return 'Menunggu';
            case 'disetujui': return 'Disetujui';
            case 'ditolak': return 'Ditolak';
            case 'selesai': return 'Selesai';
            default: return status;
        }
    };

    return (
        <div 
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
            onClick={onClick}
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold">Pinjaman #{loan.id}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(loan.status)}`}>
                    {getStatusText(loan.status)}
                </span>
            </div>
            
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Nominal:</span>
                    <span className="font-semibold text-blue-600">
                        Rp {parseInt(loan.nominal).toLocaleString('id-ID')}
                    </span>
                </div>
                
                <div className="flex justify-between">
                    <span className="text-gray-600">Jangka Waktu:</span>
                    <span className="font-medium">{loan.rentang}</span>
                </div>
                
                <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal Pengajuan:</span>
                    <span className="text-sm">{new Date(loan.Waktu).toLocaleDateString('id-ID')}</span>
                </div>

                {loan.user && (
                    <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-600">Peminjam:</span>
                        <span className="font-medium">{loan.user.name}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
