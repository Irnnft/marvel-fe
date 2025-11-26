'use client';

import { User } from '@/types';

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
      <h2 className="text-xl font-bold mb-4">Profil Saya</h2>
      <p><span className="font-semibold">Nama:</span> {user.name}</p>
      <p><span className="font-semibold">Username:</span> {user.username}</p>
      <p><span className="font-semibold">Email:</span> {user.email}</p>
      <p><span className="font-semibold">Role:</span> {user.role}</p>
      {user.no_hp && (
        <p><span className="font-semibold">No HP:</span> {user.no_hp}</p>
      )}
    </div>
  );
}
