const pool = require('../db');

const createStockMovement = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity, movement_type, location_id } = req.body;

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
      `INSERT INTO stock_movements (user_id, product_id, quantity, movement_type, location_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, product_id, quantity, movement_type, location_id || null]
    );

    res.status(201).json({ message: 'Stock movement recorded', movement: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to record stock movement', error: err.message });
  }
};

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
  getCurrentStock,
};
