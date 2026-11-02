"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig, getWhatsAppLink } from "@/lib/constants";
import { Menu, X, Phone, MapPin, MessageCircle, ChevronDown } from "lucide-react";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog Mobil" },
  { href: "/simulasi", label: "Simulasi Kredit" },
  { href: "/promo", label: "Promo" },
  { href: "/test-drive", label: "Test Drive" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-[#dce8f5]/90 bg-white/90 text-[#172438] shadow-[0_4px_24px_rgba(18,59,120,.045)] backdrop-blur-xl">
      <div className="hidden border-b border-[#e7f0fb] bg-[#f5f9ff] sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] text-slate-600 sm:px-6 lg:px-8">
          <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#168bff]" />{siteConfig.dealerName}</span>
          <span className="flex items-center gap-2">Konsultasi bersama <strong className="text-[#123b78]">{siteConfig.salesName}</strong><a href={`tel:${siteConfig.phone}`} className="ml-2 inline-flex items-center gap-1 font-semibold text-[#1765c0] hover:text-[#168bff]"><Phone className="h-3 w-3" />{siteConfig.phoneNumberFormatted}</a></span>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Suzuki Diki Wahyudin beranda">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#123b78] to-[#168bff] text-xl font-black tracking-tight text-white shadow-[0_7px_18px_rgba(22,139,255,.25)]">S<span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#38a5ff]" /></span>
          <span className="leading-tight"><span className="block text-[15px] font-extrabold tracking-[.08em] text-[#123b78]">SUZUKI <span className="text-[#168bff]">SHOWROOM</span></span><span className="mt-0.5 block text-[10px] font-medium tracking-wide text-slate-500">Diki Wahyudin · Sales Consultant</span></span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return <Link key={link.href} href={link.href} className={`relative py-2 text-[13px] font-semibold transition ${active ? "text-[#168bff]" : "text-slate-600 hover:text-[#168bff]"}`}>
              {link.label}{active && <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-[#1765c0] to-[#38a5ff]" />}
            </Link>;
          })}
        </div>

        <div className="hidden lg:block">
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-neon inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"><MessageCircle className="h-4 w-4" /> Konsultasi</a>
        </div>

        <button type="button" onClick={() => setMobileMenuOpen((v) => !v)} className="rounded-xl border border-[#dce8f5] bg-[#f5f9ff] p-2 text-[#123b78] lg:hidden" aria-label="Buka menu navigasi" aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </nav>

      {mobileMenuOpen && <div className="border-t border-[#e7f0fb] bg-white px-4 pb-5 pt-3 shadow-xl lg:hidden">
        <div className="mx-auto max-w-7xl space-y-1">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ${pathname === link.href ? "bg-[#eaf4ff] text-[#1765c0]" : "text-slate-600 hover:bg-[#f5f9ff] hover:text-[#1765c0]"}`}>{link.label}<ChevronDown className="h-3.5 w-3.5 -rotate-90 opacity-40" /></Link>)}
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-neon mt-3 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"><MessageCircle className="h-4 w-4" /> Hubungi Diki via WhatsApp</a>
        </div>
      </div>}
    </header>
  );
}
