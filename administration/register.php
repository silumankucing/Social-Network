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

    // Handle form submission
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $privilege = $_POST['administrator_id'];
        $privilege = $_POST['privilege'];
        $full_name = $_POST['full_name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Check if email already exists
        $checkQuery = "SELECT * FROM administrator_table WHERE email = ?";
        $stmt = $conn->prepare($checkQuery);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $error = "Email already exists. Please use a different email.";
        } else {
            $insertQuery = "INSERT INTO administrator_table (administrator_id, privilege, full_name, email, password) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($insertQuery);
            $stmt->bind_param($administrator_id, $privilege, $full_name, $email, $password);
            if ($stmt->execute()) {
                $success = "Administrator registered successfully!";
            } else {
                $error = "Error registering administrator. Please try again.";
            }
        }

        $stmt->close();
    }

    $conn->close();
?>

<html>
    <head>
        <title>Administrator Register</title>
        <link rel="stylesheet" href="css/register-style.css">
    </head>
    
    <body>
        <div class="register-container">
            <h1>Register New Administrator</h1>
            <?php if (isset($error)): ?>
                <p class="error-message"><?php echo htmlspecialchars($error); ?></p>
            <?php endif; ?>

            <?php if (isset($success)): ?>
                <p class="success-message"><?php echo htmlspecialchars($success); ?></p>
            <?php endif; ?>

            <form method="POST" action="register.php">
                <label for="privilege">Privilege:</label>

                <select name="privilege" id="privilege" required>
                    <option value="Admin">Extraordinary</option>
                    <option value="Moderator">Ordinary</option>
                </select>

                <label for="administrator_id">Administrator ID</label>
                <input type="text" name="administrator_id" id="administrator_id" placeholder="ID" required>

                <label for="full_name">Full Name:</label>
                <input type="text" name="full_name" id="full_name" placeholder="Full Name" required>

                <label for="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="Email Address" required>

                <label for="password">Password:</label>
                <input type="password" name="password" id="password" placeholder="Password" required>

                <button type="submit">Register</button>
            </form>

        </div>
    </body>
</html>