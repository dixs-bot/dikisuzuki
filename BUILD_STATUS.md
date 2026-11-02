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

- Pemeriksaan sintaks TypeScript/TSX dengan transpile parser: PASS.
- `npm ci` tidak selesai dalam batas waktu sesi, sehingga dependency lokal tidak lengkap.
- `npm run build` belum dapat dijalankan karena executable Next.js belum tersedia setelah instalasi dependency timeout.

## Pekerjaan lanjutan sebelum produksi

1. Jalankan seluruh migration dan seed pada project Supabase yang benar.
2. Buat akun Auth dan masukkan profil admin sesuai panduan.
3. Verifikasi harga, spesifikasi, nomor kontak, alamat, dan promo.
4. Sinkronkan sumber katalog/harga customer sepenuhnya ke database Supabase (saat ini data lokal masih menjadi sumber awal/fallback).
5. Uji login, role, RLS, upload, delete, dan tampilan customer di project Supabase nyata.
6. Jalankan `npm install`, `npm run build`, lalu deploy ke Vercel.
