import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { siteUrl, buildSiteStructuredData } from "@/lib/seo";


const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sales Suzuki Bandung | Harga, Promo & Kredit | Diki Wahyudin",
    template: "%s | Diki Wahyudin - Suzuki Bandung",
  },
  description:
    "Konsultasi pembelian mobil Suzuki di Bandung bersama Diki Wahyudin. Lihat katalog, tipe, harga referensi, promo yang tersedia, simulasi kredit, dan booking test drive.",
  applicationName: "Diki Wahyudin - Sales Suzuki Bandung",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },
  keywords: [
    "sales Suzuki Bandung",
    "harga mobil Suzuki Bandung",
    "promo Suzuki Bandung",
    "kredit mobil Suzuki Bandung",
    "simulasi kredit Suzuki Bandung",
    "sales mobil Suzuki Bandung",
    "test drive Suzuki Bandung",
    "sales Suzuki Cimahi",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Diki Wahyudin - Sales Suzuki Bandung",
  },
  twitter: {
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${manrope.variable} min-h-screen flex flex-col antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildSiteStructuredData()).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
