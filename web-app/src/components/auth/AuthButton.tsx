"use client";

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (_event === 'SIGNED_OUT') {
          router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors flex items-center gap-2"
      >
        <i className="fas fa-user"></i>
        <span>تسجيل الدخول</span>
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 text-sm font-medium hover:text-[var(--color-primary)] transition-colors">
        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
            {/* Show avatar if available, else icon */}
           <i className="fas fa-user"></i>
        </div>
        <span className="max-w-[100px] truncate hidden lg:block">{user.email?.split('@')[0]}</span>
        <i className="fas fa-chevron-down text-xs"></i>
      </button>

      {/* Dropdown */}
      <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)]">
            <i className="fas fa-user-circle w-6"></i>
            حسابي
        </Link>
        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)]">
            <i className="fas fa-box-open w-6"></i>
            طلباتي
        </Link>
        <hr className="my-1 border-gray-100" />
        <button 
            onClick={handleLogout}
            className="w-full text-right px-4 py-2 text-sm text-red-500 hover:bg-red-50"
        >
            <i className="fas fa-sign-out-alt w-6"></i>
            تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
