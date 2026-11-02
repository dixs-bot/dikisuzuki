"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, UploadCloud, Trash2, Image as ImageIcon, Loader2, AlertCircle, CheckCircle2, Star, RefreshCw } from "lucide-react";

type ProductRow = { id: string; slug: string; name: string };
type ColorRow = { id: string; product_id: string; name: string; hex_code: string };
type PhotoRow = { id: string; product_id: string | null; title: string; caption: string | null; category: string; image_url: string; storage_path: string | null; sort_order: number; is_featured: boolean; color_id?: string | null };
const BUCKET = "vehicle-gallery";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

export default function AdminGalleryPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [colors, setColors] = useState<ColorRow[]>([]);
  const [photos, setPhotos] = useState<PhotoRow[]>([]);
  const [productId, setProductId] = useState("");
  const [colorId, setColorId] = useState("");
  const [category, setCategory] = useState("exterior");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const availableColors = useMemo(() => colors.filter((color) => color.product_id === productId), [colors, productId]);

  useEffect(() => () => { previews.forEach((url) => URL.revokeObjectURL(url)); }, [previews]);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [{ data: productRows, error: productError }, { data: colorRows, error: colorError }, { data: photoRows, error: photoError }] = await Promise.all([
      supabase.from("products").select("id, slug, name").eq("is_active", true).order("sort_order"),
      supabase.from("vehicle_colors").select("id, product_id, name, hex_code").order("sort_order"),
      supabase.from("vehicle_photos").select("id, product_id, title, caption, category, image_url, storage_path, sort_order, is_featured, color_id").order("sort_order", { ascending: true }),
    ]);
    if (productError || colorError || photoError) {
      setMessage({ type: "error", text: [productError?.message, colorError?.message, photoError?.message].filter(Boolean).join(" · ") || "Gagal mengambil data galeri." });
    } else {
      const productList = (productRows || []) as ProductRow[];
      setProducts(productList);
      setColors((colorRows || []) as ColorRow[]);
      setPhotos((photoRows || []) as PhotoRow[]);
      if (!productId && productList[0]) setProductId(productList[0].id);
    }
    setLoading(false);
  }, [productId]);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    if (availableColors.length && !availableColors.some((color) => color.id === colorId)) setColorId(availableColors[0].id);
    if (!availableColors.length) setColorId("");
  }, [availableColors, colorId]);

  const onFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    const invalid = selected.find((file) => !allowedTypes.includes(file.type) || file.size > MAX_FILE_SIZE);
    if (invalid) {
      setMessage({ type: "error", text: `${invalid.name}: gunakan JPG, PNG, atau WebP maksimal 5 MB per foto.` });
      event.target.value = "";
      return;
    }
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
    setFiles(selected);
    if (selected.length && !title) setTitle(selected[0].name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!productId || !files.length) {
      setMessage({ type: "error", text: "Pilih produk dan minimal satu foto." });
      return;
    }
    if (!colorId) {
      setMessage({ type: "error", text: "Produk ini belum memiliki data warna di Supabase. Tambahkan warna terlebih dahulu." });
      return;
    }
    setUploading(true);
    setMessage(null);
    let completed = 0;
    const product = products.find((item) => item.id === productId);
    const color = colors.find((item) => item.id === colorId);
    for (const [index, file] of files.entries()) {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
      const storagePath = `${product?.slug || productId}/${colorId}/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(storagePath, file, { contentType: file.type, cacheControl: "31536000", upsert: false });
      if (uploadError) {
        setMessage({ type: "error", text: `Upload ${file.name} gagal: ${uploadError.message}. ${completed} foto berhasil disimpan.` });
        break;
      }
      const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
      const { error: insertError } = await supabase.from("vehicle_photos").insert({
        product_id: productId,
        color_id: colorId,
        title: title.trim() ? `${title.trim()}${files.length > 1 ? ` ${index + 1}` : ""}` : file.name,
        caption: color?.name || null,
        category,
        image_url: publicData.publicUrl,
        storage_path: storagePath,
        sort_order: photos.length + index + 1,
        is_featured: photos.length === 0 && index === 0,
      });
      if (insertError) {
        await supabase.storage.from(BUCKET).remove([storagePath]);
        setMessage({ type: "error", text: `Metadata ${file.name} gagal disimpan: ${insertError.message}. File sementara dibersihkan.` });
        break;
      }
      completed += 1;
    }
    if (completed === files.length) setMessage({ type: "success", text: `${completed} foto berhasil diunggah ke Supabase Storage dan dicatat di database.` });
    setFiles([]);
    setPreviews([]);
    setTitle("");
    const input = document.getElementById("gallery-files") as HTMLInputElement | null;
    if (input) input.value = "";
    await loadData();
    setUploading(false);
  };

  const handleDelete = async (photo: PhotoRow) => {
    if (!window.confirm(`Hapus foto “${photo.title}”? Tindakan ini tidak dapat dibatalkan.`)) return;
    setBusyId(photo.id);
    setMessage(null);
    const { error: rowError } = await supabase.from("vehicle_photos").delete().eq("id", photo.id);
    if (rowError) {
      setMessage({ type: "error", text: `Gagal menghapus metadata foto: ${rowError.message}` });
      setBusyId(null);
      return;
    }
    if (photo.storage_path) {
      const { error: storageError } = await supabase.storage.from(BUCKET).remove([photo.storage_path]);
      if (storageError) setMessage({ type: "error", text: `Metadata terhapus, tetapi file Storage perlu dibersihkan manual: ${storageError.message}` });
      else setMessage({ type: "success", text: "Foto berhasil dihapus dari galeri dan Storage." });
    } else setMessage({ type: "success", text: "Foto berhasil dihapus dari database." });
    await loadData();
    setBusyId(null);
  };

  const setPrimary = async (photo: PhotoRow) => {
    setBusyId(photo.id);
    let clearQuery = supabase.from("vehicle_photos").update({ is_featured: false }).eq("product_id", photo.product_id);
    if (photo.color_id) clearQuery = clearQuery.eq("color_id", photo.color_id);
    const { error: clearError } = await clearQuery;
    if (clearError) {
      setMessage({ type: "error", text: `Gagal memperbarui foto utama: ${clearError.message}` });
    } else {
      const { error } = await supabase.from("vehicle_photos").update({ is_featured: true }).eq("id", photo.id);
      if (error) setMessage({ type: "error", text: `Gagal menetapkan foto utama: ${error.message}` });
      else { setMessage({ type: "success", text: "Foto utama berhasil diperbarui." }); await loadData(); }
    }
    setBusyId(null);
  };

  const productName = (id: string | null) => products.find((product) => product.id === id)?.name || "Produk tidak ditemukan";
  const colorName = (id?: string | null) => colors.find((color) => color.id === id)?.name || "Warna belum ditentukan";

  return <main className="min-h-screen bg-[#f5f9ff] px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl space-y-7">
      <header className="flex flex-col justify-between gap-4 rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div><Link href="/admin/dashboard" className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#168bff]"><ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Dashboard</Link><span className="section-kicker">Media Management</span><h1 className="mt-2 text-2xl font-extrabold text-[#123b78]">Galeri Kendaraan</h1><p className="mt-1 text-xs text-slate-500">Upload dan kelola foto berdasarkan model serta warna kendaraan.</p></div>
        <button onClick={loadData} type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dce8f5] bg-[#f5f9ff] px-4 py-2.5 text-xs font-bold text-[#1765c0] hover:border-[#168bff]"><RefreshCw className="h-4 w-4" /> Segarkan Data</button>
      </header>

      {message && <div role="status" className={`flex items-start gap-2 rounded-xl border p-3 text-xs leading-5 ${message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-[#eaf4ff] text-red-700"}`}>{message.type === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}{message.text}</div>}

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-5">
        <section className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#168bff]"><UploadCloud className="h-5 w-5" /></div><div><h2 className="font-extrabold text-[#123b78]">Upload Foto</h2><p className="text-[11px] text-slate-500">Bucket: {BUCKET}</p></div></div>
          <form onSubmit={handleUpload} className="space-y-4">
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Model Kendaraan</span><select required value={productId} onChange={(event) => setProductId(event.target.value)} className="input-premium" disabled={loading}><option value="">Pilih kendaraan</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Warna Kendaraan</span><select required value={colorId} onChange={(event) => setColorId(event.target.value)} className="input-premium" disabled={!availableColors.length}><option value="">Pilih warna</option>{availableColors.map((color) => <option key={color.id} value={color.id}>{color.name}</option>)}</select></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Kategori Foto</span><select value={category} onChange={(event) => setCategory(event.target.value)} className="input-premium"><option value="exterior">Eksterior</option><option value="interior">Interior</option><option value="feature">Fitur & Detail</option><option value="delivery">Serah Terima</option><option value="event">Event</option></select></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Judul / Keterangan</span><input value={title} onChange={(event) => setTitle(event.target.value)} className="input-premium" placeholder="Contoh: Tampak depan XL7 putih" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Pilih Foto (bisa lebih dari satu)</span><span className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-[#a9d3ff] bg-[#f5faff] px-4 py-7 text-center hover:border-[#168bff] hover:bg-[#eaf4ff]"><UploadCloud className="mb-2 h-7 w-7 text-[#168bff]" /><strong className="text-xs text-[#1765c0]">Klik untuk memilih foto</strong><span className="mt-1 text-[10px] text-slate-500">JPG, PNG, WebP · Maksimal 5 MB per file</span><input id="gallery-files" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={onFilesChange} className="sr-only" /></span></label>
            {files.length > 0 && <div className="rounded-xl bg-[#f5f9ff] p-3 text-xs text-slate-600"><strong className="text-[#123b78]">Preview {files.length} foto</strong><div className="mt-3 grid grid-cols-3 gap-2">{previews.map((url, index) => <div key={url} className="overflow-hidden rounded-lg border border-[#dce8f5] bg-white"><img src={url} alt={`Preview ${files[index]?.name || index + 1}`} className="aspect-square w-full object-cover" /><p className="truncate px-1.5 py-1 text-[9px] text-slate-500">{files[index]?.name}</p></div>)}</div></div>}
            <button type="submit" disabled={uploading || loading || !files.length || !productId || !colorId} className="btn-neon flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50">{uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> Mengunggah...</> : <><UploadCloud className="h-4 w-4" /> Upload ke Supabase</>}</button>
            {!loading && products.length === 0 && <p className="text-xs text-amber-700">Data produk belum tersedia di Supabase. Jalankan migration dan seed terlebih dahulu.</p>}
          </form>
        </section>

        <section className="space-y-4 xl:col-span-3">
          <div className="flex items-end justify-between gap-3"><div><h2 className="text-lg font-extrabold text-[#123b78]">Foto Tersimpan</h2><p className="text-xs text-slate-500">{photos.length} foto dari database Supabase</p></div><span className="rounded-full bg-[#eaf4ff] px-3 py-1 text-[10px] font-bold text-[#1765c0]">LIVE DATA</span></div>
          {loading ? <div className="flex items-center justify-center rounded-2xl border border-[#dce8f5] bg-white py-16 text-sm text-slate-500"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memuat galeri...</div> : photos.length === 0 ? <div className="rounded-2xl border border-dashed border-[#b9d9fb] bg-white px-6 py-16 text-center"><ImageIcon className="mx-auto h-10 w-10 text-[#8bbff5]" /><h3 className="mt-3 font-bold text-[#123b78]">Belum ada foto galeri</h3><p className="mt-1 text-xs text-slate-500">Upload foto kendaraan menggunakan formulir di sebelah kiri.</p></div> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {photos.map((photo) => <article key={photo.id} className="overflow-hidden rounded-2xl border border-[#dce8f5] bg-white shadow-sm transition hover:border-[#a9d3ff] hover:shadow-[0_12px_30px_rgba(22,139,255,.1)]"><div className="relative aspect-[16/10] bg-[#f5f9ff]"><img src={photo.image_url} alt={photo.title} className="h-full w-full object-cover" loading="lazy" />{photo.is_featured && <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#123b78] px-2.5 py-1 text-[10px] font-bold text-white"><Star className="h-3 w-3 fill-current" /> Foto utama</span>}</div><div className="p-4"><div className="mb-3"><h3 className="truncate text-sm font-bold text-[#123b78]">{photo.title}</h3><p className="mt-1 text-[11px] text-slate-500">{productName(photo.product_id)} · {colorName(photo.color_id)} · {photo.category}</p></div><div className="flex gap-2"><button type="button" disabled={busyId === photo.id || photo.is_featured} onClick={() => setPrimary(photo)} className="flex-1 rounded-lg border border-[#dce8f5] px-3 py-2 text-[11px] font-bold text-[#1765c0] hover:bg-[#eaf4ff] disabled:opacity-40"><Star className="mr-1 inline h-3 w-3" />Jadikan Utama</button><button type="button" disabled={busyId === photo.id} onClick={() => handleDelete(photo)} className="rounded-lg border border-red-100 px-3 py-2 text-[11px] font-bold text-red-600 hover:bg-[#eaf4ff] disabled:opacity-40">{busyId === photo.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}</button></div></div></article>)}
          </div>}
        </section>
      </div>
    </div>
  </main>;
}
