const pool = require('../db');

// Create a stock movement
const createStockMovement = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity, movement_type, location_id, note } = req.body;

    if (!product_id || !quantity || !movement_type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!['in', 'out'].includes(movement_type)) {
      return res.status(400).json({ message: 'Invalid movement type. Use "in" or "out".' });
    }

    const productCheck = await pool.query(
      'SELECT * FROM products WHERE id = $1 AND user_id = $2',
      [product_id, userId]
    );
    if (productCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    if (location_id) {
      const locationCheck = await pool.query(
        'SELECT * FROM locations WHERE id = $1 AND user_id = $2',
        [location_id, userId]
      );
      if (locationCheck.rows.length === 0) {
        return res.status(404).json({ message: 'Location not found or unauthorized' });
      }
    }

    const result = await pool.query(
      `INSERT INTO stock_movements (user_id, product_id, quantity, movement_type, location_id, note)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [userId, product_id, quantity, movement_type, location_id || null, note || null]
    );

    res.status(201).json({ message: 'Stock movement recorded', movement: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to record stock movement', error: err.message });
  }
};

// Get all stock movements
const getAllStockMovements = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT sm.*, p.name AS product_name, l.name AS location_name
       FROM stock_movements sm
       JOIN products p ON sm.product_id = p.id
       LEFT JOIN locations l ON sm.location_id = l.id
       WHERE sm.user_id = $1
       ORDER BY sm.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stock movements', error: err.message });
  }
};

// Get a single stock movement
const getStockMovementById = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const result = await pool.query(
      `SELECT * FROM stock_movements WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Stock movement not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stock movement', error: err.message });
  }
};

// Update a stock movement
const updateStockMovement = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const { quantity, movement_type, location_id, note } = req.body;

    const check = await pool.query(
      'SELECT * FROM stock_movements WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    if (check.rows.length === 0) {
      return res.status(404).json({ message: 'Stock movement not found or unauthorized' });
    }

    if (location_id) {
      const locationCheck = await pool.query(
        'SELECT * FROM locations WHERE id = $1 AND user_id = $2',
        [location_id, userId]
      );
      if (locationCheck.rows.length === 0) {
        return res.status(404).json({ message: 'Location not found or unauthorized' });
      }
    }

    const updated = await pool.query(
      `UPDATE stock_movements 
       SET quantity = $1, movement_type = $2, location_id = $3, note = $4
       WHERE id = $5 AND user_id = $6 RETURNING *`,
      [quantity, movement_type, location_id || null, note || null, id, userId]
    );

    res.json({ message: 'Stock movement updated', movement: updated.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update stock movement', error: err.message });
  }
};

// Delete a stock movement
const deleteStockMovement = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    const check = await pool.query(
      'SELECT * FROM stock_movements WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    if (check.rows.length === 0) {
      return res.status(404).json({ message: 'Stock movement not found or unauthorized' });
    }

    await pool.query('DELETE FROM stock_movements WHERE id = $1 AND user_id = $2', [id, userId]);

    res.json({ message: 'Stock movement deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete stock movement', error: err.message });
  }
};

// Get current stock for a product
const getCurrentStock = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const result = await pool.query(
      `SELECT COALESCE(SUM(CASE 
        WHEN movement_type = 'in' THEN quantity 
        WHEN movement_type = 'out' THEN -quantity 
        ELSE 0 END), 0) AS stock
       FROM stock_movements
       WHERE product_id = $1 AND user_id = $2`,
      [productId, userId]
    );

    res.json({ productId, stock: parseInt(result.rows[0].stock) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get stock', error: err.message });
  }
};



module.exports = {
  createStockMovement,
  getAllStockMovements,
  getStockMovementById,
  updateStockMovement,
  deleteStockMovement,
  getCurrentStock,
};
