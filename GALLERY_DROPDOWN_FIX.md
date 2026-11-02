# Perbaikan dropdown Galeri Kendaraan

## Penyebab yang ditemukan
Halaman admin galeri sebelumnya hanya mengambil produk dengan `is_active = true`.
Jika produk di database berstatus nonaktif, hasil query menjadi kosong dan dropdown model dinonaktifkan. Dropdown warna juga otomatis terkunci karena bergantung pada model terpilih.

## Perubahan source
- Halaman admin galeri sekarang mengambil semua produk agar admin tetap bisa mengelola galeri produk nonaktif/draft.
- Placeholder dropdown menampilkan status memuat / belum ada data.
- Jika tidak ada produk, halaman menjelaskan bahwa `products` kosong atau akses/query perlu diperiksa.
- Validasi relasi produk-warna tetap dilakukan sebelum upload; foto tidak dapat diunggah jika warna bukan milik produk yang dipilih.

## Langkah diagnosis di Supabase
1. Buka Supabase project yang sama dengan `NEXT_PUBLIC_SUPABASE_URL` di Vercel.
2. Buka SQL Editor.
3. Jalankan `supabase/diagnose_gallery_catalog.sql`.
4. Periksa hasil:
   - `total_products` harus lebih dari 0.
   - Setiap model yang ingin diisi galeri harus memiliki `color_count` lebih dari 0.
5. Jika `total_products = 0`, jalankan `supabase/seed.sql` satu kali untuk memasukkan katalog awal.
6. Jika produk ada tetapi warna `color_count = 0`, jalankan seed katalog yang sesuai atau masukkan warna untuk produk tersebut.
7. Kembali ke `/admin/gallery` dan klik **Segarkan Data**.

## Catatan
Jangan menjalankan ulang seed tanpa memeriksa data dan perubahan harga terlebih dahulu. Seed berisi data contoh katalog dan harga yang perlu diverifikasi sebelum dipublikasikan. File seed memakai upsert untuk beberapa tabel, tetapi bukan pengganti backup.
