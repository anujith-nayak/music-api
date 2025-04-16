// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // allows your website to call this API

// Update these details with your actual database info
const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12773414',
  password: 'aHiAB9Krh9',
  database: 'sql12773414'
});

app.get('/songs', (req, res) => {
  db.query('SELECT * FROM SONGS', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/artist', (req, res) => {
  db.query('SELECT * FROM ARTIST', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/album', (req, res) => {
  db.query('SELECT * FROM ALBUM', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/track', (req, res) => {
  db.query('SELECT * FROM TRACK', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/concert', (req, res) => {
  db.query('SELECT * FROM CONCERT', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/track_concert', (req, res) => {
  db.query('SELECT * FROM TRACK_CONCERT', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Music API!");
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.get("/songs", (req, res) => {
  const query = "SELECT * FROM songs"; // change to your actual table name

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching songs:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(results);
    }
  });
});
