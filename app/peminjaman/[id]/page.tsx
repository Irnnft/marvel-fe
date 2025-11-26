'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { peminjamanService, Payment } from '@/services/peminjaman.service';
import { Peminjaman } from '@/types';
import PembayaranForm from '@/components/features/peminjaman/Pembayaranform';
import PaymentHistory from '@/components/features/peminjaman/PaymentHistory';
import { useAuth } from '@/context/AuthContext';

interface PaymentSummary {
  total_pinjam: number;
  total_bayar: number;
  sisa: number;
}

function PeminjamanDetailContent() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [loan, setLoan] = useState<Peminjaman | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState('');

  const numericId = Number(id);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await peminjamanService.getPayments(numericId);
      setLoan(res.data.loan);
      setPayments(res.data.payments || []);
      setSummary(res.data.summary || null);
    } catch (err: any) {
      console.error('Error fetching loan detail:', err);
      setError(err.response?.data?.message || 'Gagal memuat data pinjaman');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!numericId) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numericId]);

  const handlePay = async (data: { nominal: string; metode?: string; keterangan?: string }) => {
    try {
      setPayLoading(true);
      setError('');

      const res = await peminjamanService.pay(numericId, data);
      setLoan(res.data.loan);
      setSummary(res.data.summary);
      await fetchData();
      alert('Pembayaran berhasil');
    } catch (err: any) {
      console.error('Error paying loan:', err);
      setError(err.response?.data?.message || 'Gagal melakukan pembayaran');
    } finally {
      setPayLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data pinjaman...</p>
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">Pinjaman tidak ditemukan.</p>
          <button
            onClick={() => router.push('/peminjaman')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Kembali ke Pinjaman Saya
          </button>
        </div>
      </div>
    );
  }

  const totalPinjam = parseInt(loan.nominal, 10) || 0;
  const sisa = summary?.sisa ?? totalPinjam;
  const bolehBayar =
    user?.role === 'customer' && loan.status !== 'selesai' && sisa > 0;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Detail Pinjaman</h1>
          <Link
            href="/peminjaman"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Kembali
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Info Pinjaman */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Informasi Pinjaman</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Nominal Pinjaman</p>
              <p className="font-semibold">
                Rp {totalPinjam.toLocaleString('id-ID')}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Jangka Waktu</p>
              <p className="font-semibold">{loan.rentang}</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-semibold capitalize">{loan.status}</p>
            </div>
            <div>
              <p className="text-gray-500">Tanggal Pengajuan</p>
              <p className="font-semibold">
                {loan.created_at
                  ? new Date(loan.created_at).toLocaleDateString('id-ID')
                  : '-'}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total Dibayar</p>
              <p className="font-semibold">
                Rp {(summary?.total_bayar ?? 0).toLocaleString('id-ID')}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Sisa Hutang</p>
              <p className="font-semibold text-red-600">
                Rp {sisa.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        {/* Form Pembayaran */}
        {bolehBayar && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Bayar Pinjaman</h2>
            <PembayaranForm
              sisa={sisa}
              loading={payLoading}
              error={error}
              onSubmit={handlePay}
            />
          </div>
        )}

        {/* Histori Pembayaran */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Histori Pembayaran</h2>
          <PaymentHistory payments={payments} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default function PeminjamanDetailPage() {
  return (
    <ProtectedRoute allowedRoles={['customer', 'admin', 'owner']}>
      <PeminjamanDetailContent />
    </ProtectedRoute>
  );
}
