<?php
    session_start();
    if (!isset($_SESSION['email'])) {
        header("Location: index.php");
        exit;
    }
?>

<html>
    <head>
        <title>Administration Dashboard</title>
        <link rel="stylesheet" href="css/dashboard-style.css">
    </head>
    <body>
        <div class="dashboard-container">
            <h1>Administration Dashboard</h1>
            <div class="dashboard-buttons">
                <a href="user-management.php" class="dashboard-btn">User Management</a>
                <a href="administrator-management.php" class="dashboard-btn">Administrator Management</a>
                <a href="analytics.php" class="dashboard-btn">Analytics</a>
                <a href="register.php" class="dashboard-btn">Administrator Register</a>
            </div>
        </div>
    </body>
</html>