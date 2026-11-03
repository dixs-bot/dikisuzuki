"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, UploadCloud, Trash2, Image as ImageIcon, Loader2, RefreshCw } from "lucide-react";

type Partner = { id: string; name: string; logo_url: string; storage_path: string; sort_order: number; is_active: boolean };
const BUCKET = "finance-partners";
const MAX_SIZE = 2 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AdminFinancePage() {
  const [items, setItems] = useState<Partner[]>([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("finance_partners").select("*").order("sort_order").order("created_at");
    if (error) setMessage(error.message);
    else setItems((data || []) as Partner[]);
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] || null;
    if (!selected) return;
    if (!TYPES.includes(selected.type) || selected.size > MAX_SIZE) {
      setMessage("Gunakan JPG, PNG, atau WebP maksimal 2 MB.");
      event.target.value = "";
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setMessage("");
  };

  const upload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !file) { setMessage("Isi nama perusahaan dan pilih file logo."); return; }
    setUploading(true); setMessage("");
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type, cacheControl: "31536000", upsert: false });
    if (uploadError) { setMessage(`Upload gagal: ${uploadError.message}`); setUploading(false); return; }
    const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(path);
    const { error: insertError } = await supabase.from("finance_partners").insert({
      name: name.trim(), logo_url: publicData.publicUrl, storage_path: path, sort_order: items.length + 1, is_active: true,
    });
    if (insertError) {
      await supabase.storage.from(BUCKET).remove([path]);
      setMessage(`Gagal menyimpan data: ${insertError.message}`);
    } else {
      setMessage("Logo mitra pembiayaan berhasil ditambahkan.");
      setName(""); setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview("");
      const input = document.getElementById("finance-logo") as HTMLInputElement | null;
      if (input) input.value = "";
      await load();
    }
    setUploading(false);
  };

  const remove = async (item: Partner) => {
    if (!window.confirm(`Hapus logo ${item.name}?`)) return;
    setBusy(item.id); setMessage("");
    const { error: rowError } = await supabase.from("finance_partners").delete().eq("id", item.id);
    if (rowError) setMessage(`Gagal menghapus data: ${rowError.message}`);
    else {
      if (item.storage_path) await supabase.storage.from(BUCKET).remove([item.storage_path]);
      setItems((current) => current.filter((row) => row.id !== item.id));
      setMessage("Logo berhasil dihapus.");
    }
    setBusy("");
  };

  const toggle = async (item: Partner) => {
    setBusy(item.id);
    const { error } = await supabase.from("finance_partners").update({ is_active: !item.is_active }).eq("id", item.id);
    if (error) setMessage(error.message);
    else setItems((current) => current.map((row) => row.id === item.id ? { ...row, is_active: !row.is_active } : row));
    setBusy("");
  };

  return <main className="min-h-screen bg-[#f5f9ff] px-4 py-8 sm:px-6"><div className="mx-auto max-w-5xl space-y-6">
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div><Link href="/admin/dashboard" className="mb-2 inline-flex items-center gap-2 text-xs font-bold text-blue-700"><ArrowLeft className="h-4 w-4" /> Dashboard</Link><h1 className="text-2xl font-extrabold text-[#123b78]">Logo Mitra Pembiayaan</h1><p className="mt-1 text-sm text-slate-500">Upload dan kelola logo finance yang tampil di bawah pilihan tenor simulasi kredit.</p></div>
      <button onClick={load} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold text-blue-700"><RefreshCw className="h-4 w-4" /> Refresh</button>
    </header>
    {message && <div className="rounded-xl border border-blue-100 bg-white p-3 text-sm text-slate-700">{message}</div>}
    <form onSubmit={upload} className="grid gap-4 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:items-end">
      <label className="block text-sm font-semibold text-[#123b78]">Nama perusahaan finance<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: BCA Finance" maxLength={100} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm font-normal outline-none focus:border-blue-500" /></label>
      <label className="block text-sm font-semibold text-[#123b78]">File logo (JPG/PNG/WebP, maks. 2 MB)<input id="finance-logo" type="file" accept="image/png,image/jpeg,image/webp" onChange={onFile} className="mt-2 block w-full text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-bold file:text-blue-700" /></label>
      <button disabled={uploading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123b78] px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />} Upload Logo</button>
      {preview && <div className="sm:col-span-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3"><img src={preview} alt="Preview logo" className="h-12 max-w-36 object-contain" /><span className="text-xs text-slate-500">Preview logo sebelum disimpan</span></div>}
    </form>
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold text-[#123b78]">Daftar Logo ({items.length})</h2><span className="text-xs text-slate-500">Logo aktif tampil di website</span></div>
      {loading ? <div className="flex items-center gap-2 py-8 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Memuat data...</div> : items.length === 0 ? <div className="py-10 text-center text-sm text-slate-500"><ImageIcon className="mx-auto mb-2 h-8 w-8 text-slate-300" />Belum ada logo. Silakan upload logo finance pertama.</div> : <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{items.map((item) => <article key={item.id} className="rounded-xl border border-slate-200 p-3"><div className="flex h-16 items-center justify-center rounded-lg bg-slate-50 p-2"><img src={item.logo_url} alt={item.name} className="max-h-12 max-w-full object-contain" /></div><h3 className="mt-2 truncate text-sm font-bold text-slate-800">{item.name}</h3><p className="text-[11px] text-slate-500">{item.is_active ? "Aktif di website" : "Disembunyikan"}</p><div className="mt-3 flex gap-2"><button type="button" disabled={busy === item.id} onClick={() => toggle(item)} className="flex-1 rounded-lg border px-2 py-2 text-[11px] font-bold text-blue-700">{item.is_active ? "Sembunyikan" : "Tampilkan"}</button><button type="button" disabled={busy === item.id} onClick={() => remove(item)} className="rounded-lg border border-red-100 px-2 py-2 text-red-600"><Trash2 className="h-4 w-4" /></button></div></article>)}</div>}
    </section>
    <p className="text-xs leading-relaxed text-slate-500">Saran: gunakan logo transparan dengan format PNG/WebP, latar transparan, dan rasio horizontal. Tampilan customer dibuat kecil dan seragam agar kalkulator tetap rapi.</p>
  </div></main>;
}
