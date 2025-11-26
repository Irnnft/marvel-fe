'use client';
import { useState } from 'react';

interface PembayaranFormProps {
  sisa: number;
  onSubmit: (data: { nominal: string; metode?: string; keterangan?: string }) => Promise<void>;
  loading?: boolean;
  error?: string;
}

export default function PembayaranForm({ sisa, onSubmit, loading = false, error }: PembayaranFormProps) {
  const [nominal, setNominal] = useState('');
  const [metode, setMetode] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [nominalError, setNominalError] = useState('');

  const validate = (): boolean => {
    setNominalError('');

    const raw = nominal.replace(/\D/g, '');
    const parsed = parseInt(raw || '0', 10);

    if (!raw) {
      setNominalError('Nominal wajib diisi');
      return false;
    }

    if (parsed <= 0) {
      setNominalError('Nominal harus lebih dari 0');
      return false;
    }

    if (parsed > sisa) {
      setNominalError('Nominal melebihi sisa hutang');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const raw = nominal.replace(/\D/g, '');
    await onSubmit({
      nominal: raw,
      metode: metode || undefined,
      keterangan: keterangan || undefined
    });

    // reset field setelah sukses (kalau mau)
    setNominal('');
    setKeterangan('');
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, '');
    if (!number) return '';
    return parseInt(number, 10).toLocaleString('id-ID');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded">
        <p className="text-sm text-blue-800">
          Sisa hutang:{' '}
          <span className="font-semibold">
            Rp {sisa.toLocaleString('id-ID')}
          </span>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Nominal Pembayaran <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">Rp</span>
          <input
            type="text"
            value={nominal ? formatCurrency(nominal) : ''}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setNominal(value);
              setNominalError('');
            }}
            placeholder="500.000"
            maxLength={16}
            className={`w-full pl-10 pr-3 py-2 border rounded-md ${
              nominalError ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
            required
          />
        </div>
        {nominalError && <p className="text-red-500 text-xs mt-1">{nominalError}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Metode Pembayaran (opsional)
        </label>
        <input
          type="text"
          value={metode}
          onChange={(e) => setMetode(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Transfer, Cash, dll"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Keterangan (opsional)
        </label>
        <textarea
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={2}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Memproses...' : 'Bayar Sekarang'}
      </button>
    </form>
  );
}
