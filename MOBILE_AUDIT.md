# Audit Tampilan Mobile — Suzuki Diki

## Perubahan
- Navbar lebih ringkas di layar kecil; teks brand dapat menyusut tanpa mendorong tombol menu keluar layar.
- Menu mobile memiliki batas tinggi layar dan scroll internal.
- Viewport disetel ke device width dan mendukung safe area perangkat ber-notch.
- Tombol WhatsApp mengambang diperkecil di ponsel dan diposisikan dengan safe-area inset.
- Katalog menggunakan filter kategori tiga kolom yang lebih rapat dan kartu produk dua kolom mulai lebar 520px; di layar lebih kecil tetap satu kolom.
- Kartu produk, galeri detail mobil, kalkulator kredit, formulir, dan footer mendapat padding responsif.
- Input di ponsel memakai ukuran teks minimum 16px untuk mencegah auto-zoom Safari.
- Ditambahkan pencegahan overflow horizontal, focus-visible yang jelas, dan scroll offset untuk header sticky.

## Pemeriksaan
- 22 file TypeScript/TSX dipindai dengan TypeScript transpile syntax check: tidak ditemukan diagnostic sintaks.
- Perubahan kelas responsif diperiksa pada source.
- Belum dilakukan browser/device visual test dan `next build` penuh pada lingkungan ini. Jalankan build di Vercel dan uji pada lebar 320px, 360px, 390px, 768px, serta desktop sebelum publikasi.

## Catatan
- Harga, foto kendaraan, informasi dealer, promo, dan kontak adalah konten/data; audit ini hanya menyentuh responsivitas dan kenyamanan UI.
