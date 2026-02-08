import Link from "next/link";

const VIDEOS = [
  { id: 1, title: "كيفية تنسيق باقة الهدايا", thumbnail: "/assets/images/logo.png", duration: "3:45" },
  { id: 2, title: "أفضل الهدايا لعام 2024", thumbnail: "/assets/images/logo.png", duration: "5:20" },
  { id: 3, title: "تغليف الهدايا باحترافية", thumbnail: "/assets/images/logo.png", duration: "4:10" },
  { id: 4, title: "جولة في متجرنا", thumbnail: "/assets/images/logo.png", duration: "2:30" },
  { id: 5, title: "آراء العملاء", thumbnail: "/assets/images/logo.png", duration: "1:50" },
  { id: 6, title: "هدايا عيد الزواج", thumbnail: "/assets/images/logo.png", duration: "6:15" },
];

export default function VideosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-secondary)]">مكتبة الفيديوهات</h1>
        <p className="text-gray-500">شاهد أحدث العروض، ومراجعات المنتجات، ونصائح اختيار الهدايا</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {VIDEOS.map((video) => (
          <div key={video.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
            <div className="relative aspect-video bg-gray-900 group-hover:opacity-90 transition-opacity">
              {/* Thumbnail Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                <i className="fas fa-play-circle text-6xl text-white/80 group-hover:scale-110 transition-transform duration-300"></i>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-[var(--color-primary)] transition-colors">
                {video.title}
              </h3>
              <div className="flex justify-between items-center text-gray-400 text-sm mt-3">
                <span><i className="far fa-clock"></i> قبل يومين</span>
                <span><i className="far fa-eye"></i> 1.2k مشاهدة</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
