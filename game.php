<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= GAME_TITLE ?> - Play</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/game.css">
</head>
<body>
    <div class="game-wrapper">
        <!-- HUD Layer -->
        <div id="hud" class="hud-container">
            <div class="hud-item">SCORE: <span id="score-val">0</span></div>
            <div class="hud-item">HIGH: <span id="highscore-val">0</span></div>
            <div class="hud-item">LIVES: <span id="lives-val">❤️❤️❤️</span></div>
            <div class="hud-item">LEVEL: <span id="level-val">1</span></div>
            <button id="btn-sound" class="btn-icon">🔊</button>
            <button id="btn-pause" class="btn-icon">⏸️</button>
        </div>

        <!-- Boss Health Bar -->
        <div id="boss-hp-container" class="boss-hp-wrapper hidden">
            <div class="boss-title">⚠️ WARNING: BOSS APPROACHING ⚠️</div>
            <div class="boss-hp-bar">
                <div id="boss-hp-fill" class="boss-hp-fill"></div>
            </div>
        </div>

        <!-- Canvas Game -->
        <canvas id="gameCanvas" width="<?= CANVAS_WIDTH ?>" height="<?= CANVAS_HEIGHT ?>"></canvas>

        <!-- Overlay Pause -->
        <div id="overlay-pause" class="modal-overlay hidden">
            <div class="modal-card glass">
                <h2 class="glow-text">GAME PAUSED</h2>
                <button id="btn-resume" class="btn btn-primary">RESUME</button>
                <button id="btn-restart" class="btn btn-secondary">RESTART</button>
                <a href="index.php" class="btn btn-danger">MAIN MENU</a>
            </div>
        </div>

        <!-- Overlay Game Over -->
        <div id="overlay-gameover" class="modal-overlay hidden">
            <div class="modal-card glass text-center">
                <h2 class="glow-text text-danger">GAME OVER</h2>
                <p>Score Akhir Anda: <span id="final-score">0</span></p>
                <p>High Score: <span id="final-highscore">0</span></p>
                <button id="btn-playagain" class="btn btn-primary btn-glow">MAIN LAGI</button>
                <a href="index.php" class="btn btn-secondary">MENU UTAMA</a>
            </div>
        </div>

        <!-- Mobile Controls -->
        <div class="mobile-controls">
            <div class="d-pad">
                <button id="btn-left" class="btn-touch">◀</button>
                <button id="btn-right" class="btn-touch">▶</button>
            </div>
            <button id="btn-shoot" class="btn-touch btn-shoot">🔫</button>
        </div>
    </div>

<!-- Panggil variabel PHP ke JS -->
    <script>
        const DEFAULT_LIVES = <?= DEFAULT_LIVES ?>;
    </script>

    <!-- Cukup load game.js saja -->
    <script src="js/game.js"></script>
</body>
</html>