const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, '../Project-new-main')));

// Body parser
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',         // your postgres username
  host: 'localhost',
  database: 'car_showroom', // database name
  password: 'yourpassword', // your postgres password
  port: 5432,
});

// -------------------- ROUTES -------------------- //

// Admin login
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@gmail.com' && password === 'admin123') {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

// Get all cars
app.get('/admin/get-cars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY car_id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Add new car
app.post('/admin/add-car', async (req, res) => {
  const { name, price, image } = req.body;
  try {
    await pool.query(
      'INSERT INTO cars (name, price, image) VALUES ($1, $2, $3)',
      [name, price, image]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Delete car
app.delete('/admin/delete-car/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM cars WHERE car_id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Edit car
app.put('/admin/edit-car/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  try {
    await pool.query(
      'UPDATE cars SET name=$1, price=$2, image=$3 WHERE car_id=$4',
      [name, price, image, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Start server
app.listen(3000, () => console.log('Backend running successfully 🚀'));
