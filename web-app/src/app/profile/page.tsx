"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, orders, settings
  
  // Stats State
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [orders, setOrders] = useState<any[]>([]);

  // Settings State
  const [fullName, setFullName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      setFullName(user.user_metadata?.full_name || "");
      
      // Fetch Real Data
      fetchOrderData(user.id);
    };
    
    const fetchOrderData = async (userId: string) => {
        const { data: ordersData, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (ordersData) {
            setOrders(ordersData);
            const total = ordersData.length;
            const completed = ordersData.filter(o => o.status === 'delivered' || o.status === 'completed').length; // Handle both if used
            const pending = ordersData.filter(o => o.status === 'pending').length;
            setStats({ total, completed, pending });
        }
        setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage(null);

    try {
        const updates: any = {
            data: { full_name: fullName }
        };

        if (newPassword) {
            updates.password = newPassword;
        }

        const { error } = await supabase.auth.updateUser(updates);

        if (error) throw error;
        setMessage({ type: 'success', text: 'تم تحديث الملف الشخصي بنجاح' });
        setNewPassword("");
    } catch (err: any) {
        setMessage({ type: 'error', text: err.message });
    } finally {
        setUpdating(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <i className="fas fa-circle-notch fa-spin text-4xl text-[var(--color-primary)]"></i>
        </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Info */}
        <aside className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center sticky top-24">
                <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-300 text-4xl overflow-hidden">
                    <i className="fas fa-user"></i>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">{user.user_metadata?.full_name || user.email?.split('@')[0]}</h2>
                <p className="text-gray-500 text-sm mb-4">{user.email}</p>
                
                <hr className="my-4 border-gray-100" />
                
                <nav className="text-right space-y-2">
                    <button 
                        onClick={() => setActiveTab("dashboard")}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <i className="fas fa-tachometer-alt w-6 text-center"></i>
                        <span>لوحة التحكم</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab("orders")}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <i className="fas fa-box-open w-6 text-center"></i>
                        <span>طلباتي</span>
                    </button>
                    <button 
                         onClick={() => setActiveTab("settings")}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <i className="fas fa-cog w-6 text-center"></i>
                        <span>الإعدادات</span>
                    </button>
                    <button 
                        onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors mt-4"
                    >
                        <i className="fas fa-sign-out-alt w-6 text-center"></i>
                        <span>تسجيل الخروج</span>
                    </button>
                </nav>
            </div>
        </aside>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 space-y-6">
            
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                                <i className="fas fa-box"></i>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm">إجمالي الطلبات</h3>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm">المكتملة</h3>
                                <p className="text-2xl font-bold">{stats.completed}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm">قيد الانتظار</h3>
                                <p className="text-2xl font-bold">{stats.pending}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <i className="fas fa-info-circle text-[var(--color-primary)]"></i>
                            معلومات الحساب
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">الاسم</label>
                                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                                    {user.user_metadata?.full_name || 'غير محدد'}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
                                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                     <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                         <i className="fas fa-history text-[var(--color-primary)]"></i>
                         سجل الطلبات
                     </h3>
                     <div className="space-y-4">
                        {orders.length === 0 ? (
                            <p className="text-center text-gray-400 py-8">لا توجد طلبات سابقة</p>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="border rounded-xl p-4 hover:border-[var(--color-primary)] transition-colors cursor-pointer group">
                                    <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-dashed">
                                        <div>
                                            <span className="font-bold text-gray-800 uppercase text-xs">#{order.id.slice(0, 8)}</span>
                                            <span className="mx-2 text-gray-300">|</span>
                                            <span className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString('ar-SA')}</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            order.status === 'delivered' || order.status === 'completed' ? 'bg-green-100 text-green-600' : 
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {order.status === 'pending' ? 'قيد الانتظار' : order.status === 'delivered' ? 'مكتمل' : order.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-600 text-sm">الإجمالي:</span>
                                            <span className="font-bold text-[var(--color-primary)]">{order.total} ر.س</span>
                                        </div>
                                        <button className="text-sm text-[var(--color-primary)] font-bold group-hover:underline">عرض التفاصيل</button>
                                    </div>
                                </div>
                            ))
                        )}
                     </div>
                 </div>
            )}
            
            {activeTab === 'dashboard' && (
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <i className="fas fa-history text-[var(--color-primary)]"></i>
                            آخر الطلبات
                        </h3>
                        <button onClick={() => setActiveTab('orders')} className="text-sm text-[var(--color-primary)] hover:underline">عرض الكل</button>
                    </div>
                     <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm">
                                        <i className="fas fa-shopping-bag"></i>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm uppercase">#{order.id.slice(0, 8)}</h4>
                                        <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('ar-SA')}</p>
                                    </div>
                                </div>
                                <span className="text-[var(--color-primary)] font-bold">{order.total} ر.س</span>
                            </div>
                        ))}
                        {orders.length === 0 && <p className="text-center text-gray-400">لا توجد طلبات حديثة</p>}
                     </div>
                 </div>
            )}


            {/* Settings Tab */}
            {activeTab === 'settings' && (
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                     <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                         <i className="fas fa-cog text-[var(--color-primary)]"></i>
                         إعدادات الحساب
                     </h3>
                     
                     {message && (
                        <div className={`p-4 rounded-lg mb-6 flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                            {message.text}
                        </div>
                     )}

                     <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                            <input 
                                type="text" 
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                                placeholder="الاسم الكامل"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                            <input 
                                type="email" 
                                value={user.email}
                                disabled
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-400 mt-1">لا يمكن تغيير البريد الإلكتروني حالياً.</p>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-100">
                            <label className="block text-sm font-bold text-gray-700 mb-2">كلمة المرور الجديدة</label>
                            <input 
                                type="password" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                                placeholder="اتركها فارغة إذا لم ترد التغيير"
                                minLength={6}
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={updating}
                            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-bold hover:bg-[#b5952f] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {updating ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    جاري الحفظ...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-save"></i>
                                    حفظ التغييرات
                                </>
                            )}
                        </button>
                     </form>
                 </div>
            )}

        </div>
      </div>
    </div>
  );
}
