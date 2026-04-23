# Web-Based Accelerometer Data Monitoring System

## Deskripsi Proyek
Proyek ini merupakan sistem pemantauan berbasis web yang dirancang untuk menangkap, mentransmisikan, dan memvisualisasikan data akselerometer secara *real-time*. Dengan memanfaatkan API sensor bawaan pada perangkat bergerak (*DeviceMotionEvent*), sistem ini merekam perubahan akselerasi pada sumbu X, Y, dan Z. Data tersebut kemudian diproses dan dikelola melalui arsitektur *cloud* menggunakan Google Apps Script (GAS) untuk kebutuhan pemantauan atau perekaman data dinamis.

Sistem ini sangat ideal untuk eksperimen fisika, analisis pergerakan (*motion tracking*), atau prototipe *Internet of Things* (IoT) berbasis web tanpa memerlukan aplikasi *native* tambahan.

## Fitur Utama
* **Perekaman Data Multisumbu:** Ekstraksi data akselerasi perangkat pada ruang tiga dimensi (Sumbu X, Y, dan Z) secara presisi.
* **Transmisi Data *Real-Time*:** Pengiriman *stream* data dari perangkat *client* ke *server* menggunakan metode *asynchronous* (AJAX/Google Script Run).
* **Dasbor Pemantauan Terpusat:** Antarmuka pemantauan jarak jauh untuk melihat fluktuasi pergerakan perangkat secara langsung.
* **Arsitektur Nirkabel (Web-Based):** Tidak memerlukan instalasi aplikasi khusus, cukup diakses melalui peramban (*browser*) perangkat yang mendukung fitur *Device Orientation & Motion*.

## Arsitektur & Teknologi
* **Frontend:** HTML5, CSS, dan JavaScript murni (Pemanfaatan Web API untuk Akselerometer).
* **Backend / Middleware:** Google Apps Script (GAS)
* **Manajemen Proyek:** Clasp (*Command Line Apps Script Projects*)

## Struktur Repositori
Repositori ini mengadopsi arsitektur pemisahan *client-server* sederhana melalui lingkungan GAS:
* `Kode.js`: Skrip *backend* yang berfungsi sebagai *controller* utama. Berkas ini menangani perutean (*routing*) antarmuka web, logika penerimaan *payload* data akselerometer, dan interaksi dengan *database* (seperti Google Sheets).
* `sensor.html`: Antarmuka *client-side* yang diakses melalui ponsel/perangkat seluler. Skrip di dalamnya bertugas meminta izin akses sensor pergerakan dan membaca *output* akselerometer.
* `monitor.html`: Antarmuka *dashboard* yang diakses pada layar komputer/tablet untuk menerima dan menampilkan visualisasi data pergerakan yang dikirimkan oleh sensor.
* `appsscript.json`: Berkas konfigurasi manifes untuk mendefinisikan izin akses web dan dependensi proyek di lingkungan Google.
* `.clasp.json`: Berkas utilitas lokal untuk memfasilitasi integrasi repositori *offline* dengan *cloud environment* GAS.

## Panduan Penggunaan dan Pengembangan Lokal
Untuk melakukan kloning dan pengembangan lebih lanjut pada mesin lokal, ikuti langkah berikut:

1. Pastikan **Node.js** terinstal di perangkat Anda.
2. Instal Google Clasp secara global melalui terminal:
   ```bash
   npm install @google/clasp -g
