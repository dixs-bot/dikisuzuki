import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Test Drive Suzuki Bandung",
  description: "Ajukan jadwal test drive mobil Suzuki di Bandung. Pilih model kendaraan dan kirim permintaan jadwal kepada Diki Wahyudin melalui WhatsApp.",
  alternates: { canonical: "/test-drive" },
  openGraph: {
    type: "website",
    title: "Booking Test Drive Suzuki Bandung",
    description: "Ajukan jadwal test drive mobil Suzuki di Bandung. Pilih model kendaraan dan kirim permintaan jadwal kepada Diki Wahyudin melalui WhatsApp.",
    url: "/test-drive",
  },
};

export default function TestDriveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
