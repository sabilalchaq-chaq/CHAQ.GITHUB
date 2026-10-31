# PRD — Website Jasa Peternak Ayam Berbasis IoT (Offline)

## 1. Informasi Proyek
- **Nama proyek:** AyamIoT Farm
- **Jenis:** Website jasa peternakan ayam berbasis IoT
- **Mode:** 100% offline
- **Teknologi:** HTML, CSS, JavaScript
- **Aset:** Gambar disimpan secara lokal di folder `images/`
- **Target:** Website dapat dibuka melalui `index.html` tanpa koneksi internet.

## 2. Latar Belakang
Website ini dibuat untuk memperkenalkan jasa peternakan ayam yang memanfaatkan teknologi IoT (Internet of Things). Website menampilkan informasi layanan, teknologi yang digunakan, kondisi kandang, keunggulan, dan kontak.

Karena website harus dapat digunakan tanpa internet, seluruh kode, gambar, ikon, dan aset yang dibutuhkan harus tersimpan di dalam project.

## 3. Tujuan Website
1. Memperkenalkan jasa peternakan ayam berbasis IoT.
2. Menjelaskan manfaat penggunaan IoT pada peternakan ayam.
3. Menampilkan layanan yang tersedia.
4. Menampilkan informasi monitoring kandang secara simulasi menggunakan JavaScript.
5. Membuat tampilan website sederhana, modern, dan mudah dipahami.
6. Memastikan website tetap dapat dibuka tanpa koneksi internet.

## 4. Target Pengguna
- Pemilik peternakan ayam.
- Peternak ayam skala kecil dan menengah.
- Calon pelanggan jasa peternakan.
- Siswa/pelajar yang ingin mempelajari contoh website IoT.

## 5. Teknologi
### HTML
Untuk membuat struktur dan isi halaman.

### CSS
Untuk mengatur layout, warna, ukuran, responsivitas, dan animasi sederhana.

### JavaScript
Untuk interaksi website dan simulasi data monitoring IoT.

### Gambar Offline
Semua gambar disimpan di folder `images/` dan dipanggil dengan path lokal.

**Catatan:** Jangan menggunakan CDN, Google Fonts, gambar dari URL internet, atau API online jika website harus benar-benar offline.

## 6. Struktur Halaman
1. Navbar
2. Hero Section
3. Tentang Kami
4. Layanan
5. Monitoring IoT
6. Keunggulan
7. Proses Kerja
8. Galeri
9. Kontak
10. Footer

## 7. Detail Fitur

### 7.1 Navbar
Menampilkan logo/nama AyamIoT Farm dan menu Home, Tentang, Layanan, Monitoring, Galeri, dan Kontak.

### 7.2 Hero Section
Berisi judul utama, deskripsi singkat, tombol "Lihat Layanan", tombol "Monitoring Kandang", dan gambar peternakan lokal.

### 7.3 Tentang Kami
Menjelaskan profil jasa peternakan, konsep peternakan berbasis teknologi, dan penggunaan IoT untuk membantu pemantauan kondisi kandang.

### 7.4 Layanan
Buat kartu layanan:
- **Monitoring Kandang** — pemantauan kondisi kandang.
- **Monitoring Suhu** — menampilkan data suhu.
- **Monitoring Kelembapan** — menampilkan data kelembapan.
- **Pemantauan Pakan** — informasi kondisi/ketersediaan pakan.
- **Konsultasi Peternakan** — konsultasi pengelolaan peternakan berbasis teknologi.

### 7.5 Monitoring IoT
Buat dashboard monitoring berbasis simulasi JavaScript.

Contoh data:
```text
Suhu          28°C
Kelembapan    65%
Pakan         80%
Kandang       Normal
Sistem        Aktif
```

Karena website offline dan tidak terhubung ke perangkat IoT sungguhan, data monitoring hanya berupa **data simulasi**.

JavaScript dapat digunakan untuk mengubah nilai sensor secara berkala, menampilkan status Normal/Waspada, menampilkan waktu pembaruan, dan memberikan indikator visual.

### 7.6 Keunggulan
- Monitoring lebih mudah.
- Informasi lebih terstruktur.
- Membantu pemantauan kondisi kandang.
- Menggunakan teknologi modern.
- Tampilan sederhana dan mudah digunakan.

### 7.7 Proses Kerja
Buat alur:
**Sensor → Data → Sistem IoT → Monitoring → Informasi**

### 7.8 Galeri
Gunakan gambar lokal seperti kandang ayam, ayam ternak, tempat pakan, peralatan peternakan, dan teknologi monitoring.

### 7.9 Kontak
Tampilkan nama usaha, alamat, nomor telepon, email, serta form nama, email, pesan, dan tombol Kirim.

Karena website offline, form tidak benar-benar mengirim data ke server. JavaScript cukup memberikan notifikasi bahwa pesan diproses secara lokal.

### 7.10 Footer
Berisi nama usaha, deskripsi singkat, copyright, dan navigasi.

## 8. Struktur Folder
```text
ayam-iot-farm/
├── index.html
├── style.css
├── script.js
└── images/
    ├── logo.png
    ├── hero.jpg
    ├── kandang.jpg
    ├── ayam.jpg
    ├── pakan.jpg
    ├── monitoring.jpg
    └── peternakan.jpg
```

## 9. Ketentuan Offline
- Tidak membutuhkan koneksi internet.
- Tidak menggunakan CDN.
- Tidak menggunakan API online.
- Tidak menggunakan database online.
- Tidak menggunakan gambar dari internet.
- Tidak menggunakan font online.
- Semua gambar berada di folder `images/`.
- CSS berada di `style.css`.
- JavaScript berada di `script.js`.
- Website dijalankan dengan membuka `index.html`.
- Jika memakai library/ikon, file harus disimpan secara lokal.

## 10. Desain UI/UX
- Modern, bersih, sederhana, dan bertema peternakan + teknologi.
- Gunakan warna yang nyaman dilihat.
- Responsif untuk desktop, tablet, dan smartphone.

## 11. JavaScript
Fitur yang dapat dibuat:
1. Menu navigasi mobile.
2. Tombol scroll ke section.
3. Simulasi perubahan data sensor.
4. Status monitoring.
5. Waktu update data.
6. Validasi form kontak.
7. Notifikasi setelah form diproses.
8. Animasi sederhana.

## 12. Contoh Data Monitoring
| Data | Nilai | Status |
|---|---:|---|
| Suhu | 28°C | Normal |
| Kelembapan | 65% | Normal |
| Pakan | 80% | Tersedia |
| Kandang | Aktif | Normal |
| Sistem | Lokal | Aktif |

## 13. Alur Pengguna
```text
Buka index.html
↓
Hero Section
↓
Tentang Kami
↓
Layanan
↓
Monitoring IoT
↓
Keunggulan & Galeri
↓
Kontak
```

## 14. Kriteria Keberhasilan
Website dianggap berhasil jika:
- `index.html` dapat dibuka tanpa internet.
- Semua gambar tampil dari folder lokal.
- CSS dan JavaScript berjalan.
- Navbar dapat berpindah section.
- Dashboard menampilkan data simulasi.
- Form memberikan notifikasi lokal.
- Tampilan responsif.
- Fitur utama tidak bergantung pada internet.
- Struktur folder rapi.

## 15. Tahapan Pengerjaan
### Tahap 1 — Persiapan
Membuat folder project, menyiapkan VS Code, dan menyiapkan gambar offline.

### Tahap 2 — HTML
Membuat struktur HTML, navbar, hero, layanan, monitoring, galeri, kontak, dan footer.

### Tahap 3 — CSS
Mengatur layout, warna, typography, kartu layanan, dashboard, dan responsivitas.

### Tahap 4 — JavaScript
Membuat navigasi interaktif, simulasi data IoT, status monitoring, dan validasi form.

### Tahap 5 — Pengujian
Buka `index.html`, matikan koneksi internet, lalu cek gambar, tombol, navigasi, JavaScript, dan tampilan desktop/mobile.

### Tahap 6 — Finalisasi
Perbaiki error, rapikan kode, pastikan file berada di folder yang benar, lalu uji kembali secara offline.

## 16. Prompt AI Opsional
> Buatkan website jasa peternakan ayam berbasis IoT menggunakan HTML, CSS, dan JavaScript. Website harus 100% offline dan tidak menggunakan CDN, API online, Google Fonts, atau gambar dari internet. Buat struktur folder yang terdiri dari index.html, style.css, script.js, dan folder images. Buat section navbar, hero, tentang kami, layanan, monitoring IoT, keunggulan, proses kerja, galeri, kontak, dan footer. Monitoring IoT menggunakan data simulasi JavaScript karena tidak terhubung ke sensor IoT sungguhan. Gunakan desain modern, sederhana, responsif, dan mudah dipahami. Semua gambar harus menggunakan file lokal dari folder images.

## 17. Output Akhir
Website jasa peternakan ayam berbasis IoT yang dibuat dengan HTML, CSS, JavaScript, menggunakan gambar lokal, memiliki simulasi dashboard monitoring, responsif, rapi, dan dapat dibuka tanpa koneksi internet.
