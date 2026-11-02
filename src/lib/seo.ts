import { siteConfig } from "@/lib/constants";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dikisuzuki.vercel.app";
export const siteUrl = configuredSiteUrl.replace(/\/+$/, "");

export function absoluteUrl(path = "/"): string {
  return new URL(path.replace(/^\//, ""), `${siteUrl}/`).toString();
}

export const primaryKeywords = [
  "sales Suzuki Bandung",
  "harga mobil Suzuki Bandung",
  "promo Suzuki Bandung",
  "kredit mobil Suzuki Bandung",
  "simulasi kredit Suzuki Bandung",
  "sales mobil Suzuki Bandung",
  "test drive Suzuki Bandung",
  "sales Suzuki Cimahi",
  "harga Suzuki XL7 Bandung",
  "harga Suzuki Fronx Bandung",
];

export function productDescription(productName: string): string {
  return `Cari informasi ${productName} di Bandung? Lihat tipe, pilihan warna, spesifikasi, dan minta harga OTR serta simulasi kredit terbaru kepada Diki Wahyudin.`;
}

export function buildSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Diki Wahyudin - Sales Suzuki Bandung",
        inLanguage: "id-ID",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteConfig.salesName,
        jobTitle: siteConfig.salesRole,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        worksFor: {
          "@type": "Organization",
          name: siteConfig.dealerName,
        },
        areaServed: [
          { "@type": "City", name: "Bandung" },
          { "@type": "City", name: "Cimahi" },
          { "@type": "AdministrativeArea", name: "Kabupaten Bandung" },
          { "@type": "AdministrativeArea", name: "Bandung Barat" },
        ],
        url: `${siteUrl}/kontak`,
      },
    ],
  };
}
