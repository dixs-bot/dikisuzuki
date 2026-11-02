"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-white/10 bg-[#102f52] pt-12 pb-7 text-slate-300 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_.9fr_1.15fr] lg:gap-12">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg font-extrabold text-[#123b78]">S</div>
              <div>
                <h3 className="text-base font-extrabold tracking-tight text-white">SUZUKI BANDUNG</h3>
                <p className="text-[11px] text-slate-400">Diki Wahyudin · Sales Consultant</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-300">
              Informasi pilihan mobil Suzuki, tipe kendaraan, harga referensi, simulasi pembelian, dan konsultasi langsung untuk area Bandung dan sekitarnya.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Navigasi</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-white">Beranda</Link></li>
              <li><Link href="/katalog" className="hover:text-white">Katalog Mobil</Link></li>
              <li><Link href="/simulasi" className="hover:text-white">Simulasi Kredit</Link></li>
              <li><Link href="/promo" className="hover:text-white">Informasi Promo</Link></li>
              <li><Link href="/test-drive" className="hover:text-white">Test Drive</Link></li>
              <li><Link href="/kontak" className="hover:text-white">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Model Suzuki</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/mobil/xl7" className="hover:text-white">Suzuki XL7</Link></li>
              <li><Link href="/mobil/ertiga" className="hover:text-white">Suzuki Ertiga</Link></li>
              <li><Link href="/mobil/grand-vitara" className="hover:text-white">Grand Vitara</Link></li>
              <li><Link href="/mobil/fronx" className="hover:text-white">Suzuki Fronx</Link></li>
              <li><Link href="/mobil/carry" className="hover:text-white">Suzuki Carry</Link></li>
              <li><Link href="/mobil/jimny-5door" className="hover:text-white">Suzuki Jimny</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Hubungi Sales</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" /><span className="text-xs leading-6">{siteConfig.address}</span></div>
              <div className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-blue-300" /><a href={`tel:${siteConfig.phone}`} className="hover:text-white">{siteConfig.phoneNumberFormatted}</a></div>
              <div className="flex items-center gap-2.5"><MessageCircle className="h-4 w-4 shrink-0 text-emerald-300" /><a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-white">WhatsApp Diki</a></div>
              <div className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-blue-300" /><span className="text-xs">{siteConfig.email}</span></div>
              <div className="flex items-start gap-2.5"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" /><span className="text-xs leading-5">{siteConfig.operatingHours}</span></div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-5 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Diki Wahyudin · Informasi dan konsultasi mobil Suzuki Bandung.</p>
          <p>Harga, promo, dan ketersediaan unit dapat berubah. Silakan konfirmasi sebelum transaksi.</p>
        </div>
      </div>
    </footer>
  );
}
