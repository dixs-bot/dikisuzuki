import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productsData } from "@/data/products";
import { siteUrl, productDescription } from "@/lib/seo";
import ProductDetailClient from "./ProductDetailClient";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return productsData.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = productsData.find((item) => item.id === params.slug);
  if (!product) {
    return { title: "Mobil Suzuki Tidak Ditemukan", robots: { index: false, follow: false } };
  }

  const title = `${product.name} Bandung: Tipe & Simulasi Kredit`;
  const description = productDescription(product.name);
  const canonical = `/mobil/${product.id}`;

  return {
    title,
    description,
    keywords: [
      `${product.name} Bandung`,
      `harga ${product.name} Bandung`,
      `kredit ${product.name} Bandung`,
      `simulasi kredit ${product.name}`,
      "sales Suzuki Bandung",
    ],
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: new URL(canonical, `${siteUrl}/`).toString(),
      title,
      description,
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = productsData.find((item) => item.id === params.slug);
  if (!product) notFound();

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Katalog Mobil Suzuki", item: `${siteUrl}/katalog` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${siteUrl}/mobil/${product.id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetailClient params={params} />
    </>
  );
}
