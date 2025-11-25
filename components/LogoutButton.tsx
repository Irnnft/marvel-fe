'use client';

import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      router.push('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
    >
      Logout
    </button>
  );
}
