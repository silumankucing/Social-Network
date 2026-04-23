<?php
    session_start();
    if (isset($_SESSION['email'])) {
        header("Location: dashboard.php");
        exit;
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        try {

            $conn = new mysqli('localhost', 'root', '1182', 'social_media_platform');
            
            if ($conn->connect_error) {
                throw new Exception("Connection failed: " . $conn->connect_error);
            }

            $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
            $password = trim($_POST['password']);

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                header("Location: login.php?error=Invalid email format");
                exit;
            }

            $stmt = $conn->prepare("SELECT email, password FROM administrator_table WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows === 1) {
                $stmt->bind_result($db_email, $db_password);
                $stmt->fetch();

                if ($password === $db_password) {

                    $_SESSION['email'] = $db_email;
                    header("Location: dashboard.php");
                    exit;
                } else {

                    header("Location: login.php?error=Invalid email or password");
                    exit;
                }
            } else {

                header("Location: login.php?error=Invalid email or password");
                exit;
            }

            // Close the statement and connection
            $stmt->close();
            $conn->close();
            
        } catch (Exception $e) {
            error_log($e->getMessage());
            header("Location: login.php?error=Database error. Please try again later.");
            exit;
        }
    }
?>

<html>
    <head>
        <title>Administrator Login</title>
        <link rel="stylesheet" href="css/login-style.css">
    </head>

    <body>
        <div class="login-container">
            <h1>Administrator Login</h1>
            
            <?php if(isset($_GET['error'])): ?>
                <div class="error-message"><?php echo htmlspecialchars($_GET['error']); ?></div>
            <?php endif; ?>
            
            <form method="POST" action="login.php">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                
                <button type="submit" class="login-btn">Login</button>
            </form>
        </div>
    </body>
</html>