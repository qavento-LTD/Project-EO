"use client";

import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <i className="fas fa-check text-4xl text-green-600"></i>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">تم استلام طلبك بنجاح!</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        شكراً لتسوقك معنا. سيقوم فريقنا بتجهيز طلبك وشحنه في أقرب وقت.
        تم إرسال تفاصيل الطلب إلى بريدك الإلكتروني.
      </p>
      <div className="flex gap-4">
        <Link href="/products" className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            إكمال التسوق
        </Link>
        <Link href="/profile" className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[#b5952f] transition-colors">
            متابعة الطلب
        </Link>
      </div>
    </div>
  );
}
