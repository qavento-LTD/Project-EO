"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual contact form submission (e.g., to Supabase or email service)
    console.log("Contact form submitted:", formData);
    alert("شكراً لتواصلك معنا! سنقوم بالرد عليك في أقرب وقت.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-[var(--color-secondary)]">اتصل بنا</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        نحن هنا لمساعدتك. إذا كان لديك أي استفسار حول منتجاتنا أو طلبك، لا تتردد في التواصل معنا.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center text-xl shrink-0">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">اتصل بنا</h3>
              <p className="text-gray-600" dir="ltr">+966 50 123 4567</p>
              <p className="text-gray-500 text-sm mt-1">متواجدون يومياً من 9 صباحاً حتى 10 مساءً</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center text-xl shrink-0">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">البريد الإلكتروني</h3>
              <p className="text-gray-600">support@storeName.com</p>
              <p className="text-gray-500 text-sm mt-1">نرد على جميع الرسائل خلال 24 ساعة</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center text-xl shrink-0">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">العنوان</h3>
              <p className="text-gray-600">شارع التحلية، جدة</p>
              <p className="text-gray-600">المملكة العربية السعودية</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">أرسل لنا رسالة</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الموضوع</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
              <textarea 
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
