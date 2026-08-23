<?php require_once 'config.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= GAME_TITLE ?> - Home</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="stars-bg"></div>
    <div class="container flex-center">
        <div class="card glass text-center">
            <h1 class="glow-text title"><?= GAME_TITLE ?></h1>
            <p class="subtitle"><?= GAME_SUBTITLE ?></p>
            
            <div class="menu-actions">
                <a href="game.php" class="btn btn-primary btn-glow">PLAY NOW</a>
                <a href="how-to-play.php" class="btn btn-secondary">HOW TO PLAY</a>
            </div>

            <div class="footer-info">
                v<?= GAME_VERSION ?> | Created by <?= GAME_AUTHOR ?>
            </div>
        </div>
    </div>
    <script src="js/main.js"></script>
</body>
</html>