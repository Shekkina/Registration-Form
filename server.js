const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Shekkina545@",
    database: "form"
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/form', (req, res) => {
    const sql = "INSERT INTO forms (name, email, password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

app.get('/forms', (req, res) => {
    const sql = "SELECT * FROM forms";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
