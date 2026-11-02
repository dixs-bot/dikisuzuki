import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog dan Harga Mobil Suzuki Bandung",
  description: "Lihat katalog Suzuki XL7, Ertiga, Carry, Jimny, Grand Vitara, S-Presso, Fronx, dan APV. Cek tipe dan harga referensi, lalu konfirmasi OTR Bandung terbaru.",
  alternates: { canonical: "/katalog" },
  openGraph: {
    type: "website",
    title: "Katalog dan Harga Mobil Suzuki Bandung",
    description: "Lihat katalog Suzuki XL7, Ertiga, Carry, Jimny, Grand Vitara, S-Presso, Fronx, dan APV. Cek tipe dan harga referensi, lalu konfirmasi OTR Bandung terbaru.",
    url: "/katalog",
  },
};

export default function KatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
