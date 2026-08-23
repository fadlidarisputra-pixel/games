# SPACE SHOOTER - Web Arcade Game

Projek Website Game Space Shooter berbasis PHP Native dan HTML5 Canvas tanpa database, dibuat untuk tugas sekolah SMK Rekayasa Perangkat Lunak (RPL).

## 🚀 Fitur Utama
* **Tanpa Database & Framework:** Menggunakan Pure PHP & Vanilla JavaScript.
* **Persistent High Score:** Menggunakan Web `localStorage`.
* **Sound Synthesizer:** Audio dibuat secara real-time via Web Audio API (Tanpa file media eksternal).
* **Responsive Control:** Mendukung Keyboard & Virtual Touch Control untuk Smartphone.
* **Boss Battle System:** Boss muncul di setiap level kelipatan 5.

## 🛠️ Cara Menjalankan di XAMPP / Laragon

1. Salin seluruh folder `space-shooter` ke dalam:
   - **XAMPP:** `C:/xampp/htdocs/`
   - **Laragon:** `C:/laragon/www/`
2. Jalankan Apache Service pada Control Panel XAMPP/Laragon.
3. Buka browser dan akses alamat:
   `http://localhost/space-shooter`

## ⚙️ Kustomisasi Konfigurasi Game

Ubah parameter gameplay pada `config.php`:
```php
define('DEFAULT_LIVES', 3); // Jumlah nyawa awal
define('CANVAS_WIDTH', 800); // Lebar arena
define('CANVAS_HEIGHT', 600); // Tinggi arena