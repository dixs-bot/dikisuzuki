# V20 Article Center — Panduan penggunaan

## Apa yang berubah?
V20 fokus hanya pada CMS artikel:
- Admin `/admin/articles` sekarang memiliki import file Markdown `.md`.
- Metadata title, slug, excerpt, author, category, SEO title, SEO description, focus keyword, dan SEO keywords dibaca dari frontmatter.
- Isi artikel disimpan sebagai Markdown, lalu dirender menjadi heading, paragraf, bold, list, dan kutipan pada halaman detail.
- Foto sampul tetap diunggah manual oleh admin ke bucket Supabase Storage `article-covers`.
- Artikel tetap menggunakan tabel `public.articles` dan status `draft` / `published`.
- Daftar artikel customer `/artikel` dan detail `/artikel/[slug]` tetap membaca data Published dari Supabase.

## Wajib: jalankan migration
Jalankan `supabase/migrations/10_article_center_v20.sql` satu kali di Supabase SQL Editor.
Migration hanya menambah kolom `category`, `focus_keyword`, `seo_keywords` dan index. Data lama tidak dihapus.

## Workflow admin
1. Login ke `/admin/articles`.
2. Klik pilih file artikel `.md` yang dibuat ChatGPT.
3. Periksa judul, URL, ringkasan, kategori, SEO, dan preview isi.
4. Upload foto sampul JPG/PNG/WebP maksimal 5 MB.
5. Pilih Draft jika ingin menyimpan tanpa menampilkan di website.
6. Pilih Terbitkan Artikel jika sudah siap. Data disimpan ke Supabase.
7. Halaman `/artikel` menampilkan artikel Published; halaman detail menggunakan URL `/artikel/<slug>`.

## Format file artikel
Setiap file `.md` harus diawali YAML frontmatter seperti contoh `article-starter-kit/contoh-artikel-suzuki-keluarga.md`.
Field wajib: `title`, `excerpt`; konten ditulis setelah penutup `---`.
Field SEO: `seo_title`, `seo_description`, `focus_keyword`, `seo_keywords`.
Untuk `seo_keywords`, gunakan YAML list dengan satu keyword per baris.

## Hal-hal yang perlu dipahami
- ChatGPT menyiapkan konten dan file Markdown; admin tetap memeriksa kebenaran informasi dan memilih foto sampul.
- Harga, promo, spesifikasi, stok, dan program kredit harus diverifikasi dari informasi resmi/dealer sebelum diterbitkan. Jangan menerbitkan angka yang belum dikonfirmasi.
- SEO keyword adalah metadata/panduan konten. Tidak menjamin peringkat Google. Kualitas, relevansi, kecepatan website, tautan internal, reputasi, dan indexing juga berpengaruh.
- Foto sampul tidak otomatis dibuat atau diambil dari internet. Anda upload sendiri agar sesuai dengan materi dan hak penggunaan gambar.
- Tidak ada perubahan pada katalog, warna, galeri kendaraan, simulasi kredit, test drive, finance, atau data terkait.
