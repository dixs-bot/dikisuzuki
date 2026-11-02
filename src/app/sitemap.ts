import type { MetadataRoute } from "next";
import { productsData } from "@/data/products";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/katalog", "/promo", "/simulasi", "/test-drive", "/kontak"];
  const pages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route || "/"}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/katalog" ? 0.9 : 0.7,
  }));
  const productPages: MetadataRoute.Sitemap = productsData.map((product) => ({
    url: `${siteUrl}/mobil/${product.id}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...pages, ...productPages];
}
