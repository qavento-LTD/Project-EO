import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

// Mock Data (same as listing for simplicity)
const ALL_PRODUCTS = [
  { id: 1, title: "طقم دانتيل فاخر أسود", price: 299, category: "lingerie-sets", image: "/assets/images/logo.png", description: "طقم لانجري فاخر مكون من حمالة صدر وسروال داخلي، مصنوع من أجود أنواع الدانتيل الفرنسي الناعم. يتميز بتصميم عصري يبرز جمالك وأنوثتك.", features: ["دانتيل فرنسي فاخر", "حمالات قابلة للتعديل", "متوفر بمقاسات متعددة", "يغسل يدوياً"] },
  { id: 2, title: "روب حرير طويل وردي", price: 450, category: "robes", image: "/assets/images/logo.png", description: "روب طويل من الحرير الطبيعي الناعم، مثالي للاسترخاء في المنزل بلمسة من الفخامة.", features: ["حرير طبيعي 100%", "حزام خصر خارجي", "أكمام واسعة ومريحة"] },
  { id: 3, title: "بيجامة ساتان قطعتين", price: 320, category: "sleepwear", image: "/assets/images/logo.png", description: "طقم بيجامة ساتان ناعم وعملي، يوفر لك الراحة التامة أثناء النوم.", features: ["ساتان عالي الجودة", "قصة مريحة وعملية", "خفيف الوزن وبارد"] },
];

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === parseInt(id));

  // If mock data limited, just show product 1 details or 404
  const displayProduct = product || ALL_PRODUCTS[0]; 

  if (!displayProduct) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8">
        <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-[var(--color-primary)]">الرئيسية</Link></li>
            <li><i className="fas fa-chevron-left text-xs"></i></li>
            <li><Link href="/products" className="hover:text-[var(--color-primary)]">المنتجات</Link></li>
            <li><i className="fas fa-chevron-left text-xs"></i></li>
            <li className="text-gray-800 font-medium">{displayProduct.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative shadow-sm border border-gray-100">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                     <i className="fas fa-gift text-6xl"></i>
                </div>
                 {/* <Image src={displayProduct.image} layout="fill" objectFit="cover" /> */}
                 <div className="absolute top-4 left-4">
                    <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                        <i className="far fa-heart"></i>
                    </button>
                 </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
                {[1, 2, 3, 4].map((i) => (
                    <button key={i} className="w-20 h-20 bg-gray-50 rounded-lg border-2 border-transparent hover:border-[var(--color-primary)] transition-all flex-shrink-0 flex items-center justify-center">
                         <i className="fas fa-image text-gray-300"></i>
                    </button>
                ))}
            </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)]">{displayProduct.title}</h1>
            
            <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-[var(--color-primary)]">{displayProduct.price} ر.س</span>
                {/* <span className="text-gray-400 line-through text-lg">350 ر.س</span> */}
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">متوفر في المخزون</span>
            </div>

            <div className="text-yellow-400 flex items-center gap-1 text-sm">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
                <span className="text-gray-500 mr-2">(124 تقييم)</span>
            </div>

            <p className="text-gray-500 leading-relaxed text-lg">
                {displayProduct.description || "وصف المنتج الافتراضي. هذا المنتج يتميز بجودة عالية وتصميم فريد يجعله الخيار الأمثل للإهداء في المناسبات الخاصة."}
            </p>

            {/* Features */}
            {displayProduct.features && (
                <ul className="space-y-2">
                    {displayProduct.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                            <i className="fas fa-check-circle text-green-500"></i> {feature}
                        </li>
                    ))}
                </ul>
            )}

            {/* Actions */}
            <hr className="border-gray-100 my-6" />
            
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-700">الكمية:</span>
                    <div className="flex items-center border border-gray-200 rounded-full">
                        <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)]">-</button>
                        <span className="w-8 text-center font-bold">1</span>
                        <button className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)]">+</button>
                    </div>
                </div>

                <div className="flex gap-4">
                    <AddToCartButton product={displayProduct} />
                    <button className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all">
                        <i className="fas fa-share-alt"></i>
                    </button>
                </div>
                
                <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2 mt-4">
                    <i className="fas fa-shield-alt text-green-500"></i> ضمان استرجاع مجاني خلال 14 يوم
                </p>
            </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-secondary)] relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[var(--color-primary)] after:rounded-full">منتجات مشابهة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {ALL_PRODUCTS.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group block">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all">
                        <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center text-gray-300">
                            <i className="fas fa-gift text-3xl"></i>
                        </div>
                        <h3 className="font-bold text-gray-800 line-clamp-1 group-hover:text-[var(--color-primary)]">{p.title}</h3>
                        <p className="text-[var(--color-primary)] font-bold">{p.price} ر.س</p>
                    </div>
                </Link>
            ))}
        </div>
      </div>

    </div>
  );
}
