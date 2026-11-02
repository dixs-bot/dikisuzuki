import type { MetadataRoute } from "next";
import { productsData } from "@/data/products";
import { getPublicSupabase, type Article } from "@/lib/articles";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/katalog", "/promo", "/simulasi", "/test-drive", "/kontak", "/artikel"];
  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route || "/"}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/katalog" || route === "/artikel" ? 0.9 : 0.7,
  }));
  const productPages: MetadataRoute.Sitemap = productsData.map((product) => ({ url: `${siteUrl}/mobil/${product.id}`, changeFrequency: "monthly", priority: 0.8 }));
  const client = getPublicSupabase();
  const { data } = client ? await client.from("articles").select("slug,updated_at").eq("status", "published") : { data: [] };
  const articlePages: MetadataRoute.Sitemap = ((data || []) as Pick<Article, "slug" | "updated_at">[]).map((article) => ({
    url: `${siteUrl}/artikel/${article.slug}`,
    lastModified: article.updated_at,
    changeFrequency: "monthly",
    priority: 0.65,
  }));
  return [...pages, ...productPages, ...articlePages];
}
