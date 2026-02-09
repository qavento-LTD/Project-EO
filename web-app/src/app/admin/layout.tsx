import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--color-secondary)] text-white p-6 hidden md:block">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">لوحة التحكم</h2>
        </div>
        <nav className="space-y-4">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <i className="fas fa-tachometer-alt w-6 text-center"></i>
            <span>الرئيسية</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <i className="fas fa-box w-6 text-center"></i>
            <span>المنتجات</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
            <i className="fas fa-shopping-cart w-6 text-center"></i>
            <span>الطلبات</span>
          </Link>
          <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors mt-8 text-gray-400 hover:text-white">
            <i className="fas fa-external-link-alt w-6 text-center"></i>
            <span>زيارة الموقع</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
