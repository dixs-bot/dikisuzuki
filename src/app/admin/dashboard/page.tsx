"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Car, Image as ImageIcon, Palette, CalendarCheck, ArrowRight, LogOut, RefreshCw, ShieldCheck, FileText, WalletCards, CalendarDays } from "lucide-react";

type Metrics = { products: number; variants: number; colors: number; photos: number; requests: number };
type RecentRequest = { id: string; full_name: string; product_name: string; status: string; created_at: string };

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics>({ products: 0, variants: 0, colors: 0, photos: 0, requests: 0 });
  const [recent, setRecent] = useState<RecentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");
    const [products, variants, colors, photos, requests, recentRows] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("product_variants").select("id", { count: "exact", head: true }).eq("is_active", true),
      supabase.from("vehicle_colors").select("id", { count: "exact", head: true }),
      supabase.from("vehicle_photos").select("id", { count: "exact", head: true }),
      supabase.from("test_drive_requests").select("id", { count: "exact", head: true }),
      supabase.from("test_drive_requests").select("id, full_name, product_name, status, created_at").order("created_at", { ascending: false }).limit(5),
    ]);
    const failures = [products.error, variants.error, colors.error, photos.error, requests.error, recentRows.error].filter(Boolean);
    if (failures.length) setError("Sebagian statistik belum dapat dimuat. Periksa migration, koneksi Supabase, dan kebijakan RLS.");
    setMetrics({ products: products.count || 0, variants: variants.count || 0, colors: colors.count || 0, photos: photos.count || 0, requests: requests.count || 0 });
    setRecent((recentRows.data || []) as RecentRequest[]);
    setLoading(false);
  };

  useEffect(() => { loadDashboard(); }, []);

  const logout = async () => { await supabase.auth.signOut(); window.location.href = "/admin/login"; };
  const cards = [
    { label: "Model Kendaraan", value: metrics.products, icon: Car, note: "Produk aktif" },
    { label: "Tipe / Varian", value: metrics.variants, icon: ShieldCheck, note: "Varian terdaftar" },
    { label: "Pilihan Warna", value: metrics.colors, icon: Palette, note: "Warna kendaraan" },
    { label: "Foto Galeri", value: metrics.photos, icon: ImageIcon, note: "Foto di database" },
  ];

  return <main className="min-h-screen bg-[#f5f9ff] px-4 py-8 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl space-y-7">
    <header className="flex flex-col justify-between gap-4 rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm sm:flex-row sm:items-center"><div><span className="section-kicker">Admin Control Center</span><h1 className="mt-2 text-2xl font-extrabold text-[#123b78]">Dashboard Diki Wahyudin</h1><p className="mt-1 text-xs text-slate-500">Ringkasan data dari project Supabase yang terhubung.</p></div><div className="flex flex-wrap gap-2"><button onClick={loadDashboard} className="inline-flex items-center gap-2 rounded-xl border border-[#dce8f5] bg-[#f5f9ff] px-4 py-2.5 text-xs font-bold text-[#1765c0]"><RefreshCw className="h-4 w-4" /> Refresh</button><Link href="/admin/gallery" className="btn-neon inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"><ImageIcon className="h-4 w-4" /> Kelola Galeri</Link><Link href="/admin/test-drive" className="inline-flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-700"><CalendarDays className="h-4 w-4" /> Booking Test Drive</Link><Link href="/admin/finance" className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-xs font-bold text-emerald-700"><WalletCards className="h-4 w-4" /> Logo Finance</Link><Link href="/admin/articles" className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700"><FileText className="h-4 w-4" /> Kelola Artikel</Link><button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"><LogOut className="h-4 w-4" /> Keluar</button></div></header>
    {error && <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">{error}</div>}
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({ label, value, icon: Icon, note }) => <div key={label} className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#168bff]"><Icon className="h-5 w-5" /></span></div><div className="mt-4 text-3xl font-black text-[#123b78]">{loading ? "—" : value}</div><p className="mt-1 text-[11px] text-slate-400">{note}</p></div>)}</section>
    <section className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#168bff]"><FileText className="h-5 w-5" /></span><div><h2 className="font-extrabold text-[#123b78]">Pengelolaan Artikel</h2><p className="text-[11px] text-slate-500">Buat artikel, simpan draft, dan publikasikan ke website.</p></div></div><Link href="/admin/articles" className="inline-flex items-center gap-2 self-start rounded-xl bg-[#123b78] px-4 py-3 text-xs font-bold text-white hover:bg-[#0d2d59]">Buka Manajemen Artikel <ArrowRight className="h-4 w-4" /></Link></div></section>
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm lg:col-span-2"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#168bff]"><ImageIcon className="h-5 w-5" /></span><div><h2 className="font-extrabold text-[#123b78]">Pengelolaan Galeri</h2><p className="text-[11px] text-slate-500">Upload foto berdasarkan model dan warna.</p></div></div><p className="mt-4 text-xs leading-6 text-slate-600">Kelola foto eksterior, interior, fitur, dan detail kendaraan melalui Supabase Storage. Foto akan tercatat di tabel galeri.</p><Link href="/admin/gallery" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#eaf4ff] px-4 py-3 text-xs font-bold text-[#1765c0] hover:bg-[#dceeff]">Buka Pengelola Galeri <ArrowRight className="h-4 w-4" /></Link></div>
      <div className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm lg:col-span-3"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-extrabold text-[#123b78]">Permintaan Test Drive Terbaru</h2><p className="text-[11px] text-slate-500">Data aktual dari Supabase</p></div><span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-[10px] font-bold text-[#1765c0]">{metrics.requests} permintaan</span></div>{loading ? <p className="py-8 text-center text-xs text-slate-400">Memuat data...</p> : recent.length ? <div className="divide-y divide-[#edf3fa]">{recent.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 py-3"><div className="min-w-0"><strong className="block truncate text-xs text-[#123b78]">{item.full_name}</strong><span className="text-[11px] text-slate-500">{item.product_name} · {new Date(item.created_at).toLocaleDateString("id-ID")}</span></div><span className="shrink-0 rounded-full bg-[#f5f9ff] px-2.5 py-1 text-[10px] font-semibold capitalize text-[#1765c0]">{item.status}</span></div>)}</div> : <div className="py-8 text-center"><CalendarCheck className="mx-auto h-8 w-8 text-[#9bc9f8]" /><p className="mt-2 text-xs font-semibold text-[#123b78]">Belum ada permintaan test drive</p><p className="mt-1 text-[11px] text-slate-400">Permintaan pelanggan akan muncul di sini.</p></div>}</div>
    </section>
  </div></main>;
}
