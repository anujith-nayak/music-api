// server.js
require('dotenv').config(); // For environment variables
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Restrict CORS to your frontend origin
app.use(cors({
  origin: 'https://anujith-nayak.github.io',
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Create a MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
  user: process.env.DB_USER || 'sql12773414',
  password: process.env.DB_PASSWORD || 'aHiAB9Krh9',
  database: process.env.DB_NAME || 'sql12773414',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection on startup
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to database');
  connection.release();
});

// Generic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Music API!');
});

// Songs endpoint
app.get('/songs', (req, res) => {
  db.query('SELECT * FROM SONGS', (err, results) => {
    if (err) {
      console.error('Error fetching songs:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Artist endpoint
app.get('/artist', (req, res) => {
  db.query('SELECT * FROM ARTIST', (err, results) => {
    if (err) {
      console.error('Error fetching artists:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Album endpoint
app.get('/album', (req, res) => {
  db.query('SELECT * FROM ALBUM', (err, results) => {
    if (err) {
      console.error('Error fetching albums:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Track endpoint
app.get('/track', (req, res) => {
  db.query('SELECT * FROM TRACK', (err, results) => {
    if (err) {
      console.error('Error fetching tracks:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Concert endpoint
app.get('/concert', (req, res) => {
  db.query('SELECT * FROM CONCERT', (err, results) => {
    if (err) {
      console.error('Error fetching concerts:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Track_Concert endpoint
app.get('/track_concert', (req, res) => {
  db.query('SELECT * FROM TRACK_CONCERT', (err, results) => {
    if (err) {
      console.error('Error fetching track_concert:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
