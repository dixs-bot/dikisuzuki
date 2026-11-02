import Link from "next/link";
import type { Metadata } from "next";
import { productsData } from "@/data/products";
import { siteUrl } from "@/lib/seo";
import { siteConfig, getWhatsAppLink, formatRupiah } from "@/lib/constants";
import ProductCard from "@/components/ProductCard";
import CreditSimulationWidget from "@/components/CreditSimulationWidget";
import {
  Car,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  MessageCircle,
  FileCheck,
  ArrowRight,
  MapPin,
  Star,
  Award,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sales Suzuki Bandung - Harga, Promo & Simulasi Kredit",
  description:
    "Butuh sales Suzuki Bandung? Konsultasi dengan Diki Wahyudin untuk melihat katalog XL7, Ertiga, Fronx, Carry, Jimny, Grand Vitara, simulasi kredit, dan test drive.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sales Suzuki Bandung - Diki Wahyudin",
    description:
      "Katalog mobil Suzuki, harga referensi, promo yang tersedia, simulasi kredit, dan konsultasi pembelian di Bandung.",
    url: siteUrl,
    type: "website",
  },
};

export default function HomePage() {
  const featuredProducts = productsData.filter((p) => p.featured);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. WHITE BLUE NEON HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#f5f9ff] to-[#eaf4ff] pb-16 pt-12 sm:pb-24 sm:pt-20">
        <div className="pointer-events-none absolute -right-20 -top-24 h-[26rem] w-[26rem] rounded-full bg-[#168bff]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 h-80 w-80 rounded-full bg-[#38a5ff]/10 blur-3xl" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
            <span className="section-kicker"><span className="h-2 w-2 animate-pulse rounded-full bg-[#168bff]" /> Showroom Digital Suzuki</span>
            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-[#123b78] sm:text-5xl lg:text-6xl">Temukan Mobil Suzuki <span className="bg-gradient-to-r from-[#1765c0] via-[#168bff] to-[#38a5ff] bg-clip-text text-transparent">Impian Anda.</span></h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">Jelajahi pilihan kendaraan, lihat informasi tipe dan harga, lalu hitung estimasi cicilan dengan mudah bersama <strong className="text-[#123b78]">Diki Wahyudin</strong>.</p>
            <div className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row lg:justify-start">
              <Link href="/katalog" className="btn-neon inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold sm:w-auto"><Car className="h-4 w-4" /> Jelajahi Katalog</Link>
              <Link href="/simulasi" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#b9d9fb] bg-white px-6 py-3.5 text-sm font-bold text-[#1765c0] shadow-sm hover:border-[#168bff] hover:shadow-[0_8px_24px_rgba(22,139,255,.12)] sm:w-auto"><Calculator className="h-4 w-4" /> Simulasi Kredit</Link>
            </div>
            <div className="mx-auto grid max-w-lg grid-cols-3 gap-3 border-t border-[#dce8f5] pt-6 text-center lg:mx-0 lg:text-left">
              <div><div className="text-xl font-extrabold text-[#123b78] sm:text-2xl">Banyak</div><div className="mt-1 text-[11px] text-slate-500">Pilihan Model</div></div>
              <div><div className="text-xl font-extrabold text-[#168bff] sm:text-2xl">Transparan</div><div className="mt-1 text-[11px] text-slate-500">Info Tipe & Harga</div></div>
              <div><div className="text-xl font-extrabold text-[#123b78] sm:text-2xl">Mudah</div><div className="mt-1 text-[11px] text-slate-500">Konsultasi Langsung</div></div>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="absolute inset-5 rounded-[2rem] bg-[#168bff]/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/90 bg-white/75 p-5 shadow-[0_24px_70px_rgba(18,59,120,.13)] backdrop-blur-xl sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-3"><div><span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#168bff]">Mitra Konsultasi Suzuki</span><h2 className="mt-1 text-xl font-extrabold text-[#123b78]">{siteConfig.salesName}</h2><p className="text-xs text-slate-500">{siteConfig.salesRole}</p></div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#123b78] to-[#168bff] text-xl font-black text-white shadow-lg shadow-blue-500/20">DW</div></div>
              <div className="relative overflow-hidden rounded-2xl border border-[#dce8f5] bg-gradient-to-br from-[#f5f9ff] to-[#eaf4ff] p-5">
                <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border-[18px] border-[#168bff]/10" />
                <div className="relative"><span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1765c0] shadow-sm">Konsultasi Personal</span><p className="mt-4 text-sm leading-6 text-slate-600">Bantu pilih model, tipe, warna, dan skema pembelian yang sesuai kebutuhan Anda.</p><div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#1765c0]"><ShieldCheck className="h-4 w-4" /> Pendampingan informasi pembelian</div></div>
              </div>
              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-[#e4eef9] bg-white p-3"><div><span className="block text-[10px] text-slate-500">Hubungi sales</span><strong className="text-sm text-[#123b78]">{siteConfig.phoneNumberFormatted}</strong></div><a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-neon inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-bold"><MessageCircle className="h-4 w-4" /> WhatsApp</a></div>
              <p className="mt-3 text-center text-[10px] text-slate-400">Informasi harga dan promo dapat berubah mengikuti ketentuan dealer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS / KEUNGGULAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF] bg-[#eaf4ff] px-3 py-1 rounded-full">
            Layanan Konsultasi
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B78] mt-3">
            Keuntungan Membeli Mobil Suzuki Bersama Diki Wahyudin
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Dedikasi kami adalah menghadirkan kemudahan transaksi otomotif yang transparan, bersahabat, dan amanah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-[#eaf4ff] text-[#168BFF] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#123B78] mb-2">Informasi Promo Terbaru</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Dapatkan informasi penawaran dan program promo yang berlaku sesuai periode serta ketentuan dealer.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#123B78] flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#123B78] mb-2">Pendampingan Pengajuan Kredit</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Dapatkan penjelasan mengenai dokumen dan tahapan pengajuan. Persetujuan kredit mengikuti analisis pihak pembiayaan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#123B78] mb-2">Test Drive Antar ke Rumah</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Sibuk tidak sempat ke showroom? Kang Diki siap membawakan unit test drive langsung ke kantor atau rumah Anda di seluruh area Bandung Raya.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#123B78] mb-2">Layanan After Sales Terjamin</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Dukungan purnajual prima dealer NJS Ahmad Yani, garansi mesin, aki, serta baterai hybrid hingga 8 tahun / 160.000 KM.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF] bg-[#eaf4ff] px-3 py-1 rounded-full">
              Katalog Unggulan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B78] mt-2">
              Pilihan Mobil Suzuki untuk Kebutuhan Anda
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Pilihan SUV, MPV keluarga, dan kendaraan niaga Suzuki. Harga pada katalog merupakan referensi dan perlu dikonfirmasi untuk OTR Bandung terbaru.
            </p>
          </div>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#123B78] hover:text-[#168BFF] transition group"
          >
            <span>Lihat Semua {productsData.length} Kendaraan</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. CREDIT SIMULATION COMPONENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CreditSimulationWidget products={productsData} defaultProductId="xl7" />
      </section>

      {/* 5. PROMO SPECIAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#123b78] via-[#1765c0] to-[#168bff] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-block bg-[#168BFF] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Info Promo Terbaru
            </span>
            <h3 className="text-2xl sm:text-4xl font-black leading-tight">
              Cari Penawaran Suzuki yang Sesuai Kebutuhan Anda
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Hubungi Diki Wahyudin untuk memperoleh informasi promo dan program pembelian terbaru. Ketersediaan dan ketentuan penawaran dapat berubah sesuai periode.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={getWhatsAppLink("Halo Diki Wahyudin, saya ingin mengetahui promo Suzuki terbaru yang tersedia di Bandung.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#168BFF] hover:bg-[#123b78] text-white font-bold px-6 py-3.5 rounded-xl transition flex items-center gap-2 shadow"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Tanya Promo via WhatsApp</span>
              </a>
              <Link
                href="/promo"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition"
              >
                Lihat Rincian Promo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER TRUST */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#dce8f5] bg-gradient-to-br from-white to-[#eaf4ff] p-8 text-center shadow-sm sm:p-12">
          <span className="section-kicker">Layanan Personal</span>
          <h2 className="mt-3 text-2xl font-extrabold text-[#123b78] sm:text-3xl">Dapatkan Informasi Sebelum Memutuskan</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">Tanyakan detail kendaraan, pilihan warna, harga berdasarkan tipe, dan simulasi pembelian. Informasi disampaikan secara langsung agar Anda dapat mempertimbangkan pilihan dengan nyaman.</p>
          <a href={getWhatsAppLink("Halo Diki, saya ingin konsultasi pilihan mobil Suzuki.")} target="_blank" rel="noopener noreferrer" className="btn-neon mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"><MessageCircle className="h-4 w-4" /> Konsultasi dengan Diki</a>
        </div>
      </section>

      {/* 7. DEALER LOCATION & FAST CONTACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF] bg-[#eaf4ff] px-3 py-1 rounded-full">
              Kunjungi Showroom Kami
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B78]">
              {siteConfig.dealerName}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Hubungi Diki Wahyudin untuk menanyakan ketersediaan unit, jadwal kunjungan, informasi fasilitas showroom, dan pilihan test drive.
            </p>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#168BFF] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500 shrink-0" />
                <span>{siteConfig.operatingHours}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{siteConfig.phoneNumberFormatted} (Diki Wahyudin)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#123B78] hover:bg-[#0B2854] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
              >
                Buka di Google Maps
              </a>
              <Link
                href="/test-drive"
                className="bg-[#168BFF] hover:bg-[#123b78] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
              >
                Booking Jadwal Kunjungan
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-gray-100 min-h-[350px] relative flex items-center justify-center p-8 text-center">
            <div className="space-y-4 max-w-sm">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto text-[#168BFF]">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[#123B78]">Peta Showroom Ahmad Yani Bandung</h3>
              <p className="text-xs text-gray-500">
                Akses strategis di pusat kota Bandung, dekat perempatan Jl. R.E Martadinata (Riau) &amp; Laswi.
              </p>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#123B78] border border-gray-300 hover:bg-gray-50 text-xs font-bold px-4 py-2 rounded-lg shadow-sm"
              >
                Petunjuk Arah Menuju Lokasi
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm sm:p-10">
          <span className="section-kicker">Informasi untuk calon pembeli</span>
          <h2 className="mt-3 text-2xl font-extrabold text-[#123b78] sm:text-3xl">
            Konsultasi Sales Suzuki Bandung dengan Diki Wahyudin
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            Sedang mencari sales Suzuki di Bandung untuk membantu memilih mobil baru? Diki Wahyudin melayani konsultasi informasi model, tipe, pilihan warna, harga referensi, dan proses pembelian kendaraan Suzuki. Layanan informasi ditujukan untuk calon pembeli di Kota Bandung, Cimahi, Kabupaten Bandung, Bandung Barat, dan wilayah Jawa Barat sesuai jangkauan layanan.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="font-bold text-[#123b78]">Harga dan pilihan mobil Suzuki</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Bandingkan pilihan Suzuki XL7, Ertiga, Carry, Jimny, Grand Vitara, S-Presso, Fronx, dan APV melalui katalog. Harga yang ditampilkan merupakan referensi; konfirmasikan harga OTR, ketersediaan tipe, warna, dan program berjalan sebelum melakukan pemesanan.
              </p>
              <Link href="/katalog" className="mt-3 inline-flex text-sm font-semibold text-[#1765c0] hover:underline">Lihat katalog mobil Suzuki Bandung</Link>
            </div>
            <div>
              <h3 className="font-bold text-[#123b78]">Simulasi kredit dan test drive</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Gunakan kalkulator untuk memperoleh gambaran awal DP dan angsuran, lalu minta penawaran resmi dari perusahaan pembiayaan. Anda juga dapat mengajukan jadwal test drive untuk model yang tersedia.
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href="/simulasi" className="text-[#1765c0] hover:underline">Simulasi kredit Suzuki</Link>
                <Link href="/test-drive" className="text-[#1765c0] hover:underline">Booking test drive</Link>
              </div>
            </div>
          </div>
          <div className="mt-7 border-t border-slate-100 pt-6">
            <h3 className="font-bold text-[#123b78]">Pertanyaan umum</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-slate-800">Di mana saya bisa konsultasi mobil Suzuki di Bandung?</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">Hubungi Diki Wahyudin melalui WhatsApp atau kunjungi halaman kontak untuk informasi alamat dan jadwal layanan.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800">Apakah harga di website merupakan harga final?</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">Tidak. Harga merupakan referensi dan dapat berubah menurut tipe, wilayah, serta program. Minta konfirmasi OTR dan rincian tertulis sebelum transaksi.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800">Bisakah saya meminta simulasi kredit?</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">Bisa. Gunakan halaman simulasi sebagai perkiraan awal, kemudian minta simulasi aktual sesuai leasing, DP, tenor, asuransi, dan biaya terkait.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800">Apakah tersedia test drive?</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">Anda dapat mengirim permintaan jadwal test drive. Ketersediaan unit dan jadwal perlu dikonfirmasi terlebih dahulu.</p>
              </div>
            </div>
          </div>
          <Link href="/kontak" className="mt-6 inline-flex rounded-xl bg-[#123b78] px-5 py-3 text-sm font-bold text-white hover:bg-[#1765c0]">Hubungi Diki Wahyudin</Link>
        </div>
      </section>
    </div>
  );
}
