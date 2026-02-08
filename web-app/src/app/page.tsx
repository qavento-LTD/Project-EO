import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/NewsletterForm";

export default function Home() {
  const categories = [
    { title: "أطقم لانجري", icon: "fa-heart", slug: "lingerie-sets" },
    { title: "ملابس نوم", icon: "fa-moon", slug: "sleepwear" },
    { title: "عرائس", icon: "fa-ring", slug: "bridal" },
    { title: "أرواب", icon: "fa-user-secret", slug: "robes" },
  ];

  const featuredProducts = [
    { id: 1, title: "طقم دانتيل فاخر", price: 299, image: "/assets/images/logo.png" },
    { id: 2, title: "روب حرير طويل", price: 450, image: "/assets/images/logo.png" },
    { id: 3, title: "بيجامة ساتان", price: 320, image: "/assets/images/logo.png" },
    { id: 4, title: "بيبي دول شفاف", price: 180, image: "/assets/images/logo.png" },
  ];

  return (
    <div className="flex flex-col gap-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 bg-fixed bg-cover bg-center z-0" style={{ backgroundImage: "url('/assets/images/hero-bg.jpg')", backgroundColor: "#1a1a1a" }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 space-y-6">
          <h1 className="text-4xl md:text-6xl font-black mb-4 animate-fade-in-up">
            أناقة تليق بجمالك
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
            اكتشفي مجموعتنا الحصرية من اللانجري وملابس النوم الراقية، مصممة لتبرز أنوثتك وجاذبيتك.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-400">
            <Link href="/products" className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full transition-all duration-300 hover:bg-[#b5952f] hover:-translate-y-1 shadow-md inline-flex items-center gap-2 cursor-pointer text-lg px-8 py-4">
              تسوقي الآن <i className="fas fa-arrow-left"></i>
            </Link>
            <Link href="/videos" className="px-6 py-3 border-2 border-white text-white rounded-full transition-all duration-300 hover:bg-white hover:text-[var(--color-primary)] hover:-translate-y-1 inline-flex items-center gap-2 cursor-pointer text-lg px-8 py-4">
              شاهدي العروض <i className="fas fa-play-circle"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Icons */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "fa-shipping-fast", title: "توصيل سري", desc: "تغليف لا يظهر المحتوى" },
            { icon: "fa-gem", title: "خامات فاخرة", desc: "أقمشة ناعمة ومريحة" },
            { icon: "fa-sync-alt", title: "استبدال سهل", desc: "خلال 7 أيام" },
            { icon: "fa-comments", title: "استشارات خاصة", desc: "فريق نسائي للمساعدة" },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm text-center transform hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-secondary)] relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[var(--color-primary)] after:rounded-full">الأقسام الرئيسية</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/products?category=${cat.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-40 bg-[var(--color-secondary)] flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-colors duration-300">
                <i className={`fas ${cat.icon} text-6xl text-white/90 transform group-hover:scale-110 transition-transform duration-300`}></i>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-[var(--color-primary)] transition-colors">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-secondary)] relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-[var(--color-primary)] after:rounded-full">وصل حديثاً</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                {/* Fallback image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                    <i className="fas fa-female text-4xl"></i>
                </div>
                {/* Real Image would go here */}
                {/* <Image src={product.image} alt={product.title} layout="fill" objectFit="cover" /> */}
                <span className="absolute top-3 right-3 bg-[var(--color-accent)] text-white text-xs font-bold px-3 py-1 rounded-full">
                  جديد
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-800">{product.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-primary)] font-bold text-xl">{product.price} ر.س</span>
                  <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[var(--color-primary)] hover:text-white transition-colors flex items-center justify-center">
                    <i className="fas fa-shopping-bag"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/products" className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full transition-all duration-300 hover:bg-[#b5952f] hover:-translate-y-1 shadow-md inline-flex items-center gap-2 cursor-pointer btn-outline border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white">
            عرض كل المجموعة
          </a>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[var(--color-secondary)] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">انضمي لقائمتنا البريدية</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            احصلي على خصم 10% على طلبك الأول، وكوني أول من يعرف عن التشكيلات الجديدة والعروض الخاصة.
          </p>
            <NewsletterForm />
        </div>
      </section>

    </div>
  );
}
