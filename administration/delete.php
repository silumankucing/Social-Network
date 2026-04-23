<?php
    session_start();
    if (!isset($_SESSION['email'])) {
        header("Location: index.php");
        exit;
    }

    $conn = new mysqli('localhost', 'root', '1182', 'social_media_platform');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if (isset($_GET['id'])) {
        $user_id = $_GET['id'];
        $query = "DELETE FROM user_table WHERE user_id=?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();

        header("Location: dashboard.php?message=User deleted successfully");
        exit;
    } else {
        header("Location: dashboard.php?error=Invalid user ID");
        exit;
    }
?>