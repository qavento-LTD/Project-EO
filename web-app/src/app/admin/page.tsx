"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ sales: 0, orders: 0, products: 0, pending: 0, outOfStock: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      // 1. Fetch Orders and Sales
      const { data: ordersData } = await supabase.from('orders').select('*');
      const totalOrders = ordersData?.length || 0;
      const totalSales = ordersData?.reduce((sum, order) => sum + Number(order.total), 0) || 0;
      const pendingOrders = ordersData?.filter(o => o.status === 'pending').length || 0;

      // 2. Fetch Products
      const { data: productsData } = await supabase.from('products').select('*');
      const totalProducts = productsData?.length || 0;
      const outOfStock = productsData?.filter(p => (p.stock || 0) <= 0).length || 0;

      // 3. Fetch Recent Orders
      const { data: recent } = await supabase
        .from('orders')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        sales: totalSales,
        orders: totalOrders,
        products: totalProducts,
        pending: pendingOrders,
        outOfStock: outOfStock
      });
      setRecentOrders(recent || []);
      setLoading(false);
    };

    fetchAdminStats();
  }, []);

  if (loading) {
    return (
        <div className="flex items-center justify-center p-12">
            <i className="fas fa-circle-notch fa-spin text-3xl text-[var(--color-primary)]"></i>
        </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">نظرة عامة</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-bold">إجمالي المبيعات</h3>
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <i className="fas fa-dollar-sign"></i>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.sales.toLocaleString()} ر.س</p>
          <span className="text-green-500 text-sm font-bold flex items-center gap-1 mt-2">
             تحديث مباشر
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-bold">الطلبـات</h3>
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <i className="fas fa-shopping-bag"></i>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.orders}</p>
          <span className="text-blue-500 text-sm font-bold flex items-center gap-1 mt-2">
            {stats.pending} طلبات قيد الانتظار
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-bold">المنتجات</h3>
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <i className="fas fa-box-open"></i>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.products}</p>
          <span className="text-gray-400 text-sm mt-2">
            {stats.outOfStock} منتجات نفدت الكمية
          </span>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">أحدث الطلبات</h2>
          <Link href="/admin/orders" className="text-[var(--color-primary)] font-bold text-sm hover:underline">عرض الكل</Link>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
                <thead>
                    <tr className="bg-gray-50 text-gray-400 text-sm">
                        <th className="p-4 font-bold border-b">رقم الطلب</th>
                        <th className="p-4 font-bold border-b">التاريخ</th>
                        <th className="p-4 font-bold border-b">الإجمالي</th>
                        <th className="p-4 font-bold border-b">الحالة</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="p-12 text-center text-gray-500">لا توجد طلبات حديثة</td>
                        </tr>
                    ) : (
                        recentOrders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 border-b font-bold uppercase text-xs">#{order.id.slice(0, 8)}</td>
                                <td className="p-4 border-b text-sm">{new Date(order.created_at).toLocaleDateString('ar-SA')}</td>
                                <td className="p-4 border-b font-bold text-[var(--color-primary)]">{order.total} ر.س</td>
                                <td className="p-4 border-b">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                        order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                    }`}>
                                        {order.status === 'pending' ? 'قيد الانتظار' : order.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
