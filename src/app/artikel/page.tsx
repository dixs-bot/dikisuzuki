import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, BookOpen, ArrowRight } from "lucide-react";
import { getPublicSupabase, type Article } from "@/lib/articles";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Artikel & Tips Otomotif Suzuki Bandung",
  description: "Baca artikel, tips perawatan, panduan memilih mobil, informasi kredit, dan kabar otomotif bersama Diki Wahyudin di Bandung.",
  alternates: { canonical: "/artikel" },
};

export default async function ArticlesPage() {
  const client = getPublicSupabase();
  const { data, error } = client
    ? await client.from("articles").select("id,title,slug,excerpt,cover_image_url,author,category,published_at,created_at")
      .eq("status", "published").order("published_at", { ascending: false })
    : { data: [], error: null };
  const articles = (data || []) as Pick<Article, "id" | "title" | "slug" | "excerpt" | "cover_image_url" | "author" | "category" | "published_at" | "created_at">[];

  return <main className="min-h-screen bg-[#f7faff]">
    <section className="border-b border-[#e2ebf5] bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:py-20">
        <span className="section-kicker">Wawasan & Informasi</span>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-[#123b78] sm:text-5xl">Artikel otomotif untuk keputusan yang lebih tepat.</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">Panduan memilih mobil Suzuki, tips perawatan, informasi pembelian, dan pengetahuan kredit yang disajikan dengan bahasa sederhana.</p>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:py-16">
      <div className="mb-7 flex items-center justify-between"><div><h2 className="text-xl font-bold text-[#123b78]">Artikel terbaru</h2><p className="mt-1 text-sm text-slate-500">Informasi dan panduan dari Diki Wahyudin</p></div><BookOpen className="h-6 w-6 text-blue-600" /></div>
      {error ? <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">Artikel belum dapat dimuat. Silakan periksa konfigurasi database.</p>
        : articles.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <article key={article.id} className="overflow-hidden rounded-2xl border border-[#e0eaf5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          {article.cover_image_url ? <img src={article.cover_image_url} alt={article.title} className="h-48 w-full object-cover" loading="lazy" /> : <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#eaf4ff] to-[#f7faff]"><BookOpen className="h-12 w-12 text-blue-300" /></div>}
          <div className="p-5"><div className="flex items-center gap-2 text-[11px] text-slate-500"><CalendarDays className="h-3.5 w-3.5" />{new Date(article.published_at || article.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</div>
            {article.category && <span className="mt-3 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">{article.category}</span>}<h3 className="mt-2 text-lg font-bold leading-snug text-[#123b78]">{article.title}</h3><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>
            <Link href={`/artikel/${article.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">Baca selengkapnya <ArrowRight className="h-4 w-4" /></Link>
          </div></article>)}</div>
        : <div className="rounded-2xl border border-dashed border-[#cbdced] bg-white px-6 py-14 text-center"><BookOpen className="mx-auto h-10 w-10 text-blue-300" /><h3 className="mt-4 text-lg font-bold text-[#123b78]">Belum ada artikel</h3><p className="mt-2 text-sm text-slate-500">Artikel yang diterbitkan melalui panel admin akan tampil di halaman ini.</p></div>}
    </section>
  </main>;
}
