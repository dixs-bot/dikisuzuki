import Link from "next/link";
import { Product, formatRupiah, getWhatsAppLink } from "@/lib/constants";
import { MessageCircle, ArrowRight, ShieldCheck, Fuel, Gauge, Users } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const waChatMsg = `Halo Kang Diki Wahyudin, saya tertarik dengan informasi harga dan promo kredit Suzuki ${product.name}. Mohon rincian lengkapnya ya.`;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Top Header & Badge */}
        <div className="relative bg-gradient-to-b from-gray-50 to-white p-5 border-b border-gray-100 flex items-center justify-center min-h-[160px] sm:min-h-[190px]">
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#168BFF] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
              {product.badge}
            </span>
          )}
          <span className="absolute top-3 right-3 bg-[#123B78] text-white text-[10px] font-semibold px-2 py-0.5 rounded capitalize">
            {product.category === "commercial" ? "Komersial" : "Penumpang"}
          </span>

          {/* Vehicle visual silhouette / image fallback */}
          <div className="max-w-full text-center transition-transform duration-300 group-hover:scale-105">
            <div className="mx-auto h-20 w-36 max-w-full sm:h-24 sm:w-40 rounded-xl bg-gradient-to-tr from-[#123B78]/10 to-[#168BFF]/10 flex items-center justify-center border border-gray-200 shadow-inner">
              <span className="font-black text-[#123B78] tracking-widest text-lg">
                {product.name.replace("Suzuki ", "")}
              </span>
            </div>
            <span className="text-[11px] text-gray-600 block mt-2 font-medium">
              {product.tagline || "Suzuki Official Vehicle"}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
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
            <div className="text-[11px] text-gray-500 uppercase font-semibold">
              Harga Referensi Mulai
            </div>
            <div className="text-xl font-extrabold text-[#1765C0]">
              {formatRupiah(product.priceStart || 0)}
            </div>
          </div>

          {/* Key Specs tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-[11px] px-2 py-0.5 rounded-md font-medium">
              <ShieldCheck className="w-3 h-3 text-[#123B78]" />
              {product.variants.length} Varian
            </span>
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-[11px] px-2 py-0.5 rounded-md font-medium">
              DP Mulai {formatRupiah(product.dpStart || 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-4 sm:px-5 sm:pb-5">
        <Link
          href={`/mobil/${product.id}`}
          className="w-full bg-[#123B78] hover:bg-[#0B2854] text-white text-xs font-semibold py-3 px-2 sm:px-3 rounded-xl text-center flex items-center justify-center gap-1 transition"
        >
          <span>Detail Unit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={getWhatsAppLink(waChatMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-3 px-2 sm:px-3 rounded-xl text-center flex items-center justify-center gap-1 transition shadow-sm"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>Tanya Sales</span>
        </a>
      </div>
    </div>
  );
}
