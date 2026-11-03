# Suzuki Diki V11 — Galeri Warna & Slideshow

## Perubahan
- Kartu katalog (`ProductCard`) sekarang membaca foto utama, warna, dan foto galeri dari Supabase berdasarkan slug/model.
- Kartu katalog menampilkan foto mobil dari `products.main_image_url` sebagai gambar default.
- Jika ada foto di `vehicle_photos` untuk warna aktif, foto-foto warna tersebut menggantikan gambar default.
- Swatch warna pada kartu katalog mengganti foto ke galeri warna yang dipilih.
- Jika satu warna memiliki lebih dari satu foto, kartu melakukan slideshow otomatis setiap 4 detik dan menyediakan tombol navigasi manual.
- Halaman detail kendaraan memakai `products.main_image_url` sebagai visual default, kemudian menampilkan foto khusus warna yang dipilih.
- Slideshow otomatis dan tombol next/previous tersedia pada halaman detail untuk galeri dengan lebih dari satu foto.
- Gambar kendaraan memakai `object-contain` dan wadah putih/transparan agar kendaraan tidak terpotong dan latar wadah tidak menjadi hitam.
- Preview dan daftar foto di admin galeri menggunakan `object-contain`.

## Penting tentang PNG transparan
CSS tidak dapat menghapus latar hitam yang sudah menjadi bagian permanen dari piksel gambar. Untuk hasil transparan, file harus berupa PNG yang memiliki alpha channel transparan. Jika file PNG yang diunggah memiliki latar hitam opaque, latar tersebut tetap akan terlihat; penghapusan latar otomatis berisiko menghapus ban, grill, kaca, dan detail mobil yang juga berwarna gelap.

Di formulir admin galeri ditambahkan petunjuk agar mengunggah PNG transparan untuk foto eksterior kendaraan.

## Sumber gambar default
- `products.main_image_url` adalah sumber gambar default tiap model.
- `vehicle_photos` adalah sumber gambar khusus warna dan slideshow.
- Pastikan `main_image_url` diisi dengan URL gambar publik dari Supabase Storage atau URL gambar yang dapat diakses publik.
- Foto khusus warna harus memiliki `product_id` dan `color_id` yang cocok. Migration isolasi V9 tetap melindungi relasi ini.

## Verifikasi
- Perlu uji langsung setelah deployment: kartu katalog, ganti warna, slideshow, halaman detail, dan lightbox.
- Build produksi harus dijalankan di lingkungan project karena konfigurasi dan variabel Supabase aktual hanya tersedia di akun pemilik.
