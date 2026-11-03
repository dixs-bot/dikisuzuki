"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig, getWhatsAppLink } from "@/lib/constants";
import { Menu, X, Phone, MapPin, MessageCircle, ChevronRight } from "lucide-react";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog Mobil" },
  { href: "/simulasi", label: "Simulasi Kredit" },
  { href: "/promo", label: "Promo" },
  { href: "/test-drive", label: "Test Drive" },
  { href: "/kontak", label: "Kontak" },
  { href: "/artikel", label: "Artikel" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 text-slate-800 backdrop-blur-xl">
      <div className="hidden border-b border-slate-100 bg-slate-50/80 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 text-[11px] text-slate-500 lg:px-8">
          <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-blue-700" />{siteConfig.dealerName}</span>
          <span className="flex items-center gap-2">Konsultasi dengan <strong className="font-semibold text-slate-700">{siteConfig.salesName}</strong><a href={`tel:${siteConfig.phone}`} className="ml-2 inline-flex items-center gap-1 font-semibold text-blue-800 hover:text-blue-600"><Phone className="h-3 w-3" />{siteConfig.phoneNumberFormatted}</a></span>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Suzuki Diki Wahyudin beranda">
          <span className="flex h-11 w-[148px] shrink-0 items-center sm:w-[166px]">
            <img src="/suzuki-logo.svg" alt="Suzuki" className="h-auto w-full object-contain" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="mobile-brand-title block truncate text-sm font-extrabold tracking-[.025em] text-[#173b65] sm:text-base">BANDUNG</span>
            <span className="mobile-brand-subtitle mt-1 block truncate text-[10px] font-medium tracking-wide text-slate-500">Diki Wahyudin · Sales Consultant</span>
          </span>
        </Link>
        <div className="hidden items-center gap-5 xl:flex">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return <Link key={link.href} href={link.href} className={`relative py-2 text-[13px] font-semibold transition-colors ${active ? "text-blue-800" : "text-slate-600 hover:text-blue-800"}`}>
              {link.label}{active && <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-blue-700" />}
            </Link>;
          })}
        </div>
        <div className="hidden xl:block">
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#123b78] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#0d2d59]"><MessageCircle className="h-4 w-4" /> Hubungi Sales</a>
        </div>
        <button type="button" onClick={() => setMobileMenuOpen((v) => !v)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 xl:hidden" aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"} aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </nav>
      {mobileMenuOpen && <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-lg xl:hidden">
        <div className="mx-auto max-w-7xl space-y-1">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold ${pathname === link.href ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50 hover:text-blue-800"}`}>{link.label}<ChevronRight className="h-4 w-4 opacity-40" /></Link>)}
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#123b78] px-4 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> Hubungi Diki via WhatsApp</a>
        </div>
      </div>}
    </header>
  );
}
