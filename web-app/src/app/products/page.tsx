import Link from "next/link";
import { Suspense } from "react";

// Mock Data
const ALL_PRODUCTS = [
  { id: 1, title: "طقم دانتيل فاخر أسود", price: 299, category: "lingerie-sets", image: "/assets/images/logo.png" },
  { id: 2, title: "روب حرير طويل وردي", price: 450, category: "robes", image: "/assets/images/logo.png" },
  { id: 3, title: "بيجامة ساتان قطعتين", price: 320, category: "sleepwear", image: "/assets/images/logo.png" },
  { id: 4, title: "بيبي دول أحمر مثير", price: 180, category: "lingerie-sets", image: "/assets/images/logo.png" },
  { id: 5, title: "طقم قطني مريح", price: 150, category: "sleepwear", image: "/assets/images/logo.png" },
  { id: 6, title: "كورسيه لتشكيل الجسم", price: 220, category: "accessories", image: "/assets/images/logo.png" },
  { id: 7, title: "طقم عروس أبيض فاخر", price: 599, category: "bridal", image: "/assets/images/logo.png" },
  { id: 8, title: "جوارب دانتيل", price: 45, category: "accessories", image: "/assets/images/logo.png" },
];

const CATEGORIES = [
  { id: "all", name: "الكل" },
  { id: "lingerie-sets", name: "أطقم لانجري" },
  { id: "sleepwear", name: "ملابس نوم" },
  { id: "robes", name: "أرواب" },
  { id: "bridal", name: "تجهيز العرايس" },
  { id: "accessories", name: "اكسسوارات" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  let products = ALL_PRODUCTS;

  if (category && category !== "all") {
    products = products.filter((p) => p.category === category || category === "all");
  }

  if (q) {
    products = products.filter((p) => p.title.includes(q));
  }

  return (
    <div className="container mx-auto px-4 py-8">
        
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-secondary)]">جميع المنتجات</h1>
        <p className="text-gray-500">تصفح مجموعتنا المميزة من الهدايا الراقية</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">الأقسام</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.id}`}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      category === cat.id || (!category && cat.id === "all")
                        ? "bg-[var(--color-primary)] text-white font-bold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)]"
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <i className="fas fa-search text-gray-300 text-5xl mb-4"></i>
              <p className="text-gray-500 text-lg">لا توجد منتجات مطابقة للبحث</p>
              <Link href="/products" className="text-[var(--color-primary)] mt-2 inline-block hover:underline">
                عرض جميع المنتجات
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-64 bg-gray-50 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-300">
                        <i className="fas fa-gift text-4xl"></i>
                    </div>
                    {/* Placeholder for Image */}
                    {/* <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /> */}
                    
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm">
                        {CATEGORIES.find(c => c.id === product.category)?.name}
                    </div>
                    
                    {/* Quick Action Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-3">
                         <button className="bg-white text-[var(--color-primary)] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                            <i className="fas fa-eye"></i>
                         </button>
                         <button className="bg-white text-[var(--color-primary)] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                            <i className="fas fa-shopping-cart"></i>
                         </button>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                        <Link href={`/products/${product.id}`}>{product.title}</Link>
                    </h3>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-[var(--color-primary)] font-bold text-xl">{product.price} ر.س</span>
                      <div className="text-yellow-400 text-sm">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
