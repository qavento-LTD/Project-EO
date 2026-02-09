import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[var(--color-secondary)] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <img 
                src="/assets/images/logo.png" 
                alt="هديتي" 
                className="h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-gray-300 leading-relaxed max-w-sm" data-store-description>
              نصنع الذكريات الجميلة من خلال هدايا مميزة تلامس القلوب. جودة عالية وخدمة راقية تليق بكم.
            </p>
            <div className="flex gap-4">
              {/* Social Links - URLs can be dynamic later */}
              {['facebook', 'instagram', 'twitter', 'whatsapp', 'tiktok'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  data-social={social}
                  aria-label={social}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-primary)] flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-[var(--color-primary)] after:rounded-full">
              روابط سريعة
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/products" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
                  <i className="fas fa-angle-left text-xs"></i> المنتجات
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
                  <i className="fas fa-angle-left text-xs"></i> الأقسام
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
                  <i className="fas fa-angle-left text-xs"></i> الفيديوهات
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
                  <i className="fas fa-angle-left text-xs"></i> من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
                  <i className="fas fa-angle-left text-xs"></i> اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-[var(--color-primary)] after:rounded-full">
              تواصل معنا
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope mt-1 text-[var(--color-primary)]"></i>
                <a href="mailto:info@hadyti.com" className="hover:text-white transition-colors" data-store-email>
                  info@hadyti.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-phone mt-1 text-[var(--color-primary)]"></i>
                <a href="tel:+966501234567" className="hover:text-white transition-colors" data-store-phone>
                  +966 50 123 4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1 text-[var(--color-primary)]"></i>
                <span>المملكة العربية السعودية</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center gap-2">
            <span>&copy; {currentYear}</span>
            <img src="/assets/images/logo.png" alt="هديتي" className="h-6 w-auto object-contain brightness-0 invert" />
            <span>. جميع الحقوق محفوظة.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
