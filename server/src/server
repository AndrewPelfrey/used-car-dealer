import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS (cross-origin resource sharing)
app.use(cors());

// PostgreSQL database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Simple test endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Your car search endpoint here...
app.get('/cars', async (req, res) => {
  try {
    const { make, model, year } = req.query;

    let query = "SELECT * FROM cars WHERE 1=1";
    const values: any[] = [];

    if (make) {
      values.push(make);
      query += ` AND make ILIKE $${values.length}`;
    }
    if (model) {
      values.push(model);
      query += ` AND model ILIKE $${values.length}`;
    }
    if (year) {
      values.push(year);
      query += ` AND year = $${values.length}`;
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
