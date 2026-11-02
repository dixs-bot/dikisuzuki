# SEO Plan & Audit — Suzuki Diki Wahyudin

## Target positioning
Website ini diposisikan sebagai **website konsultasi sales Suzuki Bandung milik Diki Wahyudin**, bukan mengaku sebagai website resmi Suzuki Indonesia atau membuat klaim dealer resmi tanpa otorisasi yang dapat dibuktikan.

## Keyword map (prioritas awal)
Kata kunci di bawah merupakan hipotesis berdasarkan intent pencarian lokal dan istilah yang terlihat pada hasil pencarian/halaman terkait. Ini bukan angka volume pencarian dari Keyword Planner. Validasi dan prioritaskan ulang dengan Google Search Console setelah situs terindeks.

| Prioritas | Kata kunci | Intent | Halaman target |
|---|---|---|---|
| P1 | sales Suzuki Bandung | mencari sales lokal | Beranda |
| P1 | harga mobil Suzuki Bandung | membandingkan harga | Katalog |
| P1 | promo Suzuki Bandung | mencari promo berjalan | Promo |
| P1 | kredit mobil Suzuki Bandung | mencari pembiayaan | Simulasi |
| P1 | sales mobil Suzuki Bandung | mencari sales lokal | Beranda/Kontak |
| P2 | simulasi kredit Suzuki Bandung | menghitung cicilan | Simulasi |
| P2 | test drive Suzuki Bandung | ingin mencoba unit | Test Drive |
| P2 | sales Suzuki Cimahi | mencari sales di area sekitar | Beranda/Kontak |
| P2 | harga Suzuki XL7 Bandung | riset model tertentu | Detail XL7 |
| P2 | harga Suzuki Fronx Bandung | riset model tertentu | Detail Fronx |
| P2 | harga Suzuki Ertiga Bandung | riset model tertentu | Detail Ertiga |
| P2 | harga Suzuki Carry Bandung | kebutuhan niaga | Detail Carry |
| P3 | sales Suzuki Ahmad Yani Bandung | pencarian area spesifik | Kontak |
| P3 | kredit Suzuki XL7 Bandung | model + kredit | Detail XL7 |
| P3 | kredit Suzuki Carry Bandung | model niaga + kredit | Detail Carry |

Jangan menjejalkan semua kata kunci ke setiap halaman. Setiap halaman punya satu maksud pencarian utama, dengan istilah pendukung yang relevan secara alami.

## Implementasi di source
- Title dan meta description unik untuk beranda, katalog, promo, simulasi, kontak, test drive, dan tiap halaman model.
- Canonical URL untuk mengurangi duplikasi.
- `robots.txt` mengizinkan halaman publik dan mengecualikan area admin.
- `sitemap.xml` mencantumkan halaman utama dan seluruh detail model.
- Structured data `WebSite` dan `Person` yang sesuai dengan identitas sales; tidak membuat klaim rating, review, atau tipe dealer yang belum diverifikasi.
- Breadcrumb structured data pada halaman detail mobil.
- Konten berbahasa Indonesia yang menjelaskan layanan, area layanan, harga referensi, simulasi, dan test drive.
- Redirect `/mobil` ke `/katalog` dan `/tentang` ke `/kontak` karena sebelumnya kedua URL tersebut menampilkan konten duplikat.

## Wajib sebelum production
1. Pastikan domain produksi sebenarnya. Atur `NEXT_PUBLIC_SITE_URL` di Vercel ke domain HTTPS produksi yang benar. Nilai di `.env.example` hanya contoh default dan harus diganti jika domain berbeda.
2. Pastikan alamat showroom, nama dealer, nomor WhatsApp, email, jam layanan, dan cakupan area layanan benar serta diizinkan untuk dipublikasikan.
3. Verifikasi semua harga, DP, cicilan, varian, spesifikasi, dan foto kendaraan. Data pada `src/data/products.ts` tidak otomatis menjadi harga resmi/real-time.
4. Jangan menayangkan promo cashback, bunga 0%, DP tertentu, hadiah, klaim approval, atau garansi tertentu tanpa bukti program yang masih berlaku.
5. Ganti placeholder visual mobil pada kartu produk dengan foto kendaraan asli yang berizin. Gunakan nama file deskriptif dan alt text spesifik, misalnya `suzuki-xl7-bandung-tampak-depan.webp`.
6. Tambahkan foto profil sales, foto showroom/dealer yang benar, foto unit aktual, dan bukti serah-terima hanya jika ada izin pelanggan.
7. Tambahkan kebijakan privasi bila form mengumpulkan nama/nomor telepon; jelaskan tujuan penggunaan data dan persetujuan kontak.

## Setelah deploy
1. Tambahkan properti domain di Google Search Console dan verifikasi kepemilikan.
2. Pastikan `https://DOMAIN-ANDA/robots.txt` dapat dibuka.
3. Pastikan `https://DOMAIN-ANDA/sitemap.xml` dapat dibuka, lalu kirim di Search Console.
4. Gunakan URL Inspection untuk beranda, katalog, dan 2-3 halaman model utama; minta pengindeksan jika tersedia.
5. Hubungkan Google Analytics 4 (atau alat analitik yang disetujui) untuk mengukur klik WhatsApp, klik telepon, dan pengiriman form.
6. Periksa laporan Performance Search Console tiap minggu: query, impressions, clicks, CTR, dan average position. Buat konten baru berdasarkan query yang benar-benar membawa calon pembeli.
7. Untuk pencarian Maps, koordinasikan dengan profil Google Business Profile dealer yang memang resmi dan terverifikasi. Jangan membuat profil lokasi duplikat untuk sales individual di alamat dealer tanpa memenuhi aturan Google.

## Batasan
SEO tidak menjamin halaman pertama atau waktu indeks tertentu. Sitemap membantu discovery, tetapi Google tetap menentukan crawling, indexing, dan ranking berdasarkan kualitas, relevansi, pengalaman pengguna, otoritas, dan faktor lainnya.
