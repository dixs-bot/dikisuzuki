"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { productsData } from "@/data/products";
import { formatRupiah, getWhatsAppLink, siteConfig } from "@/lib/constants";
import CreditSimulationWidget from "@/components/CreditSimulationWidget";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  Calendar,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = productsData.find((p) => p.id === params.slug) || productsData[0];

  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [dbColors, setDbColors] = useState<Array<{ id: string; name: string; hex_code: string }>>([]);
  const [dbPhotos, setDbPhotos] = useState<Array<{ id: string; title: string; image_url: string; color_id: string | null; category: string }>>([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    let alive = true;
    const loadGallery = async () => {
      const { data: dbProduct } = await supabase.from("products").select("id").eq("slug", params.slug).maybeSingle();
      if (!dbProduct || !alive) return;
      const [{ data: colorRows }, { data: photoRows }] = await Promise.all([
        supabase.from("vehicle_colors").select("id, name, hex_code").eq("product_id", dbProduct.id).order("sort_order"),
        supabase.from("vehicle_photos").select("id, title, image_url, color_id, category").eq("product_id", dbProduct.id).order("sort_order"),
      ]);
      if (alive) {
        setDbColors((colorRows || []) as Array<{ id: string; name: string; hex_code: string }>);
        setDbPhotos((photoRows || []) as Array<{ id: string; title: string; image_url: string; color_id: string | null; category: string }>);
      }
    };
    loadGallery();
    return () => { alive = false; };
  }, [params.slug]);

  const colors = dbColors.length ? dbColors.map((color) => ({ id: color.id, name: color.name, hex: color.hex_code })) : product.colors || [
    { name: "Pearl White", hex: "#FFFFFF" },
    { name: "Prime Black", hex: "#111111" },
    { name: "Metallic Silver", hex: "#C0C0C0" },
  ];

  const activeColor = colors[activeColorIndex] || colors[0];
  const selectedColorId = (activeColor as { id?: string })?.id;
  const visiblePhotos = useMemo(() => selectedColorId ? dbPhotos.filter((photo) => photo.color_id === selectedColorId) : dbPhotos, [dbPhotos, selectedColorId]);
  const activePhoto = visiblePhotos[activePhotoIndex] || visiblePhotos[0];
  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const waLeadMsg = `Halo Kang Diki Wahyudin, saya ingin konsultasi pembelian Suzuki ${product.name} tipe ${activeVariant?.name} (Warna: ${activeColor?.name}). Mohon info penawaran diskon cashback dan paket kredit DP minimnya.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#123B78]">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/katalog" className="hover:text-[#123B78]">
          Katalog
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#123B78]">{product.name}</span>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Gallery & Color Swatches */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 border border-gray-200 relative flex flex-col items-center justify-center min-h-[360px] shadow-sm">
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#168BFF] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {product.badge}
              </span>
            )}

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-600 p-2 rounded-xl shadow-sm border border-gray-200 transition"
              title="Perbesar Tampilan"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <div className="w-full space-y-3 py-3">
              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border border-[#dce8f5] bg-gradient-to-br from-[#f5f9ff] to-[#eaf4ff] p-3 sm:min-h-[360px]">
                {activePhoto ? <img src={activePhoto.image_url} alt={activePhoto.title} className="max-h-[360px] w-full rounded-xl object-contain" /> : <div className="text-center"><div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#b9d9fb] bg-white text-4xl font-black text-[#168bff] shadow-[0_12px_35px_rgba(22,139,255,.12)]">{product.name.slice(0, 1)}</div><h3 className="mt-4 text-xl font-extrabold text-[#123b78]">{product.name}</h3><p className="mt-1 text-xs text-slate-500">{activeColor.name} · Foto kendaraan akan tampil setelah diunggah admin</p></div>}
                {activePhoto && <button type="button" onClick={() => setLightboxOpen(true)} className="absolute bottom-4 right-4 rounded-xl border border-white bg-white/90 p-2.5 text-[#1765c0] shadow-md hover:text-[#168bff]" title="Perbesar foto"><Maximize2 className="h-4 w-4" /></button>}
              </div>
              {visiblePhotos.length > 1 && <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">{visiblePhotos.map((photo, index) => <button key={photo.id} type="button" onClick={() => setActivePhotoIndex(index)} className={`overflow-hidden rounded-xl border-2 bg-white ${activePhotoIndex === index ? "border-[#168bff] shadow-[0_0_0_3px_rgba(22,139,255,.12)]" : "border-[#dce8f5]"}`}><img src={photo.image_url} alt={photo.title} className="aspect-[4/3] w-full object-cover" /></button>)}</div>}
              <p className="text-center text-[11px] text-slate-400">{visiblePhotos.length ? `${visiblePhotos.length} foto untuk warna ${activeColor.name}` : "Galeri foto warna ini belum tersedia."}</p>
            </div>
          </div>

          {/* Color Switcher */}
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Pilihan Warna Bodi ({colors.length} Pilihan):
            </h2>
            <div className="flex flex-wrap gap-3">
              {colors.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setActiveColorIndex(i); setActivePhotoIndex(0); }}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-medium transition ${
                    activeColorIndex === i
                      ? "border-[#123B78] bg-blue-50/50 shadow-sm ring-1 ring-[#123B78]"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-gray-400 shadow-inner shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Pricing, Variant Selector & Direct CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF]">
                {product.category === "commercial" ? "Armada Komersial" : "Mobil Penumpang"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B78] mt-1">
                {product.name}
              </h1>
              <p className="text-xs text-gray-500 mt-1">{product.tagline}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-[11px] text-gray-500 uppercase font-semibold block">
                Harga Referensi OTR Mulai Dari
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#168BFF] mt-0.5">
                {formatRupiah(activeVariant?.price || product.priceStart || 0)}
              </div>
              <span className="text-xs text-gray-500 block mt-1">
                Tipe terpilih: <strong>{activeVariant?.name}</strong>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quick Action CTAs */}
            <div className="space-y-3 pt-2">
              <a
                href={getWhatsAppLink(waLeadMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Konsultasi WhatsApp Diki Wahyudin</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/test-drive"
                  className="w-full bg-[#123B78] hover:bg-[#0B2854] text-white text-xs font-semibold py-3 px-3 rounded-xl text-center flex items-center justify-center gap-1.5 transition"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Jadwal Test Drive</span>
                </Link>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-[#123B78] text-xs font-semibold py-3 px-3 rounded-xl text-center flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-4 h-4 text-[#168BFF]" />
                  <span>Telepon Langsung</span>
                </a>
              </div>
            </div>

            {/* Trust check */}
            <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Unit Baru 100% Bergaransi Resmi Suzuki Indonesia</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Gratis Jasa Servis &amp; Oli s.d 50.000 KM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variants & Pricing Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF] bg-[#eaf4ff] px-3 py-1 rounded-full">
            Daftar Tipe &amp; OTR
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#123B78] mt-2">
            Pilihan Varian Suzuki {product.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Harga pada daftar ini merupakan referensi awal. Konfirmasi harga, wilayah OTR, dan periode berlaku kepada sales sebelum transaksi.
          </p>
          <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-800">Harga dapat berubah dan belum tentu merupakan penawaran resmi terbaru. Silakan konfirmasi kepada Diki Wahyudin.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs font-bold text-[#123B78] uppercase">
                <th className="py-3 px-4">Nama Tipe / Varian</th>
                <th className="py-3 px-4">Transmisi</th>
                <th className="py-3 px-4">Harga OTR Bandung</th>
                <th className="py-3 px-4">Estimasi DP (15%)</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {product.variants.map((v, i) => {
                const dpMin = v.price * 0.15;
                const isSelected = selectedVariantIndex === i;
                return (
                  <tr
                    key={i}
                    className={`hover:bg-gray-50 transition ${
                      isSelected ? "bg-blue-50/60 font-medium" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4 font-semibold text-[#123B78]">{v.name}</td>
                    <td className="py-3.5 px-4 text-gray-600">
                      {v.name.toUpperCase().includes("AT") || v.name.toUpperCase().includes("CVT")
                        ? "Otomatis"
                        : "Manual"}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#168BFF]">
                      {formatRupiah(v.price)}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600">{formatRupiah(dpMin)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedVariantIndex(i)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                          isSelected
                            ? "bg-[#123B78] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {isSelected ? "Terpilih" : "Pilih Tipe"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Simulation Widget preloaded for this vehicle */}
      <div>
        <CreditSimulationWidget products={productsData} defaultProductId={product.id} />
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 relative">
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold text-[#123B78] mb-4">
              Galeri Tampilan: {product.name}
            </h3>
            <div className="flex min-h-64 items-center justify-center rounded-2xl bg-[#f5f9ff] p-3">{activePhoto ? <img src={activePhoto.image_url} alt={activePhoto.title} className="max-h-[65vh] w-full rounded-xl object-contain" /> : <p className="text-sm text-slate-500">Belum ada foto untuk warna {activeColor.name}.</p>}</div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="bg-[#123B78] text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Tutup Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
