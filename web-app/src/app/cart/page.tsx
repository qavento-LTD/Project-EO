"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
             <i className="fas fa-shopping-basket text-4xl"></i>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-[var(--color-secondary)]">سلة التسوق فارغة</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          يبدو أنك لم تقم بإضافة أي منتجات للسلة بعد. تصفح منتجاتنا واختر أجمل الهدايا.
        </p>
        <Link href="/products" className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full transition-all duration-300 hover:bg-[#b5952f] hover:-translate-y-1 shadow-md inline-flex items-center gap-2 cursor-pointer px-8">
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-[var(--color-secondary)]">سلة الشراء</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 sm:items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 flex-shrink-0">
                {/* <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" /> */}
                <i className="fas fa-gift text-3xl"></i>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-[var(--color-primary)] font-bold">{item.price} ر.س</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                 <div className="flex items-center border border-gray-200 rounded-lg">
                    <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)]"
                    >
                        -
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)]"
                    >
                        +
                    </button>
                 </div>
                 <span className="font-bold text-gray-800 min-w-[80px] text-center">
                    {(item.price * item.quantity).toFixed(2)} ر.س
                 </span>
                 <button 
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                 >
                    <i className="fas fa-trash-alt"></i>
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold mb-6 border-b pb-4">ملخص الطلب</h2>
                
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                        <span>المجموع الفرعي</span>
                        <span>{cartTotal} ر.س</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>الشحن</span>
                        <span className="text-green-600">مجاني</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-4 border-t">
                        <span>الإجمالي</span>
                        <span className="text-[var(--color-primary)]">{cartTotal} ر.س</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full transition-all duration-300 hover:bg-[#b5952f] hover:-translate-y-1 shadow-md inline-flex items-center gap-2 cursor-pointer w-full justify-center py-3 text-lg">
                        إتمام الطلب
                    </button>
                    <p className="text-xs text-center text-gray-400">
                        <i className="fas fa-lock ml-1"></i> معلومات الدفع مشفرة وآمنة
                    </p>
                </div>

                <div className="mt-6 flex justify-center gap-4 text-2xl text-gray-300">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-apple-pay"></i>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
