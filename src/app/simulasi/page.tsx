import { productsData } from "@/data/products";
import CreditSimulationWidget from "@/components/CreditSimulationWidget";
import { siteConfig, getWhatsAppLink } from "@/lib/constants";
import { ShieldCheck, MessageCircle, FileText, CheckCircle2 } from "lucide-react";

export default function SimulasiPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF] bg-[#eaf4ff] px-3 py-1 rounded-full">
          Simulasi Angsuran Flat Rate
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B78]">
          Kalkulator Kredit Mobil Suzuki Bandung
        </h1>
        <p className="text-sm text-gray-500">
          Hitung estimasi Down Payment (DP) dan angsuran per bulan secara akurat menggunakan suku bunga resmi flat dealer Suzuki Ahmad Yani Bandung.
        </p>
      </div>

      {/* Main Widget */}
      <CreditSimulationWidget products={productsData} defaultProductId="xl7" />

      {/* Simulation Terms & Information */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-[#123B78] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#168BFF]" />
          <span>Ketentuan &amp; Keuntungan Kredit Bersama Diki Wahyudin</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
            <h3 className="font-bold text-[#123B78]">Pilihan Leasing Fleksibel</h3>
            <p className="text-xs leading-relaxed">
              Bekerja sama dengan BCA Finance, Mandiri Tunas Finance (MTF), Suzuki Finance, Adira Finance, OTO, dan Maybank dengan bunga kompetitif.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
            <h3 className="font-bold text-[#123B78]">Syarat Pengajuan Mudah</h3>
            <p className="text-xs leading-relaxed">
              Cukup siapkan KTP Suami/Istri, Kartu Keluarga, NPWP, PBB/Bukti Tempat Tinggal, dan Mutasi Rekening Tabungan 3 bulan terakhir.
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
            <h3 className="font-bold text-[#123B78]">Jaminan Approval Cepat</h3>
            <p className="text-xs leading-relaxed">
              Berkas dibantu dan dijemput ke rumah. Tim sales akan mengawal proses dari awal hingga PO leasing terbit dan unit dikirim.
            </p>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-emerald-900 leading-relaxed">
            <strong>Butuh hitungan khusus dengan budget DP atau cicilan tertentu?</strong> Hubungi Diki Wahyudin langsung untuk dibuatkan rincian leasing paket custom sesuai kemampuan finansial Anda.
          </div>
          <a
            href={getWhatsAppLink("Halo Kang Diki Wahyudin, saya mau minta simulasi paket kredit custom Suzuki sesuai budget saya.")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shrink-0 flex items-center gap-2 transition"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat WhatsApp Sekarang</span>
          </a>
        </div>
      </div>
    </div>
  );
}
