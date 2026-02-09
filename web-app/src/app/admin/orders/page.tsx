import Link from "next/link";

const ORDERS = [
  { id: "ORD-001", customer: "أحمد محمد", date: "2024-02-15", total: 450, status: "pending" },
  { id: "ORD-002", customer: "سارة علي", date: "2024-02-14", total: 1200, status: "shipped" },
  { id: "ORD-003", customer: "منى أحمد", date: "2024-02-14", total: 320, status: "delivered" },
];

const STATUS_Map: Record<string, { label: string, color: string }> = {
  pending: { label: "قيد الانتظار", color: "bg-yellow-100 text-yellow-700" },
  processing: { label: "جاري التجهيز", color: "bg-blue-100 text-blue-700" },
  shipped: { label: "تم الشحن", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "تم التوصيل", color: "bg-green-100 text-green-700" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-700" },
};

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">إدارة الطلبات</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-100">
            <tr>
              <th className="p-4">رقم الطلب</th>
              <th className="p-4">العميل</th>
              <th className="p-4">التاريخ</th>
              <th className="p-4">الإجمالي</th>
              <th className="p-4">الحالة</th>
              <th className="p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-mono text-gray-600">{order.id}</td>
                <td className="p-4 font-bold text-gray-800">{order.customer}</td>
                <td className="p-4 text-gray-500">{order.date}</td>
                <td className="p-4 font-bold text-[var(--color-primary)]">{order.total} ر.س</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${STATUS_Map[order.status]?.color || 'bg-gray-100'}`}>
                    {STATUS_Map[order.status]?.label || order.status}
                  </span>
                </td>
                <td className="p-4">
                  <Link href={`/admin/orders/${order.id}`} className="text-blue-500 hover:text-blue-700 font-bold text-sm">
                    التفاصيل
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
