"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/services/auth.service";
import Profile from "@/components/Profile";
import LogoutButton from "@/components/LogoutButton";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const me = await getMe();
        setUser(me);
      } catch (err) {
        router.push("/login");
      }
    }
    load();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <Profile user={user} />
      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
}
