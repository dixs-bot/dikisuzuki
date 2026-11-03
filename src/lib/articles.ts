import { createClient } from "@supabase/supabase-js";

export type Article = {
  id: string; title: string; slug: string; excerpt: string; content: string;
  cover_image_url: string | null; author: string; status: "draft" | "published";
  seo_title: string | null; seo_description: string | null;
  focus_keyword?: string | null; seo_keywords?: string[] | null; category?: string | null;
  published_at: string | null; created_at: string; updated_at: string;
};

export type ArticlePackage = {
  title: string; slug: string; excerpt: string; author: string; category: string;
  seo_title: string; seo_description: string; focus_keyword: string;
  seo_keywords: string[]; content: string;
};

export function getPublicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("placeholder")) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
export function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
}

export function parseArticleMarkdown(source: string): ArticlePackage {
  const normalized = source.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").trimStart();
  const match = normalized.match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n|$)([\s\S]*)$/);
  if (!match) throw new Error("Format file tidak sesuai. Pastikan file dimulai dengan --- pada baris pertama dan metadata ditutup dengan ---.");
  const meta: Record<string, string | string[]> = {};
  let activeArray = "";
  for (const rawLine of match[1].split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const arrayItem = line.match(/^-\s*(.+)$/);
    if (arrayItem && activeArray) {
      const current = Array.isArray(meta[activeArray]) ? meta[activeArray] as string[] : [];
      current.push(unquote(arrayItem[1])); meta[activeArray] = current; continue;
    }
    const field = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!field) continue;
    activeArray = field[2] ? "" : field[1];
    if (field[2].startsWith("[")) {
      meta[field[1]] = field[2].replace(/^\[/, "").replace(/\]$/, "").split(",").map((x) => unquote(x.trim())).filter(Boolean);
    } else if (!field[2]) meta[field[1]] = [];
    else meta[field[1]] = unquote(field[2]);
  }
  const content = match[2].trim();
  const title = String(meta.title || "").trim();
  const excerpt = String(meta.excerpt || "").trim();
  if (!title || !excerpt || !content) throw new Error("Metadata wajib: title dan excerpt, serta isi artikel setelah frontmatter.");
  const keywords = Array.isArray(meta.seo_keywords) ? meta.seo_keywords : String(meta.seo_keywords || "").split(",").map((x) => x.trim()).filter(Boolean);
  return {
    title, slug: slugify(String(meta.slug || title)), excerpt, author: String(meta.author || "Diki Wahyudin"),
    category: String(meta.category || "Tips & Informasi Suzuki"),
    seo_title: String(meta.seo_title || title).slice(0, 70),
    seo_description: String(meta.seo_description || excerpt).slice(0, 160),
    focus_keyword: String(meta.focus_keyword || keywords[0] || title),
    seo_keywords: keywords.map(String).slice(0, 15), content,
  };
}
function unquote(value: string) { return value.replace(/^['"]|['"]$/g, "").trim(); }
