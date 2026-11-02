import Link from "next/link";
import { Product, formatRupiah, getWhatsAppLink } from "@/lib/constants";
import { MessageCircle, ArrowRight, ShieldCheck, Fuel, Gauge, Users } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const waChatMsg = `Halo Kang Diki Wahyudin, saya tertarik dengan informasi harga dan promo kredit Suzuki ${product.name}. Mohon rincian lengkapnya ya.`;

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_22px_rgba(23,43,69,.045)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_34px_rgba(23,43,69,.10)]">
      <div>
        {/* Top Header & Badge */}
        <div className="relative flex min-h-[150px] items-center justify-center border-b border-slate-100 bg-[#f7f9fc] px-5 py-7 sm:min-h-[170px]">
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-600">
              {product.badge}
            </span>
          )}
          <span className="absolute right-4 top-4 rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-semibold text-slate-600">
            {product.category === "commercial" ? "Komersial" : "Penumpang"}
          </span>

          {/* Vehicle visual silhouette / image fallback */}
          <div className="max-w-full text-center transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="mx-auto flex h-20 w-40 max-w-full items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm sm:h-24 sm:w-44">
              <span className="text-lg font-extrabold tracking-tight text-[#123b78]">
                {product.name.replace("Suzuki ", "")}
              </span>
            </div>
            <span className="mt-2 block text-[11px] font-medium text-slate-500">
              {product.tagline || "Pilihan kendaraan Suzuki"}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-5">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="break-words text-base font-bold text-[#123B78] sm:text-lg group-hover:text-[#1765C0] transition">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                {product.description}
              </p>
            </div>
          </div>

          {/* Pricing Highlight */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="text-[10px] font-bold uppercase tracking-[.08em] text-slate-500">
              Harga Referensi Mulai
            </div>
            <div className="mt-1 text-xl font-extrabold tracking-tight text-[#174a86]">
              {formatRupiah(product.priceStart || 0)}
            </div>
          </div>

          {/* Key Specs tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
              <ShieldCheck className="w-3 h-3 text-[#123B78]" />
              {product.variants.length} Varian
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
              Estimasi DP {formatRupiah(product.dpStart || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-4 sm:px-5 sm:pb-5">
        <Link
          href={`/mobil/${product.id}`}
          className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#123b78] px-2 py-3 text-xs font-semibold text-white transition hover:bg-[#0d2d59] sm:px-3"
        >
          <span>Detail Unit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={getWhatsAppLink(waChatMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-1 rounded-lg border border-emerald-200 bg-white px-2 py-3 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:px-3"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>Tanya Sales</span>
        </a>
      </div>
    </div>
  );
}
