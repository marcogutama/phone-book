const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db_host = process.env.DB_HOST || "localhost";
const db_user = process.env.DB_USER || "root";
const db_password = process.env.DB_PASSWORD || "mypass";
const db_name = process.env.DB_Name || 'myDb';


const pool = mysql.createPool({
    host: db_host,
    user: db_user,
    password: db_password,
    database: db_name
});


// Body parser middleware for handling JSON data in requests
app.use(bodyParser.json());



// GET request to retrieve all mobile numbers (implement filtering/pagination if needed)
app.get('/api/mobile-numbers', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM mobile_numbers');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching mobile numbers');
    }
});

// GET request to retrieve a specific mobile number by ID
app.get('/api/mobile-numbers/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const [rows] = await pool.query('SELECT * FROM mobile_numbers WHERE id = ?', [id]);
        if (rows.length === 0) {
            res.status(404).send('Mobile number not found');
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching mobile number');
    }
});

// POST request to create a new mobile number
app.post('/api/mobile-numbers', async (req, res) => {
    const newItem = req.body; // Assuming request body contains { mobileNumber: '...' }
    try {
        const [result] = await pool.query('INSERT INTO mobile_numbers (phone, name) VALUES (?,?)', [newItem.phone, newItem.name]);
        res.json({ id: result.insertId, ...newItem }); // Return created mobile number with ID
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating mobile number');
    }
});


app.put('/api/mobile-numbers/:id', async (req, res) => {
    const id = req.params.id;
    const updateItem = req.body; 
  
    try {
      const result = await pool.query('UPDATE mobile_numbers SET phone = ?, name = ? WHERE id = ?', [
        updateItem.phone,
        updateItem.name,
        id,
      ]);
  
      if (result.affectedRows === 0) {
        res.status(404).send('Mobile number not found');
      } else {
        res.json({ message: 'Mobile number updated successfully' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating mobile number');
    }
  });
  


app.delete('/api/mobile-numbers/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const result = await pool.query('DELETE FROM mobile_numbers WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        res.status(404).send('Mobile number not found');
      } else {
        res.json({ message: 'Mobile number deleted successfully' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting mobile number');
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
