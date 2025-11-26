'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PeminjamanForm from '@/components/features/peminjaman/PeminjamanForm';
import { peminjamanService } from '@/services/peminjaman.service';
import { PeminjamanFormData } from '@/types';

export default function CreatePeminjamanPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'customer') {
      alert('Admin dan Owner tidak bisa mengajukan pinjaman');
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (data: PeminjamanFormData) => {
    try {
      await peminjamanService.create(data);
      alert('Pengajuan pinjaman berhasil!');
      router.push('/peminjaman');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Gagal mengajukan pinjaman');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Ajukan Pinjaman</h1>
        <PeminjamanForm
          onSubmit={handleSubmit}
          loading={false}
          error={''}
          onCancel={() => router.push('/peminjaman')}
        />
      </div>
    </div>
  );
}
