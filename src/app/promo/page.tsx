import Link from "next/link";
import { getWhatsAppLink, formatRupiah } from "@/lib/constants";
import { Sparkles, MessageCircle, Tag, CheckCircle2, Gift } from "lucide-react";

export default function PromoPage() {
  const promos = [
    {
      title: "Promo Super DP Ringan Suzuki XL7 Hybrid Bandung",
      badge: "HOT PROMO 2026",
      highlight: "DP Mulai 18 Jutaan / Angsuran Ringan",
      description:
        "Dapatkan subsidi cashback puluhan juta rupiah, bunga 0%, dan bonus paket aksesoris eksklusif khusus pemesanan bulan ini bersama Diki Wahyudin.",
      bonuses: [
        "Kaca Film Solargard Bergaransi 5 Tahun",
        "Karpet Set Orisinil Suzuki",
        "Talang Air & Dudukan Plat",
        "Free Jasa Servis & Oli s.d 50.000 KM",
        "Garansi Baterai Lithium Hybrid 8 Tahun",
      ],
      slug: "xl7",
    },
    {
      title: "Promo New Carry Pick Up — Rajanya Usaha Bandung",
      badge: "PROMO NIAGA",
      highlight: "DP Mulai 8 Jutaan / Cicilan 3 Jutaan",
      description:
        "Solusi terbaik kendaraan niaga tangguh dan irit. DP termurah se-Jawa Barat, proses kredit dibantu sampai approve 100%!",
      bonuses: [
        "Kaca Film Depan",
        "Apar Pemadam Kebakaran",
        "Free Jasa Servis s.d 50.000 KM",
        "Free Oli Mesin & Filter",
      ],
      slug: "carry",
    },
    {
      title: "Special Deal Suzuki All New Ertiga Cruise Hybrid",
      badge: "PROMO KELUARGA",
      highlight: "DP Mulai 15 Jutaan",
      description:
        "MPV ternyaman dan teririt di kelasnya dengan Cruise Control dan Smart Hybrid Vehicle by Suzuki (SHVS).",
      bonuses: [
        "Kaca Film Full Body",
        "Voucher Belanja Eksklusif",
        "Karpet Beludru Orisinil",
        "Layanan Emergency Call 24 Jam",
      ],
      slug: "ertiga",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 py-7 sm:px-6 sm:py-14 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF] bg-[#eaf4ff] px-3 py-1 rounded-full">
          Penawaran Terbatas 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B78]">
          Promo Spesial Mobil Suzuki Bandung
        </h1>
        <p className="text-sm text-gray-500">
          Ambil kesempatan promo diskon cashback terbesar, paket kredit DP termurah, dan hadiah aksesoris langsung bersama Diki Wahyudin.
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
                <span className="text-xs font-bold text-[#123B78] block mb-2">Bonus Langsung:</span>
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
