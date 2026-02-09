"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<any[]>([]);

  const currentCategory = searchParams.get("category") || "all";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

  useEffect(() => {
    const fetchCategories = async () => {
        const { data } = await supabase.from('categories').select('*');
        if (data) {
            setCategories([{ id: "all", name: "الكل", slug: "all" }, ...data]);
        }
    };
    fetchCategories();
  }, []);

  // Debounce price update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (minPrice !== currentMinPrice || maxPrice !== currentMaxPrice) {
        createQueryString("price", `${minPrice}-${maxPrice}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice]);


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (name === "category") {
         if (value === "all") {
             params.delete("category");
         } else {
             params.set("category", value);
         }
      } else if (name === "price") {
          const [min, max] = value.split("-");
          if (min) params.set("minPrice", min); else params.delete("minPrice");
          if (max) params.set("maxPrice", max); else params.delete("maxPrice");
      }

      router.push(pathname + "?" + params.toString(), { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
      
      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4 border-b pb-2 flex items-center justify-between">
          <span>الأقسام</span>
          <i className="fas fa-tags text-gray-300 text-sm"></i>
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => createQueryString("category", cat.slug)}
                className={`w-full text-right px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                  currentCategory === cat.slug || (currentCategory === "all" && cat.slug === "all")
                    ? "bg-[var(--color-primary)] text-white font-bold shadow-md transform scale-105"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[var(--color-primary)]"
                }`}
              >
                <span>{cat.name}</span>
                {(currentCategory === cat.slug || (currentCategory === "all" && cat.slug === "all")) && <i className="fas fa-check text-xs"></i>}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-bold text-lg mb-4 border-b pb-2 flex items-center justify-between">
            <span>السعر</span>
            <i className="fas fa-coins text-gray-300 text-sm"></i>
        </h3>
        <div className="flex items-center gap-2 mb-4">
            <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">من</span>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                    className="w-full pl-3 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                />
            </div>
            <span className="text-gray-400">-</span>
            <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">إلى</span>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="1000"
                    className="w-full pl-3 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                />
            </div>
        </div>
        
        {/* Reset Filter Button */}
        {(currentCategory !== "all" || currentMinPrice || currentMaxPrice) && (
            <button 
                onClick={() => router.push("/products")}
                className="w-full py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
            >
                <i className="fas fa-times"></i>
                <span>مسح الفلتر</span>
            </button>
        )}
      </div>

    </div>
  );
}
