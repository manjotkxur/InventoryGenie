const pool = require('../db');

const getAllLocations = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM locations WHERE user_id = $1 ORDER BY id',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch locations', error: err.message });
  }
};

const createLocation = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Location name is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO locations (user_id, name) VALUES ($1, $2) RETURNING *',
      [req.user.id, name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create location', error: err.message });
  }
};

module.exports = { getAllLocations, createLocation };
