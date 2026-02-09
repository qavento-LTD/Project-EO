"use client";

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod, card
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        setFormData(prev => ({
          ...prev,
          fullName: user.user_metadata?.full_name || "",
          email: user.email || ""
        }));
      }
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Create Order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id || null, // Optional if guest
          total: cartTotal,
          status: 'pending',
          payment_method: paymentMethod,
          shipping_address: formData
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create Order Items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Success
      clearCart();
      router.push("/order-success");
      
    } catch (err: any) {
      console.error("Order error:", err);
      setError(err.message || "حدث خطأ أثناء إتمام الطلب");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <i className="fas fa-shopping-basket text-6xl text-gray-200 mb-4"></i>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">سلة الشراء فارغة</h1>
            <p className="text-gray-500 mb-8">أضف بعض المنتجات المميزة لنقوم بشحنها إليك</p>
            <Link href="/products" className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[#b5952f] transition-colors">
                تصفح المنتجات
            </Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--color-secondary)] mb-8 text-center">إتمام الطلب</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Shipping & Payment Form */}
        <div className="w-full lg:w-2/3">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
                
                {/* Shipping Details */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-2">
                        <i className="fas fa-map-marker-alt text-[var(--color-primary)]"></i>
                        عنوان الشحن
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
                            <input 
                                type="text" 
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
                            <input 
                                type="email" 
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">رقم الجوال</label>
                            <input 
                                type="tel" 
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] text-right"
                                placeholder="05xxxxxxxx"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">العنوان</label>
                            <input 
                                type="text" 
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                                placeholder="الحي، الشارع، رقم المنزل"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">المدينة</label>
                            <input 
                                type="text" 
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">الرمز البريدي (اختياري)</label>
                            <input 
                                type="text" 
                                name="zip"
                                value={formData.zip}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-2">
                        <i className="fas fa-credit-card text-[var(--color-primary)]"></i>
                        طريقة الدفع
                    </h2>
                    <div className="space-y-3">
                        <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input 
                                type="radio" 
                                name="payment" 
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={() => setPaymentMethod("cod")}
                                className="w-5 h-5 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            />
                            <div className="flex-1">
                                <span className="font-bold text-gray-800 block">الدفع عند الاستلام</span>
                                <span className="text-sm text-gray-500">ادفع نقداً عند استلام طلبك</span>
                            </div>
                            <i className="fas fa-money-bill-wave text-2xl text-gray-400"></i>
                        </label>

                        <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input 
                                type="radio" 
                                name="payment" 
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={() => setPaymentMethod("card")}
                                className="w-5 h-5 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            />
                            <div className="flex-1">
                                <span className="font-bold text-gray-800 block">بطاقة مدى / ائتمانية</span>
                                <span className="text-sm text-gray-500">ادفع بأمان عبر البطاقة</span>
                            </div>
                            <div className="flex gap-2 text-2xl text-gray-400">
                                <i className="fab fa-cc-visa"></i>
                                <i className="fab fa-cc-mastercard"></i>
                            </div>
                        </label>
                        
                        {/* Mock Card Form if Card selected */}
                        {paymentMethod === 'card' && (
                             <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fade-in-up">
                                 <div className="grid grid-cols-2 gap-4">
                                     <div className="col-span-2">
                                         <label className="text-xs font-bold text-gray-600 block mb-1">رقم البطاقة</label>
                                         <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-3 py-2 rounded border focus:outline-none focus:border-[var(--color-primary)]" />
                                     </div>
                                     <div>
                                         <label className="text-xs font-bold text-gray-600 block mb-1">تاريخ الانتهاء</label>
                                         <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 rounded border focus:outline-none focus:border-[var(--color-primary)]" />
                                     </div>
                                     <div>
                                         <label className="text-xs font-bold text-gray-600 block mb-1">رمز التحقق (CVC)</label>
                                         <input type="text" placeholder="123" className="w-full px-3 py-2 rounded border focus:outline-none focus:border-[var(--color-primary)]" />
                                     </div>
                                 </div>
                             </div>
                        )}

                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-[var(--color-primary)] text-white text-lg font-bold rounded-xl hover:bg-[#b5952f] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            جاري التنفيذ...
                        </>
                    ) : (
                        <>
                            <span>تأكيد الطلب</span>
                            <i className="fas fa-check-circle"></i>
                        </>
                    )}
                </button>

            </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <h3 className="font-bold text-lg mb-4 border-b pb-2">ملخص الطلب</h3>
                <div className="space-y-4 max-h-80 overflow-y-auto mb-4 custom-scrollbar">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                                <i className="fas fa-gift text-gray-300 text-xl"></i>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold line-clamp-2">{item.title}</h4>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">الكمية: {item.quantity}</span>
                                    <span className="text-sm font-bold text-[var(--color-primary)]">{item.price * item.quantity} ر.س</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                        <span>المجموع الفرعي</span>
                        <span>{cartTotal} ر.س</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>الشحن</span>
                        <span className="text-green-600 font-bold">مجاني</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2 border-t mt-2">
                        <span>الإجمالي</span>
                        <span className="text-[var(--color-primary)]">{cartTotal} ر.س</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
