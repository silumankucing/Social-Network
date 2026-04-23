const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1182',
    database: 'social_media_platform'
});

// REGISTER

app.post('/api/register', async (req, res) => {
    const { username, full_name, gender, email, password } = req.body;
    if (!username || !full_name || !gender || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Store password as plain text (hashing removed by request)
    const sql = `INSERT INTO user_table (username, full_name, gender, email, password) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [username, full_name, gender, email, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Username or email already exists.' });
            }
            return res.status(500).json({ message: 'Database error.', error: err });
        }
        res.status(201).json({ message: 'User registered successfully.' });
    });
});

// LOGIN

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    const sql = `SELECT * FROM user_table WHERE username = ?`;
    db.query(sql, [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error.', error: err });
        }
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }

        const user = results[0];
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }

        res.status(200).json({ success: true, message: 'Login successful.', username: user.username });
    });
});

// GET USER BY USERNAME (TO SETTING PAGE)

app.get('/api/user/:username', (req, res) => {
    const { username } = req.params;
    const sql = `SELECT user_id, username, full_name, gender, email FROM user_table WHERE username = ?`;
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(results[0]);
    });
});

// UPDATE USER (for SETTING PAGE)

app.put('/api/user/:username', (req, res) => {
    const { username } = req.params;
    const { full_name, gender, email, password } = req.body;

    let sql = `UPDATE user_table SET full_name = ?, gender = ?, email = ?`;
    const params = [full_name, gender, email];

    if (password) {
        sql += `, password = ? WHERE username = ?`;
        params.push(password, username);
        db.query(sql, params, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error.', error: err });
            }
            res.status(200).json({ message: 'User updated successfully.' });
        });
    } else {
        sql += ` WHERE username = ?`;
        params.push(username);
        db.query(sql, params, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error.', error: err });
            }
            res.status(200).json({ message: 'User updated successfully.' });
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running at http://0.0.0.0:${PORT}`);
});