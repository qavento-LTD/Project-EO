"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email);
    alert("شكراً لاشتراكك في نشرتنا البريدية!");
    setEmail("");
  };

  return (
    <form className="max-w-md mx-auto flex gap-2" onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="أدخل بريدك الإلكتروني" 
        className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white"
        required 
      />
      <button type="submit" className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full transition-all duration-300 hover:bg-[#b5952f] hover:-translate-y-1 shadow-md inline-flex items-center gap-2 cursor-pointer whitespace-nowrap">
        اشتراك
      </button>
    </form>
  );
}
