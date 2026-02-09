"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("تم إنشاء الحساب بنجاح! الرجاء التحقق من بريدك الإلكتروني.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/profile");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--color-secondary)] mb-2">
                {isSignUp ? "إنشاء حساب جديد" : "تسجيل الدخول"}
            </h1>
            <p className="text-gray-500">
                {isSignUp ? "انضمي إلينا واستمتعي بتجربة تسوق فريدة" : "أهلاً بعودتك، اشتاقنا إليك!"}
            </p>
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-center gap-2">
                <i className="fas fa-exclamation-circle"></i>
                {error === "Invalid login credentials" ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : error}
            </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
            <div className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                    placeholder="example@mail.com"
                    required
                />
                <i className="fas fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">كلمة المرور</label>
            <div className="relative">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                    placeholder="••••••••"
                    required
                />
                <i className="fas fa-lock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--color-primary)] text-white rounded-lg font-bold hover:bg-[#b5952f] hover:-translate-y-1 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
                <>
                    <i className="fas fa-spinner fa-spin"></i>
                    جاري المعالجة...
                </>
            ) : (
                isSignUp ? "إنشاء حساب" : "دخول"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            {isSignUp ? "لديك حساب بالفعل؟" : "ليس لديك حساب؟"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[var(--color-primary)] font-bold hover:underline mr-1"
            >
              {isSignUp ? "تسجيل الدخول" : "إنشاء حساب جديد"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
