# Update pilihan warna Ertiga dan XL7 (V12)

## Perubahan
- Suzuki Ertiga: `Metallic Blue` diganti labelnya menjadi `Brave Khaki` (ID warna dipertahankan agar foto lama tetap terhubung).
- New Suzuki XL7: menambahkan `Blue` dan `Ivory`.
- New Suzuki XL7: menghapus pilihan `Magma Red`/`Red` dan `Silky Silver`/`Silver`.
- Foto XL7 yang sebelumnya ditautkan ke Red/Silver tidak dihapus; `color_id` dikosongkan agar foto tetap tersimpan sebagai foto XL7 yang belum dikategorikan ke warna.

## Penerapan ke Supabase
1. Backup database terlebih dahulu.
2. Pastikan project Supabase yang dibuka sama dengan URL yang dipakai Vercel.
3. Buka SQL Editor dan jalankan `supabase/migrations/06_update_ertiga_xl7_colors.sql`.
4. Jalankan query verifikasi di komentar akhir migration.
5. Refresh halaman customer Ertiga/XL7 dan panel admin Galeri.

Migration ini mengubah data langsung di database. Tidak perlu mengubah environment variables atau menjalankan ulang seluruh `seed.sql`.

## Catatan
- `Brave Khaki`, `Blue`, dan `Ivory` adalah label pilihan sesuai permintaan pemilik website. Pastikan nama/opsi warna sesuai daftar resmi unit dan stok yang akan ditawarkan sebelum dipublikasikan.
- Foto untuk warna baru perlu diunggah melalui Admin > Galeri dengan memilih model dan warna yang benar. Seed image_url adalah referensi/default, bukan foto warna baru yang sudah diverifikasi.
