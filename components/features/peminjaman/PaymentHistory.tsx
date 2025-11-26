'use client';

import { Payment } from '@/services/peminjaman.service';

interface PaymentHistoryProps {
  payments: Payment[];
  loading?: boolean;
}

export default function PaymentHistory({ payments, loading = false }: PaymentHistoryProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        Belum ada pembayaran.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {payments.map(payment => (
        <div
          key={payment.id}
          className="flex justify-between items-start bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
        >
          <div>
            <div className="font-semibold text-sm">
              Rp {parseInt(payment.nominal, 10).toLocaleString('id-ID')}
            </div>
            {payment.metode && (
              <div className="text-xs text-gray-600">
                Metode: {payment.metode}
              </div>
            )}
            {payment.keterangan && (
              <div className="text-xs text-gray-600">
                {payment.keterangan}
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500 text-right">
            {payment.tanggal_bayar
              ? new Date(payment.tanggal_bayar).toLocaleString('id-ID')
              : ''}
          </div>
        </div>
      ))}
    </div>
  );
}
