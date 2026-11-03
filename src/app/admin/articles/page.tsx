"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import type React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Article, ArticlePackage, parseArticleMarkdown, slugify } from "@/lib/articles";
import { FileText, FileUp, ImagePlus, Pencil, Trash2, ExternalLink, Save, X, RefreshCw, CheckCircle2 } from "lucide-react";

type FormState = ArticlePackage & { id?: string; cover_image_url: string; status: "draft" | "published" };
const blank: FormState = { title:"", slug:"", excerpt:"", author:"Diki Wahyudin", category:"Tips & Informasi Suzuki", seo_title:"", seo_description:"", focus_keyword:"", seo_keywords:[], content:"", cover_image_url:"", status:"draft" };

export default function AdminArticlesPage() {
  const [articles,setArticles]=useState<Article[]>([]);
  const [form,setForm]=useState<FormState>(blank);
  const [editing,setEditing]=useState(false);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [uploading,setUploading]=useState(false);
  const [error,setError]=useState("");
  const [notice,setNotice]=useState("");
  const [importName,setImportName]=useState("");

  const loadArticles=useCallback(async()=>{
    setLoading(true); setError("");
    const {data,error}=await supabase.from("articles").select("*").order("created_at",{ascending:false});
    if(error) setError(error.message);
    setArticles((data||[]) as Article[]); setLoading(false);
  },[]);
  useEffect(()=>{void loadArticles();},[loadArticles]);

  const importFile=async(event:ChangeEvent<HTMLInputElement>)=>{
    const file=event.target.files?.[0]; if(!file)return;
    setError(""); setNotice("");
    if(!file.name.toLowerCase().endsWith(".md")){setError("Gunakan file artikel berformat .md (Markdown).");event.target.value="";return;}
    if(file.size>500*1024){setError("File artikel maksimal 500 KB.");event.target.value="";return;}
    try{
      const parsed=parseArticleMarkdown(await file.text());
      setForm({...blank,...parsed,status:"draft"});
      setImportName(file.name); setEditing(true);
      setNotice("Artikel berhasil diimpor. Periksa preview, lalu unggah foto sampul Anda.");
    }catch(e){setError(e instanceof Error?e.message:"File artikel tidak dapat dibaca.");}
    event.target.value="";
  };

  const uploadCover=async(file?:File)=>{
    if(!file)return;
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)){setError("Gunakan JPG, PNG, atau WebP.");return;}
    if(file.size>5*1024*1024){setError("Foto sampul maksimal 5 MB.");return;}
    setUploading(true);setError("");
    const ext=file.name.split(".").pop()?.toLowerCase()||"jpg";
    const path=`${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const {error}=await supabase.storage.from("article-covers").upload(path,file,{cacheControl:"3600",upsert:false,contentType:file.type});
    if(error)setError(`Upload foto gagal: ${error.message}`);
    else {const {data}=supabase.storage.from("article-covers").getPublicUrl(path);setForm(v=>({...v,cover_image_url:data.publicUrl}));setNotice("Foto sampul tersimpan di Supabase Storage.");}
    setUploading(false);
  };

  const save=async(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();setSaving(true);setError("");setNotice("");
    const payload={
      title:form.title.trim(),slug:slugify(form.slug||form.title),excerpt:form.excerpt.trim(),content:form.content.trim(),
      cover_image_url:form.cover_image_url||null,author:form.author.trim()||"Diki Wahyudin",status:form.status,
      seo_title:form.seo_title.trim()||form.title.trim(),seo_description:form.seo_description.trim()||form.excerpt.trim(),
      focus_keyword:form.focus_keyword.trim()||null,seo_keywords:form.seo_keywords,category:form.category.trim()||"Tips & Informasi Suzuki",
    };
    if(!payload.title||!payload.slug||!payload.excerpt||!payload.content){setError("Judul, URL, ringkasan, dan isi artikel wajib tersedia.");setSaving(false);return;}
    const query=form.id?supabase.from("articles").update(payload).eq("id",form.id):supabase.from("articles").insert(payload);
    const {error}=await query;
    if(error)setError(error.code==="23505"?"Slug artikel sudah digunakan. Ubah slug sebelum menyimpan.":error.message);
    else{setNotice(form.status==="published"?"Artikel berhasil diterbitkan dan disimpan ke Supabase.":"Artikel berhasil disimpan sebagai draft.");setEditing(false);setForm(blank);setImportName("");await loadArticles();}
    setSaving(false);
  };

  const edit=(a:Article)=>{
    setForm({id:a.id,title:a.title,slug:a.slug,excerpt:a.excerpt||"",author:a.author||"Diki Wahyudin",category:a.category||"Tips & Informasi Suzuki",seo_title:a.seo_title||a.title,seo_description:a.seo_description||a.excerpt,focus_keyword:a.focus_keyword||"",seo_keywords:a.seo_keywords||[],content:a.content||"",cover_image_url:a.cover_image_url||"",status:a.status});
    setEditing(true);setImportName("");setError("");setNotice("");
  };
  const remove=async(a:Article)=>{
    if(!window.confirm(`Hapus artikel "${a.title}"?`))return;
    const {error}=await supabase.from("articles").delete().eq("id",a.id);
    if(error)setError(error.message);else{setNotice("Artikel berhasil dihapus.");await loadArticles();}
  };

  return <main className="min-h-screen bg-[#f5f9ff] px-4 py-8 sm:px-6"><div className="mx-auto max-w-7xl space-y-6">
    <header className="rounded-3xl border border-[#dce8f5] bg-white p-6 shadow-sm">
      <Link href="/admin/dashboard" className="text-xs font-semibold text-blue-700 hover:underline">← Kembali ke dashboard</Link>
      <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="text-2xl font-extrabold text-[#123b78]">Article Center</h1><p className="mt-1 text-sm text-slate-500">Impor artikel siap terbit dari ChatGPT. Anda cukup cek isi dan unggah foto sampul.</p></div><button onClick={()=>void loadArticles()} className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-blue-700"><RefreshCw className="h-4 w-4"/> Refresh</button></div>
    </header>
    {error&&<div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
    {notice&&<div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">{notice}</div>}
    {!editing&&<section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
      <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"><div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><FileUp className="h-6 w-6"/></span><div><h2 className="text-lg font-extrabold text-[#123b78]">Upload Artikel Siap Pakai</h2><p className="text-xs text-slate-500">Pilih file Markdown (.md) yang saya siapkan untuk Anda.</p></div></div>
        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 p-8 text-center hover:bg-blue-50"><FileUp className="h-9 w-9 text-blue-600"/><span className="mt-3 text-sm font-bold text-blue-800">Pilih file artikel .md</span><span className="mt-1 text-xs text-slate-500">Judul, isi, slug, ringkasan, dan SEO akan terisi otomatis</span><input type="file" accept=".md,text/markdown,text/plain" className="hidden" onChange={importFile}/></label>
        <p className="mt-3 text-[11px] text-slate-500">Setelah import, Anda tinggal unggah foto sampul, lihat preview, lalu simpan sebagai draft atau terbitkan.</p>
      </div>
      <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"><h2 className="font-extrabold text-[#123b78]">Cara kerja singkat</h2><ol className="mt-4 space-y-3 text-sm text-slate-600"><li className="flex gap-3"><b className="text-blue-700">01</b> Minta ChatGPT membuat artikel Suzuki.</li><li className="flex gap-3"><b className="text-blue-700">02</b> Simpan file artikel .md dari ChatGPT.</li><li className="flex gap-3"><b className="text-blue-700">03</b> Import file ke halaman ini.</li><li className="flex gap-3"><b className="text-blue-700">04</b> Upload foto sampul pilihan Anda.</li><li className="flex gap-3"><b className="text-blue-700">05</b> Preview, lalu terbitkan.</li></ol></div>
    </section>}
    {editing&&<section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 flex items-start justify-between"><div><h2 className="text-xl font-extrabold text-[#123b78]">Review & Terbitkan Artikel</h2><p className="mt-1 text-xs text-slate-500">{importName?`File: ${importName}`:"Edit artikel tersimpan"}</p></div><button onClick={()=>setEditing(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X/></button></div>
      <form onSubmit={save} className="grid gap-4 lg:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700 lg:col-span-2">Judul artikel<input required value={form.title} onChange={e=>setForm(v=>({...v,title:e.target.value,slug:v.slug===slugify(v.title)?slugify(e.target.value):v.slug}))} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal" /></label>
        <label className="text-sm font-semibold text-slate-700">URL / Slug<input required value={form.slug} onChange={e=>setForm(v=>({...v,slug:slugify(e.target.value)}))} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/><span className="text-[11px] font-normal text-slate-400">/artikel/{form.slug}</span></label>
        <label className="text-sm font-semibold text-slate-700">Kategori<input value={form.category} onChange={e=>setForm(v=>({...v,category:e.target.value}))} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <label className="text-sm font-semibold text-slate-700 lg:col-span-2">Ringkasan artikel<textarea rows={2} value={form.excerpt} onChange={e=>setForm(v=>({...v,excerpt:e.target.value}))} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal"/></label>
        <div className="lg:col-span-2"><label className="text-sm font-semibold text-slate-700">Foto sampul (Anda yang upload)<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={e=>void uploadCover(e.target.files?.[0])} className="mt-2 block w-full rounded-xl border border-slate-200 p-3 text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-bold file:text-blue-700"/></label><p className="mt-1 text-[11px] text-slate-400">{uploading?"Mengunggah foto...":"JPG / PNG / WebP maksimal 5 MB. Disimpan ke Supabase Storage."}</p>{form.cover_image_url&&<img src={form.cover_image_url} alt="Preview foto sampul" className="mt-3 h-36 w-64 rounded-xl border object-cover"/>}</div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:col-span-2"><h3 className="font-bold text-[#123b78]">SEO otomatis</h3><div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="text-xs font-semibold text-slate-600">SEO title<input value={form.seo_title} onChange={e=>setForm(v=>({...v,seo_title:e.target.value}))} maxLength={70} className="mt-1.5 w-full rounded-lg border p-2.5 text-sm font-normal"/></label><label className="text-xs font-semibold text-slate-600">Focus keyword<input value={form.focus_keyword} onChange={e=>setForm(v=>({...v,focus_keyword:e.target.value}))} className="mt-1.5 w-full rounded-lg border p-2.5 text-sm font-normal"/></label><label className="text-xs font-semibold text-slate-600 sm:col-span-2">SEO description<textarea rows={2} value={form.seo_description} onChange={e=>setForm(v=>({...v,seo_description:e.target.value}))} maxLength={160} className="mt-1.5 w-full rounded-lg border p-2.5 text-sm font-normal"/></label><label className="text-xs font-semibold text-slate-600 sm:col-span-2">Keyword pendukung (pisahkan koma)<input value={form.seo_keywords.join(", ")} onChange={e=>setForm(v=>({...v,seo_keywords:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)}))} className="mt-1.5 w-full rounded-lg border p-2.5 text-sm font-normal"/></label></div></div>
        <div className="lg:col-span-2"><h3 className="font-bold text-[#123b78]">Preview isi artikel</h3><div className="article-content mt-2 max-h-[440px] overflow-auto rounded-2xl border border-slate-200 p-5 text-sm leading-7 text-slate-700"><MarkdownPreview content={form.content}/></div></div>
        <label className="text-sm font-semibold text-slate-700">Status publikasi<select value={form.status} onChange={e=>setForm(v=>({...v,status:e.target.value as "draft"|"published"}))} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"><option value="draft">Simpan Draft</option><option value="published">Terbitkan ke Website</option></select></label>
        <div className="flex flex-wrap items-end gap-2"><button disabled={saving||uploading} className="inline-flex items-center gap-2 rounded-xl bg-[#123b78] px-5 py-3 text-sm font-bold text-white disabled:opacity-50"><Save className="h-4 w-4"/>{saving?"Menyimpan...":form.status==="published"?"Terbitkan Artikel":"Simpan Draft"}</button><button type="button" onClick={()=>{setEditing(false);setForm(blank);}} className="rounded-xl border px-5 py-3 text-sm font-bold text-slate-600">Batal</button></div>
      </form>
    </section>}
    <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm"><div className="border-b p-5"><h2 className="font-extrabold text-[#123b78]">Artikel tersimpan · {articles.length}</h2></div>
      {loading?<p className="p-8 text-center text-sm text-slate-500">Memuat...</p>:articles.length?<div className="divide-y">{articles.map(a=><div key={a.id} className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><b className="text-[#123b78]">{a.title}</b><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${a.status==="published"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>{a.status==="published"?"Terbit":"Draft"}</span></div><p className="mt-1 line-clamp-2 text-xs text-slate-500">{a.excerpt}</p><p className="mt-1 text-[11px] text-slate-400">/artikel/{a.slug}</p></div><div className="flex gap-2"><button onClick={()=>edit(a)} className="rounded-lg border px-3 py-2 text-xs font-bold"><Pencil className="mr-1 inline h-3 w-3"/>Edit</button>{a.status==="published"&&<Link href={`/artikel/${a.slug}`} target="_blank" className="rounded-lg border border-blue-100 px-3 py-2 text-xs font-bold text-blue-700"><ExternalLink className="mr-1 inline h-3 w-3"/>Lihat</Link>}<button onClick={()=>void remove(a)} className="rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-600"><Trash2 className="mr-1 inline h-3 w-3"/>Hapus</button></div></div>)}</div>:<div className="p-10 text-center text-sm text-slate-500">Belum ada artikel. Import file Markdown pertama Anda.</div>}
    </section>
  </div></main>;
}

function MarkdownPreview({content}:{content:string}) {
  const lines=content.split("\\n"); const nodes:React.ReactNode[]=[]; let list:string[]=[];
  const flush=()=>{if(list.length){nodes.push(<ul key={`list-${nodes.length}`} className="my-3 list-disc space-y-1 pl-6">{list.map((x,i)=><li key={i}>{inline(x)}</li>)}</ul>);list=[];}};
  lines.forEach((raw,i)=>{const line=raw.trim();if(!line){flush();return;}if(line.startsWith("# ")){flush();nodes.push(<h2 key={i} className="my-4 text-xl font-bold text-[#123b78]">{inline(line.slice(2))}</h2>);}else if(line.startsWith("## ")){flush();nodes.push(<h3 key={i} className="my-3 text-lg font-bold text-[#123b78]">{inline(line.slice(3))}</h3>);}else if(line.startsWith("### ")){flush();nodes.push(<h4 key={i} className="my-2 font-bold text-[#123b78]">{inline(line.slice(4))}</h4>);}else if(/^[-*] /.test(line)){list.push(line.slice(2));}else{flush();nodes.push(<p key={i} className="my-2">{inline(line)}</p>);}});flush();return <>{nodes}</>;
}
function inline(value:string):React.ReactNode {const parts=value.split(/(\\*\\*[^*]+\\*\\*)/g);return parts.map((p,i)=>p.startsWith("**")&&p.endsWith("**")?<strong key={i}>{p.slice(2,-2)}</strong>:p);}
