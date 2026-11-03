# V18 — Finance partner logos

## Fitur
- Admin: `/admin/finance` untuk upload, lihat, sembunyikan/tampilkan, dan hapus logo finance.
- Customer: logo aktif muncul kecil dan rapi di bawah pilihan tenor pada widget simulasi kredit.
- Logo disimpan pada Supabase Storage bucket `finance-partners`; metadata di tabel `finance_partners`.

## Deploy database (wajib sebelum upload)
Jalankan `supabase/migrations/08_finance_partners.sql` di Supabase SQL Editor.
Migration membuat tabel, bucket publik khusus logo, serta RLS. Upload/update/delete dibatasi ke admin melalui `public.is_admin()`. Pembacaan logo aktif bersifat publik agar dapat ditampilkan customer.

## Upload
Masuk Admin Dashboard → Logo Finance. Isi nama perusahaan, pilih JPG/PNG/WebP maksimal 2 MB, lalu Upload Logo.
Gunakan logo transparan/horizontal agar tampil rapi. Belum ada logo yang ditambahkan otomatis; admin mengunggah aset yang benar-benar sudah mendapat izin/kerja sama.

## Integrasi
Tidak mengubah tabel kendaraan, warna, foto kendaraan, kalkulasi kredit, maupun data lain. Tidak ada data Supabase yang perlu di-seed.
