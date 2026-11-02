"use client";

import { useState, useMemo } from "react";
import { Product, formatRupiah, calculateCreditSimulation, getWhatsAppLink, flatInterestRates } from "@/lib/constants";
import { Calculator, MessageCircle, Info, CheckCircle2 } from "lucide-react";

interface CreditSimulationProps {
  products: Product[];
  defaultProductId?: string;
}

export default function CreditSimulationWidget({
  products,
  defaultProductId,
}: CreditSimulationProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    defaultProductId || products[0]?.id || ""
  );
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [dpPercent, setDpPercent] = useState<number>(20);
  const [tenorYears, setTenorYears] = useState<number>(5);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) || products[0],
    [products, selectedProductId]
  );

  const selectedVariant = useMemo(() => {
    if (!selectedProduct?.variants || selectedProduct.variants.length === 0) {
      return { name: "Standar", price: selectedProduct?.priceStart || 0 };
    }
    return selectedProduct.variants[selectedVariantIndex] || selectedProduct.variants[0];
  }, [selectedProduct, selectedVariantIndex]);

  const simResult = useMemo(() => {
    const price = selectedVariant.price || selectedProduct?.priceStart || 200000000;
    return calculateCreditSimulation(price, dpPercent, tenorYears);
  }, [selectedVariant, selectedProduct, dpPercent, tenorYears]);

  const waMessage = useMemo(() => {
    return `Halo Kang Diki Wahyudin, saya ingin konsultasi kredit Suzuki:\n- Model: ${selectedProduct?.name}\n- Tipe: ${selectedVariant.name}\n- Harga OTR: ${formatRupiah(simResult.otrPrice)}\n- DP (${simResult.dpPercent}%): ${formatRupiah(simResult.dpAmount)}\n- Tenor: ${simResult.tenorYears} Tahun (${simResult.totalBulan} Bulan)\n- Estimasi Angsuran: ${formatRupiah(simResult.cicilanPerBulan)} / bulan.\n\nMohon info rincian paket promo DP minim dan diskon cashback terbarunya. Terima kasih.`;
  }, [selectedProduct, selectedVariant, simResult]);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-[#123B78] text-white p-6 sm:p-8 flex items-center justify-between">
        <div>
          <span className="inline-block bg-[#168BFF] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            Kalkulator Finansial
          </span>
          <h3 className="text-xl sm:text-2xl font-bold">Simulasi Kredit Mobil Suzuki</h3>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Hitung estimasi Down Payment (DP) dan cicilan bulanan sesuai budget Anda di Bandung.
          </p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-xl bg-white/10 items-center justify-center">
          <Calculator className="w-6 h-6 text-emerald-400" />
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Product Select */}
          <div>
            <label className="block text-sm font-semibold text-[#123B78] mb-1.5">
              Pilih Model Kendaraan
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                setSelectedVariantIndex(0);
              }}
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#123B78] focus:outline-none"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — Mulai {formatRupiah(p.priceStart || 0)}
                </option>
              ))}
            </select>
          </div>

          {/* Variant Select */}
          {selectedProduct?.variants && selectedProduct.variants.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-[#123B78] mb-1.5">
                Pilih Tipe / Varian
              </label>
              <select
                value={selectedVariantIndex}
                onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#123B78] focus:outline-none"
              >
                {selectedProduct.variants.map((v, i) => (
                  <option key={i} value={i}>
                    {v.name} &bull; OTR {formatRupiah(v.price)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* DP Slider / Select */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-semibold text-[#123B78]">
                Uang Muka / DP ({dpPercent}%)
              </label>
              <span className="text-sm font-bold text-[#168BFF]">
                {formatRupiah(simResult.dpAmount)}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[15, 20, 25, 30, 40].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDpPercent(pct)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition ${
                    dpPercent === pct
                      ? "bg-[#123B78] text-white border-[#123B78] shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Tenor Select */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-semibold text-[#123B78]">
                Jangka Waktu / Tenor
              </label>
              <span className="text-xs text-gray-500">
                Suku Bunga Flat: {(flatInterestRates[tenorYears] * 100).toFixed(0)}%/thn
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTenorYears(yr)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition ${
                    tenorYears === yr
                      ? "bg-[#168BFF] text-white border-[#168BFF] shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {yr} Tahun
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation Result Box */}
        <div className="lg:col-span-5 bg-[#F5F9FF] rounded-2xl p-6 border border-gray-200 flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-1">
              Rincian Perhitungan
            </div>
            <div className="text-lg font-bold text-[#123B78] leading-snug">
              {selectedProduct?.name}
            </div>
            <div className="text-xs text-gray-600 mb-4">{selectedVariant.name}</div>

            <div className="space-y-3 border-t border-gray-200 pt-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Harga OTR Bandung:</span>
                <span className="font-semibold text-[#123B78]">
                  {formatRupiah(simResult.otrPrice)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimasi DP ({simResult.dpPercent}%):</span>
                <span className="font-semibold text-[#123B78]">
                  {formatRupiah(simResult.dpAmount)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Pokok Pembiayaan:</span>
                <span className="font-semibold text-[#123B78]">
                  {formatRupiah(simResult.pokokUtang)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tenor Angsuran:</span>
                <span className="font-semibold text-[#123B78]">
                  {simResult.tenorYears} Tahun ({simResult.totalBulan}x)
                </span>
              </div>
            </div>

            {/* Monthly Highlight */}
            <div className="mt-6 bg-[#123B78] text-white p-4 rounded-xl text-center shadow-md">
              <div className="text-xs uppercase text-gray-300 font-medium tracking-wider">
                Estimasi Angsuran Bulanan
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                {formatRupiah(simResult.cicilanPerBulan)}
                <span className="text-xs font-normal text-gray-300"> /bulan</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href={getWhatsAppLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Klaim Simulasi ke WhatsApp Diki</span>
            </a>
            <p className="text-[11px] text-gray-500 leading-tight text-center">
              *Perhitungan merupakan estimasi simulasi kredit bunga flat. Nilai pasti angsuran dan DP dapat disesuaikan dengan paket leasing BCA Finance, Mandiri Tunas Finance, Suzuki Finance, dan promo subsidi dealer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
