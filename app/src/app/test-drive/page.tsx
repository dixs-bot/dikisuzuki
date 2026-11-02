"use client";

import { useState } from "react";
import { productsData } from "@/data/products";
import { siteConfig, getWhatsAppLink } from "@/lib/constants";
import { Calendar, Clock, MapPin, User, Phone, CheckCircle2, MessageCircle } from "lucide-react";

export default function TestDrivePage() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(productsData[0]?.name || "Suzuki XL7");
  const [preferredDate, setPreferredDate] = useState("");
  const [locationType, setLocationType] = useState<"dealer" | "home_visit">("dealer");
  const [addressNotes, setAddressNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const waDirectLink = getWhatsAppLink(
    `Halo Kang Diki Wahyudin, saya ingin booking Test Drive Suzuki:\n- Nama: ${fullName || "(Isi nama)"}\n- No. HP: ${phoneNumber || "(Isi HP)"}\n- Model: ${selectedProduct}\n- Tanggal: ${preferredDate || "Sesuai kesepakatan"}\n- Lokasi: ${locationType === "dealer" ? "Showroom NJS Ahmad Yani" : "Diantar ke Rumah/Kantor (" + addressNotes + ")"}`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF] bg-[#eaf4ff] px-3 py-1 rounded-full">
          Layanan Gratis 100%
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B78]">
          Booking Test Drive Mobil Suzuki Bandung
        </h1>
        <p className="text-sm text-gray-500">
          Rasakan kenyamanan berkendara, performa mesin, dan teknologi Smart Hybrid Suzuki secara langsung sebelum memutuskan membeli.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-[#123B78]">Permintaan Berhasil Dicatat!</h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Terima kasih, <strong>{fullName}</strong>. Kang Diki Wahyudin akan segera mengonfirmasi jadwal test drive mobil <strong>{selectedProduct}</strong> Anda.
            </p>
            <div className="pt-4">
              <a
                href={waDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow transition"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Kirim Notifikasi via WhatsApp Sekarang</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-[#123B78] mb-1.5">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bpk. Rizky Pratama"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B78]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#123B78] mb-1.5">
                  Nomor WhatsApp / HP *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B78]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-[#123B78] mb-1.5">
                  Model Suzuki Pilihan *
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B78]"
                >
                  {productsData.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#123B78] mb-1.5">
                  Prakiraan Tanggal Test Drive *
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B78]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#123B78] mb-2">
                Pilihan Lokasi Uji Coba *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer transition ${
                    locationType === "dealer"
                      ? "border-[#123B78] bg-blue-50/50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="loc"
                    checked={locationType === "dealer"}
                    onChange={() => setLocationType("dealer")}
                    className="text-[#123B78]"
                  />
                  <div>
                    <strong className="text-sm text-[#123B78] block">Showroom Ahmad Yani Bandung</strong>
                    <span className="text-xs text-gray-500">Datang langsung ke dealer NJS</span>
                  </div>
                </label>

                <label
                  className={`border rounded-xl p-4 flex items-center gap-3 cursor-pointer transition ${
                    locationType === "home_visit"
                      ? "border-[#123B78] bg-blue-50/50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="loc"
                    checked={locationType === "home_visit"}
                    onChange={() => setLocationType("home_visit")}
                    className="text-[#123B78]"
                  />
                  <div>
                    <strong className="text-sm text-[#123B78] block">Home Visit (Antar ke Rumah)</strong>
                    <span className="text-xs text-gray-500">Unit dibawakan ke alamat Anda</span>
                  </div>
                </label>
              </div>
            </div>

            {locationType === "home_visit" && (
              <div>
                <label className="block text-xs font-bold uppercase text-[#123B78] mb-1.5">
                  Alamat Lengkap Rumah / Kantor di Bandung
                </label>
                <textarea
                  rows={2}
                  placeholder="Sebutkan alamat lengkap untuk pengantaran unit test drive..."
                  value={addressNotes}
                  onChange={(e) => setAddressNotes(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#123B78]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#168BFF] hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-xl shadow transition text-sm"
            >
              Konfirmasi &amp; Jadwalkan Test Drive
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
