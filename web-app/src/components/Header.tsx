"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, isCartOpen, setIsCartOpen, cartItems, removeFromCart, cartTotal } = useCart();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "الرئيسية", icon: "fa-home" },
    { href: "/products", label: "المنتجات", icon: "fa-gifts" },
    { href: "/videos", label: "الفيديوهات", icon: "fa-video" },
    { href: "/track-order", label: "تتبع طلبك", icon: "fa-search-location" },
    { href: "/contact", label: "اتصل بنا", icon: "fa-envelope" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/assets/images/logo.png" 
              alt="هديتي" 
              className="h-10 md:h-12 w-auto object-contain"
              onError={(e) => {
                if (e.currentTarget.parentElement) {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.innerHTML += '<span class="text-2xl font-bold text-primary">هديتي</span>';
                }
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 text-sm lg:text-base font-medium transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[var(--color-primary)] bg-amber-50 rounded-full px-4 py-2"
                    : "text-[var(--color-text-dark)] hover:text-[var(--color-primary)]"
                }`}
              >
                <i className={`fas ${link.icon}`}></i>
                <span>{link.label}</span>
              </Link>
            ))}
            <Link
              href="/support-chat"
              className="flex items-center gap-2 text-sm lg:text-base font-medium text-[var(--color-primary)] hover:text-amber-600 transition-colors"
            >
              <i className="fas fa-headset"></i>
              <span>المساعد الذكي</span>
            </Link>
          </nav>

          {/* Icons & Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="سلة الشراء"
            >
              <i className="fa-solid fa-bag-shopping text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth Wrapper (Placeholder for now) */}
            <div id="auth-section" className="hidden md:block">
              {/* Will be populated by Auth logic */}
              {/* <Link href="/auth/login" className="text-sm font-medium hover:text-primary">تسجيل الدخول</Link> */}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[var(--color-text-dark)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="القائمة"
            >
              <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Cart Dropdown / Drawer */}
        <div
          className={`absolute top-full left-0 w-full md:w-96 bg-white shadow-xl border border-gray-100 rounded-b-xl overflow-hidden transition-all duration-300 origin-top transform ${
            isCartOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-lg">سلة الشراء ({cartCount})</h3>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-shopping-basket text-4xl mb-3 opacity-50 block"></i>
                <p>سلة التسوق فارغة</p>
                <Link 
                  href="/products" 
                  className="mt-4 inline-block text-sm text-[var(--color-primary)] hover:underline"
                  onClick={() => setIsCartOpen(false)}
                >
                  تصفح المنتجات
                </Link>
              </div>
            ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300">
                        {/* <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" /> */}
                        <i className="fas fa-gift text-2xl"></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm line-clamp-1">{item.title}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[var(--color-primary)] font-bold">{item.price} ر.س</span>
                          <span className="text-gray-500 text-xs">الكمية: {item.quantity}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  ))}
                </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between mb-4 font-bold">
                    <span>المجموع:</span>
                    <span>{cartTotal} ر.س</span>
                </div>
                <Link 
                    href="/cart" 
                    className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full transition-all duration-300 hover:bg-[#b5952f] hover:-translate-y-1 shadow-md inline-flex items-center gap-2 cursor-pointer w-full justify-center"
                    onClick={() => setIsCartOpen(false)}
                >
                    إتمام الشراء
                </Link>
            </div>
          )}
        </div>
      </header>
      
      {/* Mobile Navigation Sidebar (Overlay) */}
      <div 
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <span className="font-bold text-lg">القائمة</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-500"
            >
              <i className="fas fa-times"></i>
            </button>
        </div>
        <nav className="p-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-amber-50 text-[var(--color-primary)] font-bold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <i className={`fas ${link.icon} w-6 text-center`}></i>
                <span>{link.label}</span>
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            <Link
              href="/support-chat"
              className="flex items-center gap-3 p-3 rounded-lg text-[var(--color-primary)] hover:bg-amber-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-headset w-6 text-center"></i>
              <span>المساعد الذكي</span>
            </Link>
        </nav>
      </div>
    </>
  );
}
