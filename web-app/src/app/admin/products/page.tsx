import Link from "next/link";
import Image from "next/image";

// Mock Data - In real implementation, fetch from Supabase
const PRODUCTS = [
  { id: 1, title: "طقم دانتيل فاخر أسود", price: 299, category: "lingerie-sets", stock: 50, image: "/assets/images/logo.png" },
  { id: 2, title: "روب حرير طويل وردي", price: 450, category: "robes", stock: 30, image: "/assets/images/logo.png" },
  { id: 3, title: "بيجامة ساتان قطعتين", price: 320, category: "sleepwear", stock: 40, image: "/assets/images/logo.png" },
];

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">إدارة المنتجات</h1>
        <Link href="/admin/products/new" className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2">
          <i className="fas fa-plus"></i> إضافة منتج جديد
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-100">
            <tr>
              <th className="p-4">الصورة</th>
              <th className="p-4">اسم المنتج</th>
              <th className="p-4">القسم</th>
              <th className="p-4">السعر</th>
              <th className="p-4">المخزون</th>
              <th className="p-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {PRODUCTS.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden relative">
                     {/* Fallback for Image */}
                     <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <i className="fas fa-image"></i>
                     </div>
                  </div>
                </td>
                <td className="p-4 font-bold text-gray-800">{product.title}</td>
                <td className="p-4 text-gray-600">{product.category}</td>
                <td className="p-4 text-[var(--color-primary)] font-bold">{product.price} ر.س</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock > 10 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {product.stock > 10 ? 'متوفر' : 'منخفض'} ({product.stock})
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded transition-colors"><i className="fas fa-edit"></i></button>
                    <button className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"><i className="fas fa-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
