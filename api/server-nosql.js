const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let userdataCollection;

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db('social_media_platform');
        userdataCollection = db.collection('userdata');
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

connectDB();

app.get('/api/userdata', async (req, res) => {
    try {

        const query = { "nobita": { $exists: true } };
        
        const user = await userdataCollection.findOne(query);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User "nobita" not found.' });
        }
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ message: 'An error occurred while fetching data.' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});