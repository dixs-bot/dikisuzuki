"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { slugify, type Article } from "@/lib/articles";
import { FileText, Plus, Pencil, Trash2, ExternalLink, Save, X, RefreshCw } from "lucide-react";

type ArticleForm = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  author: string;
  status: "draft" | "published";
  seo_title: string;
  seo_description: string;
};
const emptyForm: ArticleForm = { title: "", slug: "", excerpt: "", content: "", cover_image_url: "", author: "Diki Wahyudin", status: "draft", seo_title: "", seo_description: "" };

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [form, setForm] = useState<ArticleForm>(emptyForm);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const generatedSlug = useMemo(() => slugify(form.title), [form.title]);

  async function loadArticles() {
    setLoading(true); setError("");
    const { data, error: queryError } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (queryError) setError(queryError.message.includes("articles") ? "Tabel articles belum tersedia. Jalankan migration 04_articles.sql di Supabase SQL Editor." : queryError.message);
    setArticles((data || []) as Article[]); setLoading(false);
  }
  useEffect(() => { void loadArticles(); }, []);

  function startNew() { setForm(emptyForm); setEditing(true); setSlugTouched(false); setNotice(""); setError(""); }
  function startEdit(article: Article) {
    setForm({ id: article.id, title: article.title, slug: article.slug, excerpt: article.excerpt || "", content: article.content || "", cover_image_url: article.cover_image_url || "", author: article.author || "Diki Wahyudin", status: article.status, seo_title: article.seo_title || "", seo_description: article.seo_description || "" });
    setEditing(true); setSlugTouched(true); setNotice(""); setError("");
  }
  async function uploadCover(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/") || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setError("Gunakan gambar JPG, PNG, atau WebP."); return; }
    if (file.size > 5 * 1024 * 1024) { setError("Ukuran gambar maksimal 5 MB."); return; }
    setUploading(true); setError("");
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("article-covers").upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });
    if (uploadError) setError(`Upload gambar gagal: ${uploadError.message}. Pastikan migration 04_articles.sql sudah dijalankan.`);
    else {
      const { data } = supabase.storage.from("article-covers").getPublicUrl(path);
      setForm((current) => ({ ...current, cover_image_url: data.publicUrl }));
      setNotice("Gambar sampul berhasil diunggah.");
    }
    setUploading(false);
  }

  async function saveArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError(""); setNotice("");
    const payload = {
      title: form.title.trim(), slug: (form.slug || generatedSlug).trim(), excerpt: form.excerpt.trim(), content: form.content.trim(),
      cover_image_url: form.cover_image_url.trim() || null, author: form.author.trim() || "Diki Wahyudin", status: form.status,
      seo_title: form.seo_title.trim() || null, seo_description: form.seo_description.trim() || null,
    };
    if (!payload.title || !payload.slug || !payload.content) { setError("Judul, slug, dan isi artikel wajib diisi."); setSaving(false); return; }
    const query = form.id ? supabase.from("articles").update(payload).eq("id", form.id) : supabase.from("articles").insert(payload);
    const { error: saveError } = await query;
    if (saveError) setError(saveError.code === "23505" ? "Slug sudah digunakan. Ubah slug artikel ini." : saveError.message);
    else { setNotice(form.id ? "Artikel berhasil diperbarui." : "Artikel berhasil disimpan."); setEditing(false); setForm(emptyForm); await loadArticles(); }
    setSaving(false);
  }
  async function deleteArticle(article: Article) {
    if (!window.confirm(`Hapus artikel “${article.title}”? Tindakan ini tidak dapat dibatalkan.`)) return;
    const { error: deleteError } = await supabase.from("articles").delete().eq("id", article.id);
    if (deleteError) setError(deleteError.message); else { setNotice("Artikel berhasil dihapus."); await loadArticles(); }
  }

  return <main className="min-h-screen bg-[#f5f9ff] px-4 py-8 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl space-y-6">
    <header className="flex flex-col justify-between gap-4 rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm sm:flex-row sm:items-center"><div><Link href="/admin/dashboard" className="text-xs font-semibold text-blue-700 hover:underline">← Kembali ke dashboard</Link><h1 className="mt-2 text-2xl font-extrabold text-[#123b78]">Manajemen Artikel</h1><p className="mt-1 text-sm text-slate-500">Tulis, edit, simpan sebagai draft, dan terbitkan artikel website.</p></div><div className="flex flex-wrap gap-2"><button onClick={() => void loadArticles()} className="inline-flex items-center gap-2 rounded-xl border border-[#dce8f5] px-4 py-2.5 text-sm font-bold text-[#1765c0]"><RefreshCw className="h-4 w-4"/> Refresh</button><button onClick={startNew} className="inline-flex items-center gap-2 rounded-xl bg-[#123b78] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0d2d59]"><Plus className="h-4 w-4"/> Tulis Artikel</button></div></header>
    {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}{notice && <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">{notice}</div>}
    {editing && <section className="rounded-3xl border border-[#dce8f5] bg-white p-5 shadow-sm sm:p-7"><div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-extrabold text-[#123b78]">{form.id ? "Edit Artikel" : "Artikel Baru"}</h2><p className="mt-1 text-xs text-slate-500">Isi konten dan tentukan status publikasi.</p></div><button onClick={() => setEditing(false)} aria-label="Tutup formulir" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5"/></button></div>
      <form onSubmit={saveArticle} className="grid gap-4 lg:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700 lg:col-span-2">Judul artikel *<input required maxLength={180} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugTouched ? form.slug : slugify(e.target.value) })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Contoh: Tips Memilih Mobil Suzuki untuk Keluarga"/></label>
        <label className="block text-sm font-semibold text-slate-700">Slug URL *<input required value={form.slug} onChange={(e) => { setSlugTouched(true); setForm({ ...form, slug: slugify(e.target.value) }); }} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500" placeholder={generatedSlug}/><span className="mt-1 block text-[11px] font-normal text-slate-400">URL: /artikel/{form.slug || generatedSlug || "judul-artikel"}</span></label>
        <label className="block text-sm font-semibold text-slate-700">Penulis<input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500"/></label>
        <label className="block text-sm font-semibold text-slate-700 lg:col-span-2">Ringkasan artikel *<textarea required rows={3} maxLength={320} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500" placeholder="Ringkasan singkat yang tampil pada daftar artikel dan hasil pencarian."/></label>
        <div className="block text-sm font-semibold text-slate-700 lg:col-span-2"><label>Gambar sampul (opsional)<input type="file" accept="image/png,image/jpeg,image/webp" disabled={uploading} onChange={(e) => void uploadCover(e.target.files?.[0])} className="mt-2 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-normal file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-semibold file:text-blue-700"/></label><p className="mt-1 text-[11px] font-normal text-slate-400">{uploading ? "Mengunggah gambar..." : "JPG, PNG, WebP maksimal 5 MB. Gambar disimpan di Supabase Storage."}</p>{form.cover_image_url && <div className="mt-3 flex items-center gap-3"><img src={form.cover_image_url} alt="Preview sampul" className="h-20 w-32 rounded-lg object-cover"/><button type="button" onClick={() => setForm({ ...form, cover_image_url: "" })} className="text-xs font-semibold text-red-600">Hapus pilihan gambar</button></div>}</div>
        <label className="block text-sm font-semibold text-slate-700 lg:col-span-2">Isi artikel *<textarea required rows={14} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal leading-7 outline-none focus:border-blue-500" placeholder="Tulis artikel di sini. Pisahkan paragraf dengan baris baru."/></label>
        <label className="block text-sm font-semibold text-slate-700">SEO title<input maxLength={70} value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500" placeholder="Judul untuk Google (opsional)"/></label>
        <label className="block text-sm font-semibold text-slate-700">SEO description<input maxLength={160} value={form.seo_description} onChange={(e) => setForm({ ...form, seo_description: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-blue-500" placeholder="Deskripsi untuk Google (opsional)"/></label>
        <label className="block text-sm font-semibold text-slate-700">Status publikasi<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-blue-500"><option value="draft">Draft — belum tampil di website</option><option value="published">Terbitkan — tampil untuk pengunjung</option></select></label>
        <div className="flex flex-wrap items-end gap-2"><button disabled={saving} type="submit" className="inline-flex items-center gap-2 rounded-xl bg-[#123b78] px-5 py-3 text-sm font-bold text-white disabled:opacity-60"><Save className="h-4 w-4"/>{saving ? "Menyimpan..." : "Simpan Artikel"}</button><button type="button" onClick={() => setEditing(false)} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600">Batal</button></div>
      </form>
    </section>}
    <section className="overflow-hidden rounded-3xl border border-[#dce8f5] bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 p-5"><div><h2 className="font-extrabold text-[#123b78]">Daftar Artikel</h2><p className="mt-1 text-xs text-slate-500">{articles.length} artikel tersimpan</p></div><FileText className="h-6 w-6 text-blue-600"/></div>
      {loading ? <p className="p-10 text-center text-sm text-slate-400">Memuat artikel...</p> : articles.length ? <div className="divide-y divide-slate-100">{articles.map((article) => <div key={article.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-[#123b78]">{article.title}</h3><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${article.status === "published" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{article.status === "published" ? "Terbit" : "Draft"}</span></div><p className="mt-1 line-clamp-2 text-xs text-slate-500">{article.excerpt}</p><p className="mt-2 text-[11px] text-slate-400">/artikel/{article.slug} · {new Date(article.updated_at).toLocaleDateString("id-ID")}</p></div><div className="flex shrink-0 gap-2"><button onClick={() => startEdit(article)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"><Pencil className="h-3.5 w-3.5"/> Edit</button>{article.status === "published" && <Link href={`/artikel/${article.slug}`} target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-blue-100 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-50"><ExternalLink className="h-3.5 w-3.5"/> Lihat</Link>}<button onClick={() => void deleteArticle(article)} className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"><Trash2 className="h-3.5 w-3.5"/> Hapus</button></div></div>)}</div> : <div className="p-12 text-center"><FileText className="mx-auto h-10 w-10 text-blue-200"/><p className="mt-3 font-bold text-[#123b78]">Belum ada artikel</p><p className="mt-1 text-sm text-slate-500">Klik “Tulis Artikel” untuk membuat artikel pertama.</p></div>}
    </section>
  </div></main>;
}
