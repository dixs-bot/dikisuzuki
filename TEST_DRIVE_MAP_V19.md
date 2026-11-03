# V19 — Test Drive Admin + Contact Map

## Perbaikan
1. Form `/test-drive` sekarang menyimpan permintaan langsung ke `public.test_drive_requests` di Supabase sebelum menampilkan status sukses.
2. Menambahkan halaman admin `/admin/test-drive` untuk melihat seluruh booking, filter status, mengubah status, menyimpan catatan admin, dan membuka WhatsApp pelanggan.
3. Menambahkan tombol Booking Test Drive di dashboard admin.
4. Mengganti placeholder peta pada `/kontak` dengan Google Maps embed. Kartu informasi showroom dan tombol navigasi tetap dipertahankan.

## Wajib dijalankan di Supabase
Jalankan migration `supabase/migrations/09_test_drive_admin_access.sql` di SQL Editor.
Migration memberi izin INSERT kepada customer anonim dan SELECT/UPDATE/DELETE kepada authenticated admin yang lolos `public.is_admin()`.

## Verifikasi
- Customer submit: insert ke `test_drive_requests`; pesan sukses hanya tampil jika insert berhasil.
- Admin: `/admin/test-drive`; akses data bergantung pada sesi login dan profil admin Supabase.
- Tidak mengubah tabel warna, katalog, galeri, finance partners, atau perhitungan kredit.
- Peta menggunakan Google Maps embed query alamat dealer. Periksa akurasi pin setelah deploy.
