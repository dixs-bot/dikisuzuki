"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Award, MessageCircle } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="bg-[#123B78] text-gray-300 pt-14 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-[#168BFF] flex items-center justify-center font-black text-xl text-white">
                S
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-tight">SUZUKI BANDUNG</h3>
                <p className="text-xs text-gray-400 font-medium">PT. Nusantara Jaya Sentosa</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Pusat informasi harga OTR, promo diskon resmi, paket kredit DP ringan, dan pemesanan unit mobil Suzuki terbaik untuk wilayah Bandung dan sekitarnya bersama <strong>Diki Wahyudin</strong>.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 p-2.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Dealer Resmi Terpercaya &bull; Garansi Pabrik Resmi</span>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-l-4 border-[#168BFF] pl-2.5">
              Tautan Cepat
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-white transition">
                  Katalog Unit & Harga OTR
                </Link>
              </li>
              <li>
                <Link href="/simulasi" className="hover:text-white transition">
                  Kalkulator Simulasi Kredit
                </Link>
              </li>
              <li>
                <Link href="/promo" className="hover:text-white transition">
                  Promo Diskon & Cashback
                </Link>
              </li>
              <li>
                <Link href="/test-drive" className="hover:text-white transition">
                  Booking Test Drive Gratis
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition">
                  Lokasi Dealer Ahmad Yani
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-400 hover:text-white transition">
                  Portal Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Vehicles */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-l-4 border-[#168BFF] pl-2.5">
              Model Pilihan
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/mobil/xl7" className="hover:text-white transition">
                  New Suzuki XL7 Hybrid (7-Seater)
                </Link>
              </li>
              <li>
                <Link href="/mobil/ertiga" className="hover:text-white transition">
                  All New Ertiga Cruise Hybrid
                </Link>
              </li>
              <li>
                <Link href="/mobil/grand-vitara" className="hover:text-white transition">
                  Grand Vitara Intelligent Hybrid
                </Link>
              </li>
              <li>
                <Link href="/mobil/fronx" className="hover:text-white transition">
                  Suzuki Fronx Dynamic Crossover
                </Link>
              </li>
              <li>
                <Link href="/mobil/carry" className="hover:text-white transition">
                  New Carry Pick Up (Rajanya Niaga)
                </Link>
              </li>
              <li>
                <Link href="/mobil/jimny-5door" className="hover:text-white transition">
                  Jimny 5-Door 4x4 Legend
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Showroom */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-l-4 border-[#168BFF] pl-2.5">
              Kontak Sales Consultant
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#168BFF] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition">
                  {siteConfig.phoneNumberFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition text-emerald-400 font-medium"
                >
                  WhatsApp: +62 851-8997-6233
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-xs">{siteConfig.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-xs">{siteConfig.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>
            &copy; {new Date().getFullYear()} Suzuki Sales Consultant Bandung &bull; <strong>Diki Wahyudin</strong>. Hak Cipta Dilindungi.
          </p>
          <p className="text-gray-400">
            Nusantara Jaya Sentosa (NJS) Ahmad Yani, Kota Bandung
          </p>
        </div>
      </div>
    </footer>
  );
}
