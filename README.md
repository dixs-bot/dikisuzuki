# Suzuki Digital Showroom — Diki Wahyudin

Website katalog Suzuki dengan identitas visual **White Blue Neon**. Project menggunakan Next.js 14, React 18, TypeScript, Tailwind CSS, dan Supabase.

## Fitur dalam source saat ini

- Customer website: homepage, katalog, detail kendaraan, simulasi, promo, test drive, dan kontak.
- Design system White Blue Neon untuk customer website dan admin.
- Admin login dengan Supabase Auth dan pemeriksaan role `super_admin` / `sales_admin`.
- Middleware untuk melindungi `/admin/*` selain halaman login.
- Dashboard admin dengan statistik yang dibaca dari Supabase.
- Upload beberapa foto ke Supabase Storage, metadata ke `vehicle_photos`, pemilihan warna, penghapusan, dan penetapan foto utama.
- Halaman detail produk membaca warna dan galeri foto dari Supabase.

## Persiapan

1. Salin `.env.example` menjadi `.env.local` dan isi kredensial Supabase.
2. Ikuti `SUPABASE_SETUP.md` untuk menjalankan migration, seed, membuat bucket, dan bootstrap akun admin.
3. Jalankan `npm install` lalu `npm run dev`.

## Catatan penting sebelum production

- Harga dalam `src/data/products.ts` merupakan data referensi awal. Verifikasi harga OTR, wilayah, dan periode sebelum dipublikasikan.
- Data katalog customer masih menggunakan data lokal sebagai fallback/sumber awal; tahap sinkronisasi penuh katalog dan harga dari tabel Supabase masih perlu diselesaikan.
- Foto kendaraan asli belum disertakan di ZIP. Upload foto milik sendiri melalui Admin → Galeri.
- Nomor WhatsApp, email, lokasi dealer, jam operasional, promo, spesifikasi, dan klaim layanan perlu dikonfirmasi pemilik.
- Jangan pernah menambahkan `.env` ke Git atau membagikan service-role key.


## SEO
See `SEO_GUIDE.md` for target keywords, metadata, sitemap/robots, Google Search Console setup, and required publication checks. Set `NEXT_PUBLIC_SITE_URL` to the actual production HTTPS domain in Vercel.


## Domain produksi
Domain utama yang disiapkan: `https://salesuzukibandung.site`. Pastikan domain sudah ditambahkan dan DNS tervalidasi di Vercel, lalu set `NEXT_PUBLIC_SITE_URL=https://salesuzukibandung.site` pada Environment Variables Vercel dan redeploy. Panduan lengkap ada di `SEO_GUIDE.md`.


## Artikel / Blog CMS

- Halaman publik: `/artikel` dan `/artikel/[slug]`.
- Panel admin: `/admin/articles` (dilindungi middleware admin).
- Jalankan `supabase/migrations/04_articles.sql` pada Supabase SQL Editor sebelum menggunakan modul ini.
- Artikel Draft tidak terlihat publik; status Terbit akan menampilkannya dan menambahkannya ke sitemap.
- Isian gambar sampul menerima URL publik.


### Galeri kendaraan V9

Admin gallery sekarang mengunci pemilihan warna berdasarkan model, menyediakan filter galeri per model, dan menampilkan konteks target upload. Jalankan migration `05_gallery_product_color_isolation.sql` setelah migration sebelumnya untuk memastikan relasi warna tidak dapat tertukar antarproduk.
