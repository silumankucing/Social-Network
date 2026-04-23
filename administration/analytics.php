<?php

    session_start();
    if (!isset($_SESSION['email'])) {
        header("Location: index.php");
        exit;
    }

    // Database connection
    $conn = new mysqli('localhost', 'root', '1182', 'social_media_platform');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Query to get total user count
    $totalUsersQuery = "SELECT COUNT(*) AS total_users FROM user_table";
    $totalUsersResult = $conn->query($totalUsersQuery);
    $totalUsers = $totalUsersResult->fetch_assoc()['total_users'];

    // Query to get user count by gender
    $genderQuery = "SELECT gender, COUNT(*) AS count FROM user_table GROUP BY gender";
    $genderResult = $conn->query($genderQuery);

    $genderCounts = [];
    while ($row = $genderResult->fetch_assoc()) {
        $genderCounts[$row['gender']] = $row['count'];
    }

    $conn->close();
?>

<html>
    <head>
        <title>Analytics</title>
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
        <div class="dashboard-container">
            <h1>Analytics</h1>
            <div class="analytics-data">
                <h2>Total Users: <?php echo $totalUsers; ?></h2>
                <h3>Users by Gender:</h3>
                <ul>
                    <?php foreach ($genderCounts as $gender => $count): ?>
                        <li><?php echo htmlspecialchars($gender) . ": " . htmlspecialchars($count); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
            <div class="back-button">
                <a href="dashboard.php" class="button">Back to Dashboard</a>
            </div>
        </div>
    </body>
</html>