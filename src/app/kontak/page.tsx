import { siteConfig, getWhatsAppLink } from "@/lib/constants";
import { MapPin, Phone, MessageCircle, Mail, Clock, ShieldCheck } from "lucide-react";

export default function KontakPage() {
  return (
    <div className="max-w-7xl mx-auto px-3 py-7 sm:px-6 sm:py-14 lg:px-8 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF] bg-[#eaf4ff] px-3 py-1 rounded-full">
          Kontak &amp; Dealer Resmi
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B78]">
          Hubungi Diki Wahyudin — Suzuki Bandung
        </h1>
        <p className="text-sm text-gray-500">
          Konsultasikan rencana pembelian kendaraan Suzuki Anda bersama Senior Sales Consultant kami yang siap melayani dengan ramah, cepat, dan profesional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#168BFF] text-white flex items-center justify-center font-black text-2xl shadow">
                DW
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#123B78]">{siteConfig.salesName}</h3>
                <p className="text-xs text-[#168BFF] font-semibold">{siteConfig.salesRole}</p>
                <p className="text-xs text-gray-500">{siteConfig.dealerName}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#168BFF] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs uppercase text-gray-400">Alamat Showroom:</strong>
                  <span className="text-xs leading-relaxed text-gray-700">{siteConfig.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-xs uppercase text-gray-400">Telepon Langsung:</strong>
                  <a href={`tel:${siteConfig.phone}`} className="text-sm font-semibold text-[#123B78]">
                    {siteConfig.phoneNumberFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-xs uppercase text-gray-400">WhatsApp Resmi:</strong>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-emerald-600"
                  >
                    +62 851-8997-6233 (Fast Response)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500 shrink-0" />
                <div>
                  <strong className="block text-xs uppercase text-gray-400">Jam Operasional:</strong>
                  <span className="text-xs text-gray-700">{siteConfig.operatingHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-center flex items-center justify-center gap-2 shadow transition text-xs"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Mulai Percakapan WhatsApp</span>
              </a>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#123B78] hover:bg-[#0B2854] text-white font-semibold py-3 px-4 rounded-xl text-center block transition text-xs"
              >
                Buka Rute Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Map and Location Details */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#123B78]">Lokasi Dealer NJS Ahmad Yani Bandung</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Terletak di jalan protokol Ahmad Yani No. 259, showroom kami mudah dijangkau dari seluruh penjuru Bandung, Cimahi, dan sekitarnya. Kami melayani kunjungan showroom, tes kendara, hingga tukar tambah kendaraan lama Anda.
          </p>

          <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center text-center p-6 border border-gray-200">
            <div className="space-y-3 max-w-sm">
              <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center mx-auto text-[#168BFF]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-[#123B78]">Showroom PT. Nusantara Jaya Sentosa</h3>
              <p className="text-xs text-gray-500">
                Jl. Jend. Ahmad Yani No. 259, Cihapit, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40114
              </p>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#123B78] text-white text-xs font-semibold px-4 py-2 rounded-lg"
              >
                Navigasi Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
