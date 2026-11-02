export interface Variant {
  name: string;
  price: number;
  transmission?: string;
  dpMin?: number;
  installmentMin?: number;
}

export interface Color {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  [key: string]: any;
  id: string;
  name: string;
  category: "passenger" | "commercial";
  tagline: string;
  description: string;
  image: string;
  gallery?: string[];
  priceStart?: number;
  dpStart?: number;
  installmentStart?: number;
  badge?: string;
  featured?: boolean;
  features?: string[];
  specs?: Record<string, string> | { label: string; value: string }[];
  colors?: Color[];
  variants: Variant[];
}

export const siteConfig = {
  salesName: "Diki Wahyudin",
  salesRole: "Senior Suzuki Sales Consultant",
  salesTagline: "Sahabat Resmi Pembelian Mobil Suzuki Terbaik di Bandung & Jawa Barat",
  salesPhoto: "/images/profil.jpg",

  businessName: "Diki Wahyudin — Suzuki Bandung NJS Ahmad Yani",
  brand: "SUZUKI",
  dealerName: "Nusantara Jaya Sentosa (NJS) Ahmad Yani Bandung",

  phone: "+6285189976233",
  phoneNumberFormatted: "+62 851-8997-6233",
  whatsappNumber: "6285189976233",
  email: "diki.wahyudin.suzuki@gmail.com",

  serviceArea: "Kota Bandung, Cimahi, Kab. Bandung, Bandung Barat & Seluruh Jawa Barat",
  address: "Jl. Jendral Ahmad Yani No. 259, Cihapit, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40114",
  mapsUrl: "https://maps.google.com/?q=Nusantara+Jaya+Sentosa+Ahmad+Yani+Bandung",
  operatingHours: "Senin – Minggu, 08.00 – 18.00 WIB",

  defaultWaMessage: "Halo Kang Diki Wahyudin, saya ingin konsultasi promo mobil Suzuki Bandung dan simulasi kredit terbaru.",
};

export function getWhatsAppLink(message: string = siteConfig.defaultWaMessage): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatRupiah(amount: number): string {
  return "Rp " + Math.round(amount).toLocaleString("id-ID");
}

export const flatInterestRates: Record<number, number> = {
  1: 0.05,
  2: 0.06,
  3: 0.07,
  4: 0.08,
  5: 0.09,
};

export function calculateCreditSimulation(otrPrice: number, dpPercent: number, tenorYears: number) {
  const dpAmount = otrPrice * (dpPercent / 100);
  const pokokUtang = otrPrice - dpAmount;
  const bungaRate = flatInterestRates[tenorYears] || 0.08;
  const totalBunga = pokokUtang * bungaRate * tenorYears;
  const totalBayar = pokokUtang + totalBunga;
  const totalBulan = tenorYears * 12;
  const cicilanPerBulan = Math.round(totalBayar / totalBulan);

  return {
    otrPrice,
    dpPercent,
    dpAmount,
    pokokUtang,
    bungaRate,
    totalBunga,
    tenorYears,
    totalBulan,
    cicilanPerBulan,
  };
}
