# Catatan perubahan dan pengujian

## Perubahan yang dilakukan

- Redesign palet dan komponen menjadi White Blue Neon.
- Navbar customer dibuat putih, responsif, dan memakai aksen biru.
- Hero homepage diubah menjadi komposisi putih/ice-blue dengan aksen neon blue.
- Admin login didesain ulang dan kredensial demo/bypass dihapus.
- Middleware admin ditambahkan untuk memeriksa session dan role admin.
- Admin dashboard memakai statistik Supabase, bukan angka leads dummy.
- Admin galeri memakai upload nyata ke Storage dan insert metadata ke `vehicle_photos`.
- Galeri mendukung beberapa file, preview, validasi tipe/ukuran, pilih produk/warna, hapus foto, dan foto utama.
- Detail produk membaca daftar warna dan foto berdasarkan produk dari Supabase.
- Migration tambahan menambahkan `color_id` dan membatasi operasi tulis Storage untuk admin.
- File `.env` yang ikut pada ZIP sumber tidak disertakan dalam hasil; gunakan `.env.example`.

## Pemeriksaan

- Memperbaiki loop upload galeri: mengganti `files.entries()` dengan loop indeks agar kompatibel dengan target TypeScript lama.
- Mengubah `compilerOptions.target` dari `es5` menjadi `es2017` agar iterasi modern dan API JavaScript berjalan konsisten pada build.
- Pemeriksaan sintaks TypeScript/TSX: 22 file diperiksa, 0 error.
- Audit seluruh import lokal (`@/` dan relative): PASS, tidak ditemukan target import yang hilang.
- `npm ci` tidak selesai dalam batas waktu sesi; dependency lokal tidak lengkap. Karena itu full `next build` dan pemeriksaan tipe berbasis dependency belum dapat diverifikasi di lingkungan ini.

## Pekerjaan lanjutan sebelum produksi

1. Jalankan seluruh migration dan seed pada project Supabase yang benar.
2. Buat akun Auth dan masukkan profil admin sesuai panduan.
3. Verifikasi harga, spesifikasi, nomor kontak, alamat, dan promo.
4. Sinkronkan sumber katalog/harga customer sepenuhnya ke database Supabase (saat ini data lokal masih menjadi sumber awal/fallback).
5. Uji login, role, RLS, upload, delete, dan tampilan customer di project Supabase nyata.
6. Jalankan `npm ci` dan `npm run build` di lokal/Vercel untuk verifikasi akhir; deploy hanya jika build PASS.


## SEO implementation update
- Added unique metadata/canonical URLs for public routes and product detail pages.
- Added generated `robots.txt` and `sitemap.xml` routes.
- Added `WebSite`, `Person`, and product breadcrumb structured data.
- Added local-intent content and FAQ text to the homepage.
- Redirected duplicate `/mobil` and `/tentang` routes to their canonical destinations.
- Added `SEO_GUIDE.md` with keyword mapping, Search Console setup, and publication checks.
- Production domain must be configured through `NEXT_PUBLIC_SITE_URL` before deployment.
- Full Next.js production build has not yet been verified in this environment.
