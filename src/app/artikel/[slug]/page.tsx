import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronLeft } from "lucide-react";
import { getPublicSupabase, type Article } from "@/lib/articles";

export const revalidate = 60;
async function getArticle(slug: string) {
  const client = getPublicSupabase();
  if (!client) return null;
  const { data } = await client.from("articles").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  return data as Article | null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Artikel tidak ditemukan" };
  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    alternates: { canonical: `/artikel/${article.slug}` },
    openGraph: { type: "article", title: article.seo_title || article.title, description: article.seo_description || article.excerpt, images: article.cover_image_url ? [article.cover_image_url] : [] },
  };
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();
  const date = article.published_at || article.created_at;
  return <main className="min-h-screen bg-white"><article className="mx-auto max-w-4xl px-5 py-10 sm:px-6 lg:py-16">
    <Link href="/artikel" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"><ChevronLeft className="h-4 w-4" /> Kembali ke artikel</Link>
    <header className="mt-8"><span className="section-kicker">Artikel & Wawasan</span><h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#123b78] sm:text-5xl">{article.title}</h1>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500"><span>{article.author}</span><span aria-hidden="true">·</span><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span></div>
      {article.excerpt && <p className="mt-7 border-l-4 border-blue-500 pl-4 text-lg leading-8 text-slate-600">{article.excerpt}</p>}
    </header>
    {article.cover_image_url && <img src={article.cover_image_url} alt={article.title} className="mt-9 max-h-[480px] w-full rounded-2xl object-cover" />}
    <div className="article-content mt-10 whitespace-pre-wrap text-[15px] leading-8 text-slate-700">{article.content}</div>
    <footer className="mt-14 border-t border-slate-200 pt-7"><p className="text-sm text-slate-600">Butuh informasi lebih lanjut tentang mobil Suzuki?</p><Link href="/kontak" className="mt-3 inline-flex rounded-xl bg-[#123b78] px-5 py-3 text-sm font-bold text-white hover:bg-[#0d2d59]">Hubungi Diki Wahyudin</Link></footer>
  </article></main>;
}
