"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service"; // pastikan nama file & path ini benar
import Profile from "@/components/profile";            // file: components/profile.tsx
import LogoutButton from "@/components/LogoutButton"; // file: components/LogoutButton.tsx
import { User } from "@/types";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await authService.getUser(); // GET /api/user
        if (!isMounted) return;
        setUser(res.data);
      } catch (err) {
        if (!isMounted) return;
        // kalau token invalid / belum login, arahkan ke login
        router.push("/login");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center space-y-3">
          <p className="text-gray-700">Data profil tidak ditemukan.</p>
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Ke Halaman Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>
        <Profile user={user} />
        <div className="mt-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
