"use client";

import { useState, useMemo } from "react";
import { productsData } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Search, Filter, SlidersHorizontal, Car } from "lucide-react";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "passenger" | "commercial">("all");
  const [sortOrder, setSortOrder] = useState<"default" | "price-asc" | "price-desc">("default");

  const filteredProducts = useMemo(() => {
    let result = productsData.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      return matchSearch && matchCat;
    });

    if (sortOrder === "price-asc") {
      result.sort((a, b) => (a.priceStart || 0) - (b.priceStart || 0));
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => (b.priceStart || 0) - (a.priceStart || 0));
    }

    return result;
  }, [searchQuery, selectedCategory, sortOrder]);

  return (
    <div className="mx-auto max-w-7xl space-y-7 px-3 py-7 sm:space-y-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF] bg-[#eaf4ff] px-3 py-1 rounded-full">
          Daftar Harga OTR Bandung
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B78]">
          Katalog Lengkap Mobil Suzuki Bandung
        </h1>
        <p className="text-sm text-gray-500">
          Temukan kendaraan yang sesuai kebutuhan Anda, mulai dari SUV tangguh, MPV keluarga, hatchback lincah, hingga armada niaga komersial.
        </p>
        <p className="mx-auto max-w-3xl text-xs leading-6 text-slate-500">
          Harga dan DP yang ditampilkan merupakan referensi dari data website, bukan penawaran final. Konfirmasikan harga OTR Bandung, stok, warna, promo, dan rincian pembiayaan terbaru sebelum transaksi.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari model mobil (XL7, Ertiga, Carry, Grand Vitara, dll)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B78]"
            />
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-3 items-stretch gap-1.5 md:col-span-4">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`min-w-0 px-1 py-2.5 text-[11px] font-semibold rounded-lg border transition sm:text-xs ${
                selectedCategory === "all"
                  ? "bg-[#123B78] text-white border-[#123B78]"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Semua ({productsData.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("passenger")}
              className={`min-w-0 px-1 py-2.5 text-[11px] font-semibold rounded-lg border transition sm:text-xs ${
                selectedCategory === "passenger"
                  ? "bg-[#123B78] text-white border-[#123B78]"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Penumpang
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory("commercial")}
              className={`min-w-0 px-1 py-2.5 text-[11px] font-semibold rounded-lg border transition sm:text-xs ${
                selectedCategory === "commercial"
                  ? "bg-[#123B78] text-white border-[#123B78]"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Komersial
            </button>
          </div>

          {/* Sorting */}
          <div className="md:col-span-2">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl border border-gray-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#123B78]"
            >
              <option value="default">Urutan Standar</option>
              <option value="price-asc">Harga Termurah</option>
              <option value="price-desc">Harga Tertinggi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 min-[520px]:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
          <Car className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#123B78]">Model tidak ditemukan</h3>
          <p className="text-xs text-gray-500 mt-1">
            Silakan coba kata kunci pencarian lain atau setel ulang filter kategori.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSortOrder("default");
            }}
            className="mt-4 text-xs font-semibold text-[#168BFF] hover:underline"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
