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

    // Query to fetch all administrators
    $query = "SELECT administrator_id, privilege, full_name, email, password FROM administrator_table";
    $result = $conn->query($query);
?>

<html>
    <head>
        <title>Administrator Management</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="admin-management-container">
            <h1>Administrator Management</h1>
            <table border="1" class="admin-table">
                <thead>
                    <tr>
                        <th>Administrator ID</th>
                        <th>Privilege</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                echo "<tr>";
                                echo "<td>" . htmlspecialchars($row['administrator_id']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['privilege']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['full_name']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['email']) . "</td>";
                                echo "<td>" . htmlspecialchars($row['password']) . "</td>";
                                echo "</tr>";
                            }
                        } else {
                            echo "<tr><td colspan='5'>No administrators found</td></tr>";
                        }
                        $conn->close();
                    ?>
                </tbody>
            </table>
        </div>
    </body>
</html>