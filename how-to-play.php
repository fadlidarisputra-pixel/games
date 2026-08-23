<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= GAME_TITLE ?> - Cara Bermain</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="stars-bg"></div>
    <div class="container">
        <div class="card glass">
            <h2 class="glow-text text-center">CARA BERMAIN</h2>
            
            <div class="guide-section">
                <h3>Kontrol</h3>
                <ul>
                    <li><strong>Gerak Kiri/Kanan:</strong> Tombol <code>Arrow Left / Right</code> atau <code>A / D</code></li>
                    <li><strong>Menembak:</strong> Tombol <code>Spacebar</code></li>
                    <li><strong>Mobile:</strong> Gunakan tombol Virtual D-Pad dan Shoot di layar</li>
                </ul>
            </div>

            <div class="guide-section">
                <h3>Jenis Musuh</h3>
                <div class="grid-2">
                    <div><strong>Enemy Normal:</strong> HP 1 | Score 100</div>
                    <div><strong>Enemy Fast:</strong> HP 1 | Score 150 (Cepat)</div>
                    <div><strong>Enemy Tank:</strong> HP 3 | Score 300 (Kuat)</div>
                    <div><strong>Boss:</strong> HP Banyak | Score 1000 (Setiap kelipatan Level 5)</div>
                </div>
            </div>

            <div class="guide-section">
                <h3>Power-Up</h3>
                <ul>
                    <li>⚡ <strong>Rapid Fire:</strong> Tembakan super cepat</li>
                    <li>🔫 <strong>Double Shot:</strong> Menembakkan 2 peluru sekaligus</li>
                    <li>🛡️ <strong>Shield:</strong> Kebal serangan untuk beberapa detik</li>
                    <li>❤️ <strong>Extra Life:</strong> Menambah 1 nyawa</li>
                </ul>
            </div>

            <div class="text-center margin-top">
                <a href="index.php" class="btn btn-secondary">KEMBALI KE MENU</a>
                <a href="game.php" class="btn btn-primary btn-glow">MAIN SEKARANG</a>
            </div>
        </div>
    </div>
</body>
</html>