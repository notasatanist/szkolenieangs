const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); 

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

const db = new sqlite3.Database('./newsletter.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        db.run(`
            CREATE TABLE IF NOT EXISTS subscribers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err.message);
            }
        });
    }
});

app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    console.log("Received subscription request for email:", email); 

    if (!email) {
        console.log("No email provided."); 
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const query = `INSERT INTO subscribers (email) VALUES (?)`;
    db.run(query, [email], function (err) {
        if (err) {
            console.error("Error inserting into the database:", err.message); 

            if (err.message.includes("UNIQUE")) {
                return res.status(400).json({ success: false, message: 'Email already subscribed.' });
            } else {
                return res.status(500).json({ success: false, message: 'Database error.' });
            }
        }

        console.log(`Successfully subscribed: ${email}`); 
        res.json({ success: true, message: `Subscribed successfully with ${email}` });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
const fetch = require('node-fetch'); 

app.get('/api/recipes', async (req, res) => {
    const query = req.query.q;
    const API_ID = 'ID';  
    const API_KEY = 'Key'; 

    if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
    }

    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${API_ID}&app_key=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Error fetching recipes' });
    }
});
