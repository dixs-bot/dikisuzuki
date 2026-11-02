"use client";

import { siteConfig, getWhatsAppLink } from "@/lib/constants";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <aside aria-label="WhatsApp Floating Action Button" className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex items-center gap-2 group sm:bottom-6 sm:right-6">
      <div className="hidden sm:flex bg-white text-[#123B78] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-gray-200 group-hover:scale-105 transition">
        Konsultasi Sales: Diki Wahyudin
      </div>
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Diki Wahyudin"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 sm:h-14 sm:w-14 hover:bg-emerald-600 text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <MessageCircle className="h-6 w-6 fill-current sm:h-8 sm:w-8" />
      </a>
    </aside>
  );
}
