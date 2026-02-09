"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [trackingResult, setTrackingResult] = useState<{status: string, message: string} | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of tracking logic
    // In real app, query Supabase orders table
    if (orderId.trim() === "") return;

    // Mock response
    setTrackingResult({
      status: "processing",
      message: "طلبك قيد التجهيز حالياً، سيتم شحنه قريباً."
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
      <div className="max-w-xl w-full text-center">
        <div className="w-20 h-20 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          <i className="fas fa-search-location"></i>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-secondary)]">تتبع طلبك</h1>
        <p className="text-gray-600 mb-8">
          أدخل رقم الطلب الذي وصلك في رسالة التأكيد لمعرفة حالة شحنتك الحالية.
        </p>

        <form onSubmit={handleTrack} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="رقم الطلب (مثال: ORD-12345)" 
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all text-center md:text-right"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="px-8 py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-md whitespace-nowrap"
            >
              تتبع الآن
            </button>
          </div>
        </form>

        {trackingResult && (
          <div className="mt-8 bg-blue-50 border border-blue-100 p-6 rounded-xl animate-fade-in-up">
            <h3 className="font-bold text-blue-800 text-lg mb-2">حالة الطلب: {orderId}</h3>
            <p className="text-blue-700">
              {trackingResult.message}
            </p>
            {/* Simple Progress Bar Simulation */}
            <div className="mt-6 relative">
               <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/3 rounded-full"></div>
               </div>
               <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                  <span className="text-blue-600">تم الطلب</span>
                  <span className="text-blue-600">قيد التجهيز</span>
                  <span>تم الشحن</span>
                  <span>تم التوصيل</span>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
