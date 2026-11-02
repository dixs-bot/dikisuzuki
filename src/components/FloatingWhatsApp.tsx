"use client";

import { siteConfig, getWhatsAppLink } from "@/lib/constants";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <aside aria-label="WhatsApp Floating Action Button" className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group">
      <div className="hidden sm:flex bg-white text-[#123B78] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-gray-200 group-hover:scale-105 transition">
        Konsultasi Sales: Diki Wahyudin
      </div>
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Diki Wahyudin"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </a>
    </aside>
  );
}
