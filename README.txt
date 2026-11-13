Website Kursi Auditorium Zeco - PT Cahaya Mustika Internesia
=============================================================

Situs HTML statis (tanpa build). Upload seluruh isi folder ini ke hosting,
KECUALI folder _arsip-tidak-dipakai/ dan file README.txt.

STRUKTUR
--------
index.html                       Beranda (6 model pilihan, ringkasan portofolio & artikel)
produk.html                      Semua 16 model, contoh spesifikasi, cara memesan
kursi-auditorium-zc-XXXX.html    Halaman spesifikasi tiap model (16 halaman)
artikel.html                     Daftar artikel (3 tahap: Memilih, Menata, Merawat)
artikel-*.html                   Isi artikel (3 halaman)
portofolio.html                  Daftar proyek
portofolio-*.html                Detail proyek (4 halaman). portofolio-auditorium-berundak.html
                                 menggabungkan hasil akhir, pemasangan, detail kursi, dan area sofa.
                                 File lama (-hasil-akhir, -detail-kursi-, -sofa-dan-meja-tamu) hanya
                                 halaman pengalih ke bagian yang sesuai.
kontak.html                      Kontak, alamat, dan peta
404.html                         Halaman "tidak ditemukan" (atur di hosting sebagai error page 404)
robots.txt                       Izin untuk mesin pencari
style.css / script.js            Gaya dan skrip untuk semua halaman

images/                          Logo, foto hero, favicon
images/produk/                   Foto 16 model kursi
images/portofolio/               Foto proyek (ukuran besar)
images/portofolio/thumb/         Thumbnail foto proyek yang tampil di kartu
images/artikel/                  Foto sampul artikel
_arsip-tidak-dipakai/            Gambar lama yang tidak dipakai di halaman mana pun (jangan diupload;
                                 boleh dihapus bila sudah yakin)

YANG PERLU DILENGKAPI
---------------------
1. Spesifikasi model. Baru ZC 6706 yang tabelnya lengkap (ZC 8808 sebagian). Model lain baru
   berisi Merek, Jenis, dan Model. Untuk melengkapi, buka file model lalu tambahkan baris di
   dalam <tbody> pada <table class="pd-table">:
     <tr><th scope="row">Nama spesifikasi</th><td>Nilai</td></tr>
   Bila data sudah lengkap, ganti kalimat <p class="pd-note"> menjadi:
     Spesifikasi dapat berubah mengikuti produksi. Konfirmasikan detail terbaru sebelum memesan.
2. Portofolio: nama klien, lokasi, jumlah kursi, dan model belum dicantumkan.
   Foto yang memperlihatkan wajah, layar monitor, atau nama institusi sengaja tidak dipakai;
   tambahkan bila sudah ada izin dari klien.
3. Setelah domain diketahui: tambahkan sitemap.xml, <link rel="canonical">, dan tag Open Graph
   (og:title, og:description, og:image) di setiap halaman, lalu tambahkan baris
   "Sitemap: https://DOMAIN/sitemap.xml" di robots.txt.

RIWAYAT SINGKAT
---------------
v32  Portofolio dari foto asli; foto stok/foto dari situs Zeco diganti foto lokal.
v33  Galeri + lightbox di portofolio; foto sampul artikel diganti foto proyek.
v34  Tambah proyek Auditorium Besar Kursi Biru Muda dan Auditorium Kecil Kursi Abu-abu.
v35  Foto terbalik diputar; foto bertuliskan nama institusi dihapus.
v36  3 artikel ditulis ulang.
v37  Foto yang mirip dihapus; artikel diberi daftar panduan, intisari, daftar isi, "Baca berikutnya".
v38  Galeri semua proyek dihapus; bagian artikel jadi perjalanan 3 tahap.
v39  Favicon, 404.html, robots.txt; 26 gambar tak terpakai dipindah ke _arsip-tidak-dipakai/.
v40  Portofolio digabung jadi 4 proyek ruangan (grid 2x2).
