import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promo Mobil Suzuki Bandung",
  description: "Tanyakan program promo Suzuki terbaru di Bandung. Minta informasi syarat, ketersediaan unit, harga OTR, DP, dan angsuran langsung kepada Diki Wahyudin.",
  alternates: { canonical: "/promo" },
  openGraph: {
    type: "website",
    title: "Promo Mobil Suzuki Bandung",
    description: "Tanyakan program promo Suzuki terbaru di Bandung. Minta informasi syarat, ketersediaan unit, harga OTR, DP, dan angsuran langsung kepada Diki Wahyudin.",
    url: "/promo",
  },
};
import Link from "next/link";
import { getWhatsAppLink, formatRupiah } from "@/lib/constants";
import { Sparkles, MessageCircle, Tag, CheckCircle2, Gift } from "lucide-react";

export default function PromoPage() {
  const promos = [
    {
      title: "Informasi Kredit dan Promo Suzuki XL7 Bandung",
      badge: "TANYAKAN PROMO",
      highlight: "Tanyakan DP dan angsuran sesuai tipe",
      description:
        "Minta informasi program pembelian Suzuki XL7 yang sedang tersedia. Besaran DP, angsuran, bonus, dan syarat promo mengikuti periode serta persetujuan pihak pembiayaan.",
      bonuses: [
        "Informasi harga OTR dan tipe XL7",
        "Pilihan DP dan tenor pembiayaan",
        "Ketersediaan warna dan unit",
        "Syarat serta periode promo yang berlaku",
      ],
      slug: "xl7",
    },
    {
      title: "Informasi Kredit Suzuki New Carry Bandung",
      badge: "KENDARAAN NIAGA",
      highlight: "Tanyakan paket kredit New Carry",
      description:
        "Konsultasikan pilihan New Carry untuk kebutuhan usaha. DP, angsuran, dan persetujuan kredit mengikuti hasil simulasi serta ketentuan perusahaan pembiayaan.",
      bonuses: [
        "Informasi tipe dan karoseri",
        "Estimasi DP dan angsuran",
        "Ketersediaan unit",
        "Syarat promo berjalan",
      ],
      slug: "carry",
    },
    {
      title: "Informasi Promo Suzuki Ertiga Bandung",
      badge: "KENDARAAN KELUARGA",
      highlight: "Tanyakan paket pembelian Ertiga",
      description:
        "Tanyakan pilihan tipe Ertiga, fitur, harga referensi, dan program pembelian yang sedang berlaku.",
      bonuses: [
        "Informasi tipe dan fitur Ertiga",
        "Estimasi DP dan angsuran",
        "Ketersediaan warna dan unit",
        "Syarat promo berjalan",
      ],
      slug: "ertiga",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 py-7 sm:px-6 sm:py-14 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF] bg-[#eaf4ff] px-3 py-1 rounded-full">
          Program Promo & Penawaran
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B78]">
          Promo Spesial Mobil Suzuki Bandung
        </h1>
        <p className="text-sm text-gray-500">
          Tanyakan program promo Suzuki yang sedang tersedia, termasuk informasi harga, DP, angsuran, dan syarat penawaran. Setiap program dapat berubah sesuai periode.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {promos.map((promo, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="p-4 sm:p-8 space-y-4">
              <span className="inline-block bg-[#168BFF] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                {promo.badge}
              </span>
              <h3 className="text-lg font-bold text-[#123B78] leading-snug">{promo.title}</h3>
              <div className="p-3 bg-[#eaf4ff] border border-red-100 rounded-xl text-xs font-bold text-[#168BFF]">
                {promo.highlight}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{promo.description}</p>

              <div className="pt-2">
                <span className="text-xs font-bold text-[#123B78] block mb-2">Informasi yang dapat dikonsultasikan:</span>
                <ul className="space-y-1.5 text-xs text-gray-600">
                  {promo.bonuses.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-2">
              <a
                href={getWhatsAppLink(`Halo Kang Diki Wahyudin, saya mau klaim ${promo.title}. Mohon info syarat dan ketentuannya.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl text-center flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Klaim Promo Ini</span>
              </a>
              <Link
                href={`/mobil/${promo.slug}`}
                className="w-full bg-gray-100 hover:bg-gray-200 text-[#123B78] text-xs font-semibold py-2.5 px-4 rounded-xl text-center block transition"
              >
                Lihat Spesifikasi Mobil
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
