"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Product, formatRupiah, getWhatsAppLink } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { MessageCircle, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

type DbColor = { id: string; name: string; hex_code: string; is_active?: boolean };
type DbPhoto = { id: string; title: string; image_url: string; color_id: string | null; sort_order: number; is_featured: boolean };

export default function ProductCard({ product }: ProductCardProps) {
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [dbColors, setDbColors] = useState<DbColor[]>([]);
  const [dbPhotos, setDbPhotos] = useState<DbPhoto[]>([]);
  const [activeColorId, setActiveColorId] = useState("");
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [colorWasManuallySelected, setColorWasManuallySelected] = useState(false);

  useEffect(() => {
    let alive = true;
    const loadCardGallery = async () => {
      const { data: dbProduct, error } = await supabase
        .from("products")
        .select("id, main_image_url")
        .eq("slug", product.id)
        .maybeSingle();

      if (error || !dbProduct || !alive) return;

      const [{ data: colorRows }, { data: photoRows }] = await Promise.all([
        supabase.from("vehicle_colors")
          .select("id, name, hex_code, is_active")
          .eq("product_id", dbProduct.id)
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
        supabase.from("vehicle_photos")
          .select("id, title, image_url, color_id, sort_order, is_featured")
          .eq("product_id", dbProduct.id)
          .order("is_featured", { ascending: false })
          .order("sort_order", { ascending: true }),
      ]);

      if (!alive) return;
      setMainImageUrl(dbProduct.main_image_url || "");
      const nextColors = (colorRows || []) as DbColor[];
      setDbColors(nextColors);
      setDbPhotos((photoRows || []) as DbPhoto[]);
      if (nextColors[0]) {
        setActiveColorId(nextColors[0].id);
        setActiveColorIndex(0);
      }
    };

    loadCardGallery();
    return () => { alive = false; };
  }, [product.id]);

  const colors = useMemo(() => dbColors.length
    ? dbColors.map((color) => ({ id: color.id, name: color.name, hex: color.hex_code }))
    : (product.colors || []).map((color, index) => ({ id: `fallback-${index}`, name: color.name, hex: color.hex })),
  [dbColors, product.colors]);

  const activeColor = colors.find((color) => color.id === activeColorId) || colors[activeColorIndex] || colors[0];

  const colorPhotos = useMemo(() => {
    if (!activeColor) return [];
    if (activeColor.id.startsWith("fallback-")) return [];
    return dbPhotos.filter((photo) => photo.color_id === activeColor.id);
  }, [activeColor, dbPhotos]);

  const slides = useMemo(() => {
    const urls = colorPhotos.map((photo) => ({ url: photo.image_url, alt: photo.title, key: photo.id }));
    if (urls.length) return urls;
    if (mainImageUrl && !colorWasManuallySelected) return [{ url: mainImageUrl, alt: `${product.name} - foto utama`, key: "main-image" }];
    return [];
  }, [colorPhotos, mainImageUrl, product.name, colorWasManuallySelected]);

  useEffect(() => {
    setSlideIndex(0);
    setImageLoading(true);
  }, [activeColorId, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % slides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [slides.length, activeColorId]);

  const currentSlide = slides[slideIndex] || slides[0];
  const waChatMsg = `Halo Diki Wahyudin, saya tertarik dengan Suzuki ${product.name}${activeColor ? ` warna ${activeColor.name}` : ""}. Mohon informasi harga dan ketersediaannya.`;

  const selectColor = (index: number) => {
    const color = colors[index];
    if (!color) return;
    setActiveColorIndex(index);
    setActiveColorId(color.id);
    setColorWasManuallySelected(true);
    setSlideIndex(0);
  };

  return (
    <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_22px_rgba(23,43,69,.045)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_34px_rgba(23,43,69,.10)]">
      <div>
        <div className="relative flex min-h-[230px] flex-col items-center justify-center border-b border-slate-100 bg-gradient-to-b from-white to-slate-50 px-4 pb-3 pt-12 sm:min-h-[260px]">
          {product.badge && (
            <span className="absolute left-4 top-4 z-10 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-600">
              {product.badge}
            </span>
          )}
          <span className="absolute right-4 top-4 z-10 rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-600">
            {product.category === "commercial" ? "Komersial" : "Penumpang"}
          </span>

          <div className="relative flex h-[150px] w-full items-center justify-center sm:h-[178px]">
            {currentSlide ? (
              <>
                <img
                  key={currentSlide.key}
                  src={currentSlide.url}
                  alt={currentSlide.alt}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                  className={`h-full w-full object-contain object-center transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                  style={{ background: "transparent" }}
                />
                {slides.length > 1 && (
                  <>
                    <button type="button" aria-label="Foto sebelumnya" onClick={() => setSlideIndex((slideIndex - 1 + slides.length) % slides.length)} className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/95 p-2 text-slate-700 shadow-sm hover:bg-white">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label="Foto berikutnya" onClick={() => setSlideIndex((slideIndex + 1) % slides.length)} className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/95 p-2 text-slate-700 shadow-sm hover:bg-white">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center text-slate-400">
                <ImageOff className="h-9 w-9" />
                <span className="text-sm font-semibold text-slate-600">{product.name}</span>
                <span className="text-[10px]">{colorWasManuallySelected ? `Foto warna ${activeColor?.name || "ini"} belum diunggah` : "Foto utama belum diunggah"}</span>
              </div>
            )}
          </div>

          <div className="mt-2 flex min-h-4 items-center gap-1.5">
            {slides.length > 1 && slides.map((slide, index) => (
              <button key={slide.key} type="button" aria-label={`Lihat foto ${index + 1}`} onClick={() => setSlideIndex(index)} className={`h-1.5 rounded-full transition-all ${slideIndex === index ? "w-5 bg-[#174a86]" : "w-1.5 bg-slate-300"}`} />
            ))}
            {activeColor && <span className="ml-1 text-[10px] text-slate-500">{activeColor.name}</span>}
          </div>
        </div>

        {colors.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
            <span className="mr-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Warna</span>
            {colors.map((color, index) => (
              <button key={color.id} type="button" onClick={() => selectColor(index)} aria-label={`Pilih warna ${color.name}`} aria-pressed={activeColor?.id === color.id} title={color.name} className={`h-7 w-7 rounded-full border-2 p-0.5 transition ${activeColor?.id === color.id ? "border-[#174a86] ring-2 ring-blue-100" : "border-slate-200 hover:border-slate-400"}`}>
                <span className="block h-full w-full rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
              </button>
            ))}
          </div>
        )}

        <div className="p-5 sm:p-5">
          <h3 className="break-words text-base font-bold text-[#123B78] transition group-hover:text-[#1765C0] sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-gray-500">{product.description}</p>

          <div className="mt-4 border-t border-gray-100 pt-3">
            <div className="text-[10px] font-bold uppercase tracking-[.08em] text-slate-500">Harga Referensi Mulai</div>
            <div className="mt-1 text-xl font-extrabold tracking-tight text-[#174a86]">{formatRupiah(product.priceStart || 0)}</div>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
              <ShieldCheck className="h-3 w-3 text-[#123B78]" /> {product.variants.length} Varian
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
              Estimasi DP {formatRupiah(product.dpStart || 0)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-4 pb-4 sm:px-5 sm:pb-5">
        <Link href={`/mobil/${product.id}`} className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#123b78] px-2 py-3 text-xs font-semibold text-white transition hover:bg-[#0d2d59] sm:px-3">
          <span>Detail Unit</span><ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <a href={getWhatsAppLink(waChatMsg)} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-1 rounded-lg border border-emerald-200 bg-white px-2 py-3 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50">
          <MessageCircle className="h-3.5 w-3.5 fill-current" /><span>Tanya Sales</span>
        </a>
      </div>
    </article>
  );
}
