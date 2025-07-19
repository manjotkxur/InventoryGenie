const pool = require('../db');

// GET /api/locations
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

// POST /api/locations
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

// PUT /api/locations/:id
const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Location name is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE locations SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [name, id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Location not found or unauthorized' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update location', error: err.message });
  }
};

// DELETE /api/locations/:id
const deleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM locations WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Location not found or unauthorized' });
    }

    res.json({ message: 'Location deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete location', error: err.message });
  }
};

const getLocationById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM locations WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch location', error: err.message });
  }
};

module.exports = {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  getLocationById,
};
