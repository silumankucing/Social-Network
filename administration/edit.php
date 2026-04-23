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

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $user_id = $_POST['user_id'];
        $username = $_POST['username'];
        $full_name = $_POST['full_name'];
        $gender = $_POST['gender'];
        $email = $_POST['email'];
        $bio = $_POST['bio'];

        $query = "UPDATE user_table SET username=?, full_name=?, gender=?, email=?, bio=? WHERE user_id=?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssssi", $username, $full_name, $gender, $email, $bio, $user_id);
        $stmt->execute();

        header("Location: dashboard.php?message=User updated successfully");
        exit;
    } else {
        // Fetch user details for editing
        $user_id = $_GET['id'];
        $query = "SELECT * FROM user_table WHERE user_id=?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
    }
?>

<html>
    <head>
        <title>Edit User</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="edit-container">
            <h1>Edit User</h1>
            <form method="POST" action="edit.php">
                <input type="hidden" name="user_id" value="<?php echo $user['user_id']; ?>">
                <label>Username:</label>
                <input type="text" name="username" value="<?php echo htmlspecialchars($user['username']); ?>" required>
                <label>Full Name:</label>
                <input type="text" name="full_name" value="<?php echo htmlspecialchars($user['full_name']); ?>" required>
                <label>Gender:</label>
                <input type="text" name="gender" value="<?php echo htmlspecialchars($user['gender']); ?>" required>
                <label>Email:</label>
                <input type="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required>
                <label>Bio:</label>
                <textarea name="bio"><?php echo htmlspecialchars($user['bio']); ?></textarea>
                <button type="submit">Update</button>
            </form>
        </div>
    </body>
</html>