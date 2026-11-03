"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type FinancePartner = { id: string; name: string; logo_url: string; sort_order: number };

export default function FinancePartners() {
  const [items, setItems] = useState<FinancePartner[]>([]);
  useEffect(() => {
    let active = true;
    supabase.from("finance_partners").select("id, name, logo_url, sort_order")
      .eq("is_active", true).order("sort_order", { ascending: true })
      .then(({ data }) => { if (active) setItems((data || []) as FinancePartner[]); });
    return () => { active = false; };
  }, []);

  if (!items.length) return null;
  return (
    <section className="mt-5 rounded-xl border border-slate-200 bg-white/90 p-3 sm:p-4" aria-label="Mitra pembiayaan">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-xs font-bold uppercase tracking-wide text-[#123B78]">Mitra Pembiayaan</h4>
        <span className="text-[10px] text-slate-500">Logo perusahaan pembiayaan</span>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {items.map((item) => (
          <div key={item.id} title={item.name} className="flex h-11 min-w-[76px] items-center justify-center rounded-lg border border-slate-100 bg-white px-3 py-2 shadow-sm">
            <img src={item.logo_url} alt={item.name} loading="lazy" className="max-h-7 w-auto max-w-[92px] object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
}
