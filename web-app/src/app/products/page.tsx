import Link from "next/link";
import { Suspense } from "react";
import ProductFilter from "@/components/products/ProductFilter";
import { supabase } from "@/lib/supabase";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; minPrice?: string; maxPrice?: string }>;
}) {
  const { category, q, minPrice, maxPrice } = await searchParams;

  // Build Supabase Query
  let query = supabase.from('products').select('*, categories(*)');

  // Filter by Category
  if (category && category !== "all") {
    // If slug is passed, we need to join or find ID. For simplicity, assuming slug-based filter logic or ID.
    // Let's first get categories to match slug to ID if needed, or filter by category slug if schema allows.
    // Based on schema, products has category_id.
    const { data: catData } = await supabase.from('categories').select('id').eq('slug', category).single();
    if (catData) {
      query = query.eq('category_id', catData.id);
    }
  }

  // Filter by Search Query
  if (q) {
    query = query.ilike('title', `%${q}%`);
  }

  // Filter by Price Range
  if (minPrice) {
    query = query.gte('price', parseInt(minPrice));
  }
  if (maxPrice) {
    query = query.lte('price', parseInt(maxPrice));
  }

  const { data: products, error } = await query;
  const { data: categories } = await supabase.from('categories').select('*');

  return (
    <div className="container mx-auto px-4 py-8">
        
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-secondary)]">جميع المنتجات</h1>
        <p className="text-gray-500">تصفح مجموعتنا المميزة من اللانجري وملابس النوم الراقية</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <Suspense fallback={<div>Loading filters...</div>}>
             <ProductFilter />
          </Suspense>
        </aside>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          {!products || products.length === 0 ? (
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
                        <i className="fas fa-female text-4xl"></i>
                    </div>
                    {/* Placeholder for Image */}
                    {/* {product.image_url && <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />} */}
                    
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm">
                        {product.categories?.name}
                    </div>
                    
                    {/* Quick Action Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center gap-3">
                         <Link href={`/products/${product.id}`} className="bg-white text-[var(--color-primary)] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                            <i className="fas fa-eye"></i>
                         </Link>
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
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className={`${i < (product.rating || 5) ? "fas" : "far"} fa-star`}></i>
                        ))}
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

