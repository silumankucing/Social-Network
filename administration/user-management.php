<?php
    session_start();

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['logout'])) {
        session_destroy();
        header("Location: login.php");
        exit;
    }

    if (!isset($_SESSION['email'])) {
        header("Location: index.php");
        exit;
    }

    $conn = new mysqli('localhost', 'root', '1182', 'social_media_platform');
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $query = "SELECT user_id, username, full_name, gender, email, password, bio FROM user_table";
    $result = $conn->query($query);
?>

<html>
    <head>
        <title>Administrator Dashboard</title>
        <link rel="stylesheet" href="css/um-style.css">
    </head>

    <body>
        <div class="dashboard-container">
            <h1>Welcome, <?php echo htmlspecialchars($_SESSION['email']); ?>!</h1>
            
            <h2>User Table</h2>
            <table border="1" class="user-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Bio</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                echo "<tr>";
                                echo "<td>" . htmlspecialchars($row['user_id']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['username']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['full_name']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['gender']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['email']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['password']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['bio']) . "</td>";
                                echo "<td>";
                                echo "<a href='edit.php?id=" . $row['user_id'] . "' class='edit-btn'>Edit</a> ";
                                echo "<a href='delete.php?id=" . $row['user_id'] . "' class='delete-btn' onclick='return confirm(\"Are you sure you want to delete this user?\");'>Remove</a>";
                                echo "</td>";
                                echo "</tr>";
                            }
                        } else {
                            echo "<tr><td colspan='8'>No users found</td></tr>";
                        }
                        $conn->close();
                    ?>
                </tbody>
            </table>
            <!-- Move menu to bottom -->
            <div class="dashboard-menu" style="margin-top: 30px; text-align: center;">
                <a href="dashboard.php" class="back-btn">Back to Dashboard</a>
                <form method="POST" style="display: inline;">
                    <button type="submit" name="logout" class="logout-btn">Logout</button>
                </form>
            </div>
        </div>

    </body>
</html>