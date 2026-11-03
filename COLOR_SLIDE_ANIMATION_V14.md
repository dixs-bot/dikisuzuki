# V14 — Animasi Slide Pilihan Warna Mobil

## Perubahan
- Menambahkan transisi slide halus pada area foto mobil saat pengunjung memilih warna.
- Memilih warna yang posisinya setelah warna aktif membuat gambar masuk dari kanan; memilih warna sebelumnya membuat gambar masuk dari kiri.
- Transisi juga berlaku saat foto galeri warna yang sedang dipilih berganti.
- Menghormati pengaturan `prefers-reduced-motion` pada perangkat pengunjung.

## Supabase tetap tidak disentuh
- Tidak ada perubahan schema, migration, seed, tabel, row, ID, nama warna, atau HEX warna.
- Query `vehicle_colors` dan `vehicle_photos` tetap sama persis.
- Pilihan warna tetap dibaca dari Supabase; perubahan hanya pada state tampilan dan CSS animasi.

## File yang diubah
- `src/app/mobil/[slug]/ProductDetailClient.tsx`
- `src/app/globals.css`

## Catatan
Animasi menggeser foto yang sudah tersedia di galeri warna. Jika warna belum memiliki foto, komponen tetap menampilkan placeholder yang ikut dianimasikan; animasi tidak membuat foto mobil baru.
