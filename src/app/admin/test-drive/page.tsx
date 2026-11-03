"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, RefreshCw, CalendarCheck, Phone, MapPin, Save, ExternalLink } from "lucide-react";

type RequestRow = {
  id: string; full_name: string; phone: string; preferred_date: string;
  preferred_time: string | null; product_name: string; location_type: "dealer" | "home_visit";
  address_notes: string | null; status: string; notes: string | null; created_at: string;
};
const statuses = [
  { value: "pending", label: "Menunggu" },
  { value: "contacted", label: "Sudah Dihubungi" },
  { value: "scheduled", label: "Terjadwal" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

export default function AdminTestDrivePage() {
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [busy, setBusy] = useState("");
  const [draftNotes, setDraftNotes] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true); setError("");
    let query = supabase.from("test_drive_requests")
      .select("id, full_name, phone, preferred_date, preferred_time, product_name, location_type, address_notes, status, notes, created_at")
      .order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data, error: queryError } = await query;
    if (queryError) setError(`Gagal memuat permintaan. ${queryError.message}`);
    else {
      const result = (data || []) as RequestRow[];
      setRows(result);
      setDraftNotes(Object.fromEntries(result.map((row) => [row.id, row.notes || ""])));
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (row: RequestRow, status: string) => {
    setBusy(row.id); setError("");
    const { error: updateError } = await supabase.from("test_drive_requests")
      .update({ status, updated_at: new Date().toISOString() }).eq("id", row.id);
    if (updateError) setError(`Status gagal diperbarui: ${updateError.message}`);
    else setRows((current) => current.map((item) => item.id === row.id ? { ...item, status } : item));
    setBusy("");
  };

  const saveNotes = async (row: RequestRow) => {
    setBusy(row.id); setError("");
    const { error: updateError } = await supabase.from("test_drive_requests")
      .update({ notes: draftNotes[row.id] || null, updated_at: new Date().toISOString() }).eq("id", row.id);
    if (updateError) setError(`Catatan gagal disimpan: ${updateError.message}`);
    else setRows((current) => current.map((item) => item.id === row.id ? { ...item, notes: draftNotes[row.id] || null } : item));
    setBusy("");
  };

  return <main className="min-h-screen bg-[#f5f9ff] px-4 py-8 sm:px-6">
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <div><Link href="/admin/dashboard" className="mb-2 inline-flex items-center gap-2 text-xs font-bold text-blue-700"><ArrowLeft className="h-4 w-4" /> Dashboard</Link><h1 className="text-2xl font-extrabold text-[#123b78]">Permintaan Test Drive</h1><p className="mt-1 text-sm text-slate-500">Kelola booking yang dikirim dari website customer.</p></div>
        <button onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-blue-700"><RefreshCw className="h-4 w-4" /> Refresh</button>
      </header>
      {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-blue-100 bg-white p-4">
        <span className="mr-2 text-xs font-bold text-slate-600">Filter status:</span>
        {[{ value: "all", label: "Semua" }, ...statuses].map((item) => <button key={item.value} onClick={() => setFilter(item.value)} className={`rounded-lg px-3 py-2 text-xs font-bold ${filter === item.value ? "bg-[#123b78] text-white" : "bg-slate-100 text-slate-600 hover:bg-blue-50"}`}>{item.label}</button>)}
        <span className="ml-auto text-xs text-slate-500">{rows.length} permintaan</span>
      </div>
      {loading ? <div className="rounded-2xl bg-white p-10 text-center text-sm text-slate-500">Memuat permintaan...</div> : rows.length === 0 ? <div className="rounded-2xl border border-blue-100 bg-white p-12 text-center"><CalendarCheck className="mx-auto h-10 w-10 text-blue-300" /><h2 className="mt-3 font-bold text-[#123b78]">Belum ada permintaan test drive</h2><p className="mt-1 text-sm text-slate-500">Booking baru dari customer akan muncul di halaman ini.</p></div> : <div className="space-y-4">{rows.map((row) => <article key={row.id} className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div><div className="flex flex-wrap items-center gap-2"><h2 className="text-lg font-extrabold text-[#123b78]">{row.full_name}</h2><span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-700">{row.status}</span></div><p className="mt-1 text-xs text-slate-500">Diterima {new Date(row.created_at).toLocaleString("id-ID")}</p></div>
          <a href={`https://wa.me/${row.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Halo ${row.full_name}, saya Diki dari Suzuki. Saya menghubungi terkait permintaan test drive ${row.product_name}.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white"><Phone className="h-4 w-4" /> Hubungi WhatsApp <ExternalLink className="h-3 w-3" /></a>
        </div>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <div><span className="block text-[10px] font-bold uppercase text-slate-400">Nomor HP</span><span className="font-semibold text-slate-700">{row.phone}</span></div>
          <div><span className="block text-[10px] font-bold uppercase text-slate-400">Model pilihan</span><span className="font-semibold text-slate-700">{row.product_name}</span></div>
          <div><span className="block text-[10px] font-bold uppercase text-slate-400">Tanggal test drive</span><span className="font-semibold text-slate-700">{new Date(`${row.preferred_date}T00:00:00`).toLocaleDateString("id-ID", { dateStyle: "long" })}</span></div>
          <div><span className="block text-[10px] font-bold uppercase text-slate-400">Lokasi</span><span className="font-semibold text-slate-700">{row.location_type === "dealer" ? "Showroom Ahmad Yani" : "Home Visit"}</span></div>
          {row.address_notes && <div className="sm:col-span-2"><span className="block text-[10px] font-bold uppercase text-slate-400">Alamat Home Visit</span><span className="font-semibold text-slate-700"><MapPin className="mr-1 inline h-3 w-3" />{row.address_notes}</span></div>}
        </div>
        <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-[220px_1fr_auto] sm:items-end">
          <label className="text-xs font-bold text-slate-600">Status booking<select value={row.status} disabled={busy === row.id} onChange={(e) => updateStatus(row, e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700">{statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
          <label className="text-xs font-bold text-slate-600">Catatan admin<textarea rows={2} value={draftNotes[row.id] ?? ""} onChange={(e) => setDraftNotes((current) => ({ ...current, [row.id]: e.target.value }))} placeholder="Catatan follow-up / jadwal yang disepakati..." className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-normal text-slate-700" /></label>
          <button disabled={busy === row.id} onClick={() => saveNotes(row)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#123b78] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50"><Save className="h-4 w-4" /> Simpan Catatan</button>
        </div>
      </article>)}</div>}
    </div>
  </main>;
}
