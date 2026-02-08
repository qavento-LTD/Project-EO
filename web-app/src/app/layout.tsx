import type { Metadata } from "next";
import "./globals.css";
// import "./legacy.css"; // Commented out to prioritize new styles, can enable if needed for specific legacy components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "متجر الهدايا | هدايا مميزة لكل مناسبة",
  description: "متجر الهدايا - وجهتك الأولى للهدايا المميزة والراقية لكل المناسبات.",
  keywords: "هدايا, متجر هدايا, هدايا زفاف, هدايا تخرج, هدايا عيد ميلاد, تسوق اونلاين",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
