# Setup Supabase — Suzuki Digital Showroom Diki Wahyudin

## 1. Environment

Salin `.env.example` menjadi `.env.local`, lalu isi:

- `NEXT_PUBLIC_SUPABASE_URL`: Project URL dari Supabase Dashboard → Settings → API.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: publishable/anon key dari Supabase Dashboard → Settings → API.

Jangan pernah menaruh `service_role` key di variabel `NEXT_PUBLIC_*` atau mengirimkannya ke browser. Aplikasi ini tidak membutuhkan service-role key pada sisi frontend.

## 2. Jalankan migration

Jalankan berurutan melalui Supabase SQL Editor:

1. `supabase/migrations/01_initial_schema.sql`
2. `supabase/migrations/02_storage_and_rls.sql`
3. `supabase/migrations/03_gallery_color_and_storage_security.sql`

Lalu jalankan `supabase/seed.sql` satu kali untuk data awal produk, varian, warna, dan dealer. Periksa ulang harga serta informasi dealer sebelum dipublikasikan.

## 3. Bucket Storage

Migration membuat bucket `vehicle-gallery` sebagai public-read untuk menampilkan foto ke customer. Upload, update, dan delete dibatasi oleh `public.is_admin()`.

## 4. Buat akun admin pertama

1. Buka Supabase Dashboard → Authentication → Users.
2. Pilih Add user dan buat akun dengan email serta password milik admin.
3. Salin UUID user tersebut.
4. Jalankan SQL berikut dengan data yang benar:

```sql
insert into public.admin_profiles (id, email, full_name, role)
values ('UUID_DARI_AUTH_USERS', 'EMAIL_ADMIN', 'Diki Wahyudin', 'super_admin');
```

Jangan gunakan UUID contoh. Jangan memberi role `super_admin` kepada akun yang tidak dipercaya.

## 5. Jalankan lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Admin login berada di `/admin/login`.

## 6. Deployment Vercel

Tambahkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di Vercel → Project Settings → Environment Variables. Deploy ulang setelah migration dijalankan.

## Catatan status integrasi

- Admin login menggunakan Supabase Auth dan memeriksa role pada `admin_profiles`.
- Middleware melindungi route `/admin/*` selain halaman login.
- Upload galeri mengirim file ke Storage dan metadata ke `vehicle_photos`.
- Halaman detail produk membaca foto dan warna dari Supabase berdasarkan slug produk.
- Katalog dan harga awal masih mempunyai sumber data lokal `src/data/products.ts`; sebelum produksi, sinkronkan data katalog/harga ke tabel Supabase dan verifikasi semua harga OTR.
- Nomor kontak, lokasi dealer, promo, dan spesifikasi harus diverifikasi oleh pemilik sebelum website dipublikasikan.


## Modul Artikel / Blog

Jalankan file `supabase/migrations/04_articles.sql` di Supabase Dashboard → SQL Editor → New query → Run. Migration ini membuat tabel `articles` dan kebijakan RLS: pengunjung hanya dapat membaca artikel berstatus `published`, sedangkan admin dengan role `super_admin` atau `sales_admin` dapat mengelola artikel.

Setelah migration berhasil, login ke `/admin/login`, buka Dashboard → Manajemen Artikel, lalu buat artikel. Isi judul, ringkasan, konten, dan status. Artikel berstatus Draft tidak tampil ke publik; artikel berstatus Terbit tampil di `/artikel` dan halaman detail `/artikel/[slug]`.

Gambar sampul dapat diunggah langsung dari panel admin ke bucket Supabase Storage `article-covers` (JPG, PNG, WebP, maksimal 5 MB), atau menggunakan URL gambar publik. Pastikan gunakan gambar yang memiliki hak penggunaan.
