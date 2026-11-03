# Suzuki Diki V13 — Color Catalog Audit

V13 menyelaraskan palet warna di source frontend dan menambahkan migration database `07_sync_colors_to_njs_reference.sql`.

## Perubahan
- Source product colors diselaraskan dengan katalog warna halaman produk Suzuki NJS Cimahi.
- Warna database lama diarsipkan melalui `vehicle_colors.is_active = false`, bukan dihapus.
- Detail produk dan kartu katalog hanya menampilkan warna aktif.
- Galeri admin tetap dapat membaca baris warna arsip, tetapi pilihan upload hanya menampilkan warna aktif.
- Tidak menghapus foto atau storage object.

## Deploy
1. Backup Supabase.
2. Push source ke GitHub.
3. Jalankan migration `07_sync_colors_to_njs_reference.sql` di Supabase setelah migrations 01–06 dan seed katalog.
4. Refresh halaman admin/customer.

Lihat `COLOR_AUDIT_NJS.md` untuk daftar warna per model dan keterbatasan trim-level.
