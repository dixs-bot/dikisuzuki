import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";



export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Suzuki Digital Showroom | Diki Wahyudin",
  description:
    "Jelajahi katalog kendaraan Suzuki, pilihan tipe dan warna, informasi harga, serta simulasi kredit bersama Diki Wahyudin.",
  keywords: [
    "Suzuki Bandung",
    "Diki Wahyudin Suzuki",
    "Dealer Suzuki NJS Ahmad Yani",
    "Promo Suzuki Bandung 2026",
    "Kredit Suzuki Bandung",
    "Suzuki XL7 Hybrid Bandung",
    "Suzuki Carry Bandung",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
