# Audit warna Suzuki Diki — referensi Suzuki NJS Cimahi

Tanggal audit: 3 November 2026
Referensi utama yang diminta pengguna: https://suzukinjs.co.id/suzuki-cimahi/mobil

## Hasil audit dan warna model

Warna di bawah adalah pilihan warna yang terbaca pada halaman detail model NJS yang terindeks. Nama warna dinormalisasi ringan untuk ejaan/format (contoh: `Brave Kakhi` menjadi `Brave Khaki`, `Mello Deep Red` menjadi `Mellow Deep Red`). Kode HEX hanya perkiraan visual untuk swatch, bukan kode cat resmi Suzuki.

| Model di website | Pilihan warna yang diselaraskan |
|---|---|
| Fronx | Cool Black with Black Grille; Ice Grayish Blue - Black; Pearl Snow White - Black; Savanna Ivory - Black; Cool Black; Pearl Snow White; Savanna Ivory; Metallic Magma Gray |
| XL7 Hybrid | Ice Grayish Blue - Black; Savanna Ivory - Black; Marble Black; Pearl Snow White - Black; Metallic Magma Grey |
| Grand Vitara | Pearl Cave Black; Pearl Midnight Black; Pearl Arctic White - Black; Prime Splendid Silver - Black |
| New Carry Pick-Up | Real Black; Prime Graphite Grey; White; Silky Silver |
| All New Ertiga / Ertiga Hybrid | Prime Cool Black; Brave Khaki; Mellow Deep Red; Metallic Magma Gray; Pearl Snow White; Silky Silver |
| APV Arena | Cool Black Metallic; Burgundy Red; Graphite Grey Metallic; Silky Silver Metallic |
| S-Presso | Granite Gray Metallic; White; Silky Silver Metallic; Solid Fire Red; Sizzle Orange |
| Jimny 3 Door | Kinetic Yellow 2 - Pearl Bluish Black 4; Metallic Brisk Blue - Pearl Bluish Black 3; Metallic Chiffon Ivory 2 - Pearl Bluish Black 4; Pearl White; Silky Silver Metallic; Medium Grey; Bluish Black Pearl 3 |
| Jimny 5 Door | Jungle Green 2; Kinetic Yellow 2 - Pearl Bluish Black 4; Metallic Chiffon Ivory 2 - Pearl Bluish Black 4; Metallic Sizzling Red - Pearl Bluish Black 4; Bluish Black 4; Granite Gray Metallic |

## Produk lokal yang tidak punya halaman warna terpisah di referensi yang diberikan

- Carry Box: tetap mempertahankan pilihan lama di database karena merupakan bentuk bodi/karoseri tambahan dan tidak muncul sebagai model warna terpisah pada halaman referensi. Konfirmasi warna bodi/karoseri ke dealer sebelum ditampilkan sebagai ketersediaan resmi.
- APV Blind Van: tetap mempertahankan pilihan lokal yang ada sampai dealer mengonfirmasi apakah palet APV Arena berlaku identik untuk varian Blind Van.
- Daftar model NJS menampilkan All New Ertiga dan All New Ertiga Hybrid sebagai item terpisah. Source lokal memakai satu slug `ertiga`, jadi palet All New Ertiga yang terbaca pada halaman detail diterapkan ke satu entri tersebut. Konfirmasi ke dealer apakah seluruh warna identik untuk Hybrid dan non-Hybrid.

## Catatan penting tentang varian/trim

NJS menampilkan palet XL7 terpisah untuk Alpha, Beta, dan Zeta serta Fronx per kelompok trim. Karena struktur database website Suzuki Diki saat ini menyimpan warna pada level model (`product_id`) dan belum punya tabel pemetaan warna per varian, implementasi ini menampilkan gabungan warna yang tercantum pada halaman model. Jangan menganggap semua warna tersedia pada setiap trim. Untuk akurasi per tipe/trim, perlu tahap lanjutan: tabel `product_variant_colors` dan filter pilihan warna berdasarkan varian yang dipilih.

## Keamanan data galeri

Migration 07 menambah `vehicle_colors.is_active`. Warna lama yang tidak lagi ada di daftar referensi diarsipkan dengan `is_active = false`, bukan dihapus. Ini mempertahankan foto yang sudah terhubung melalui `vehicle_photos.color_id`; file foto dan metadata tidak dihapus. Halaman customer hanya membaca warna aktif, sedangkan admin tetap dapat melihat baris warna arsip untuk referensi foto lama.

## Langkah pemasangan

1. Backup database Supabase.
2. Push source V13 ke GitHub dan tunggu Vercel Ready.
3. Jalankan `supabase/migrations/07_sync_colors_to_njs_reference.sql` di Supabase SQL Editor setelah migration 01–06 dan setelah data produk tersedia.
4. Refresh admin gallery dan halaman customer.
5. Periksa hasil dengan query verifikasi pada akhir migration.

## Sumber rujukan halaman produk

- Katalog NJS Cimahi: https://suzukinjs.co.id/suzuki-cimahi/mobil
- Fronx: https://suzukinjs.co.id/rancaekek/mobil/fronx/63 (halaman produk yang terindeks untuk model Fronx)
- XL7 Hybrid: https://suzukinjs.co.id/suzuki-cimahi/mobil/xl7-hybrid/62
- Grand Vitara: https://suzukinjs.co.id/suzuki-cimahi/mobil/grand-vitara/59
- New Carry Pick-Up: https://suzukinjs.co.id/cibereum/mobil/new-carry-pick-up/13
- All New Ertiga: https://suzukinjs.co.id/suzuki-ahmad-yani/mobil/all-new-ertiga/1
- APV Arena: https://suzukinjs.co.id/suzuki-cimahi/mobil/apv-arena/10
- S-Presso: https://suzukinjs.co.id/suzuki-ahmad-yani/mobil/s-presso/53
- Jimny: https://suzukinjs.co.id/suzuki-cimahi/mobil/jimny/8

Sumber warna adalah halaman dealer yang diminta pengguna. Harga dan ketersediaan unit tidak diubah dalam audit ini.
