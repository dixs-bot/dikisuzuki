# Audit UI/UX dan perbaikan visual — Suzuki Diki

## Arah desain
Website diarahkan ke gaya showroom otomotif profesional: bersih, tenang, mudah dibaca, dan fokus pada katalog serta konsultasi. Palet biru tua, putih, dan aksen biru tetap dipertahankan; efek neon/gradient dikurangi agar tidak terlihat ramai.

## Temuan audit
1. Font keluarga Plus Jakarta Sans disebut di CSS tetapi belum dimuat sebagai font aplikasi. Browser berpotensi menggunakan fallback yang berbeda.
2. Navbar memakai logo gradient, label kecil, dan jarak menu yang belum terasa konsisten.
3. Beberapa kartu memakai shadow, gradient, border, badge, dan radius besar sekaligus sehingga hierarki visual kurang tenang.
4. Kartu produk menggunakan placeholder berbentuk kotak teks yang terlalu dominan.
5. Footer memuat beberapa klaim layanan/garansi yang tidak perlu untuk fungsi navigasi dan sebaiknya hanya dipublikasikan jika sudah terverifikasi.
6. Ukuran label dan teks sekunder di beberapa halaman terlalu kecil.

## Perbaikan yang diterapkan
- Memuat font Manrope melalui `next/font/google` dan menggunakannya sebagai font utama.
- Menetapkan ulang skala tipografi, warna teks, garis batas, radius, shadow, dan fokus input di `src/app/globals.css`.
- Mengurangi efek glow dan gradient yang berlebihan; tombol utama menggunakan warna biru solid.
- Menata ulang navbar agar logo, nama sales, menu, dan CTA lebih jelas.
- Menata ulang footer menjadi empat kolom dengan informasi ringkas dan tautan yang konsisten.
- Merapikan kartu produk, mengurangi badge mencolok, dan menata ulang harga serta tombol tindakan.
- Mengubah beberapa microcopy bahasa Inggris di homepage menjadi Bahasa Indonesia.
- Mempertahankan rute, fungsi katalog, kalkulator, WhatsApp, form, metadata SEO, serta struktur admin.

## Catatan sebelum produksi
- Font Google dimuat saat proses build Next.js. Pastikan proses build/deploy Vercel dapat mengakses Google Fonts; jika build gagal karena koneksi font, gunakan font lokal atau hapus import `next/font/google`.
- Source ini belum menjalani `next build` di lingkungan audit karena dependensi proyek tidak terpasang di arsip.
- Periksa kembali foto kendaraan, harga, alamat, nomor kontak, promo, dan klaim layanan sebelum publikasi.
- Setelah mengganti source di GitHub, jalankan `npm install` lalu `npm run build` sebelum deploy.
