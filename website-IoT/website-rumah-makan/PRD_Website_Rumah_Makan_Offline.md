# Product Requirements Document (PRD)
## Website Rumah Makan / Kuliner (Offline Version)

**Tanggal Pembuatan:** 5 September 2026
**Status:** Draft / Initial
**Platform:** Web (Statis / Desktop & Mobile Browser)

---

## 1. Ringkasan Proyek
Proyek ini bertujuan untuk membangun sebuah website company profile dan katalog menu interaktif untuk rumah makan yang dapat diakses **sepenuhnya secara offline**. Website ini tidak memerlukan koneksi internet, server (backend), maupun database eksternal. Pengguna cukup membuka file `index.html` melalui browser di perangkat mereka.

## 2. Tujuan (Objectives)
* **Aksesibilitas Offline:** Menyediakan katalog menu dan informasi restoran yang dapat diakses 100% tanpa internet.
* **Performa Cepat:** Waktu muat (load time) instan karena semua aset (HTML, CSS, JS, Gambar) berada di penyimpanan lokal.
* **Kemudahan Penggunaan:** Desain UI/UX yang intuitif layaknya website modern, memungkinkan pencarian menu dan filter kategori dengan mudah.

## 3. Ruang Lingkup (Scope)
* Pembuatan halaman web statis (Single Page Application atau Multi-page sederhana).
* Tidak ada pemanggilan API ke pihak ketiga (tidak ada Google Fonts CDN, Bootstrap CDN, dll). Semua *library* (jika ada) harus diunduh dan disimpan secara lokal.
* Data menu (nama, deskripsi, harga, foto) akan disimpan di dalam file JavaScript (sebagai array/JSON statis) untuk memudahkan render ke HTML tanpa perlu server database.
* Semua gambar produk dan ikon disimpan di direktori lokal.

## 4. Kebutuhan Fungsional (Functional Requirements)

### 4.1 Halaman Beranda (Homepage)
* **Hero Banner:** Gambar resolusi tinggi yang menampilkan suasana/makanan andalan restoran.
* **Tentang Kami:** Deskripsi singkat rumah makan, alamat, dan jam operasional.
* **Navigasi:** Menu bar (sticky) untuk berpindah ke bagian Menu, Tentang, dan Kontak.

### 4.2 Katalog Menu (Menu Section)
* **Daftar Menu:** Menampilkan foto makanan, nama, deskripsi singkat, dan harga dalam bentuk grid (kartu).
* **Kategori Filter:** Tombol untuk menyaring menu berdasarkan kategori (contoh: Semua, Makanan Utama, Minuman, Camilan). (Digerakkan oleh Vanilla JavaScript).
* **Fungsi Pencarian:** Kolom pencarian teks untuk mencari nama menu dengan cepat (real-time filtering menggunakan JS).

### 4.3 Keranjang Pesanan Simulasi (Opsional)
* Pengguna dapat mengklik tombol "Tambah" pada menu.
* Pesanan akan terkumpul di satu panel (Keranjang) di pojok layar menggunakan fitur `localStorage` pada browser atau variabel state JavaScript.
* Berguna jika digunakan sebagai sistem kasir mandiri atau tablet menu di meja pelanggan.

## 5. Kebutuhan Non-Fungsional (Non-Functional Requirements)
* **Responsive Design:** Tampilan harus menyesuaikan secara otomatis jika dibuka dari layar HP, tablet, maupun layar desktop (menggunakan CSS Flexbox/Grid atau library lokal).
* **Zero Internet Dependency:** Tidak boleh ada link HTML atau CSS yang berawalan `http://` atau `https://` yang mengarah ke luar aplikasi (kecuali link ke sosial media restoran yang sifatnya eksternal).
* **Kompatibilitas Browser:** Berjalan lancar di Google Chrome, Mozilla Firefox, Safari, dan Microsoft Edge (versi modern).

## 6. Spesifikasi Teknis (Technical Stack)
* **Struktur Halaman:** HTML5
* **Styling (Desain):** CSS3 (Vanilla CSS atau menggunakan framework seperti Bootstrap/Tailwind versi file lokal/unduhan).
* **Interaktivitas & Data:** Vanilla JavaScript (ES6). Data direpresentasikan menggunakan Object/Array JSON di dalam file JS.
* **Aset Visual:** Format `.jpg`, `.png`, `.svg` atau `.webp` yang dioptimasi dan disimpan lokal.

## 7. Arsitektur Folder (File Structure)
Untuk memastikan website berjalan offline, struktur direktori disarankan sebagai berikut:

```text
/website-rumah-makan
│
├── index.html          # Halaman utama aplikasi
├── tentang.html        # (Opsional) Halaman about us jika multi-page
│
├── /css
│   ├── style.css       # Custom styling CSS
│   └── font.css        # Deklarasi font offline (@font-face)
│
├── /js
│   ├── data-menu.js    # Berisi data menu (JSON statis)
│   └── script.js       # Logika interaktif (filter, search, cart)
│
├── /fonts              # File font yang sudah diunduh (.woff2 / .ttf)
│   └── Roboto-Reg.ttf
│
└── /images
    ├── logo.png
    ├── banner-main.jpg
    ├── /menu
    │   ├── ayam-bakar.jpg
    │   ├── es-jeruk.jpg
    │   └── mie-goreng.jpg
    └── /icons
        └── search-icon.svg
```

## 8. Kriteria Penerimaan (Acceptance Criteria)
1. Website dapat dibuka dengan melakukan *double-click* pada file `index.html` dengan koneksi Wi-Fi/Data dimatikan.
2. Semua gambar muncul dengan sempurna (tidak ada ikon gambar *broken*).
3. Fungsi tab kategori dan pencarian menu (search) berjalan tanpa me-refresh halaman.
4. Tampilan tidak berantakan jika ukuran *window* browser dikecilkan ke ukuran *mobile*.
