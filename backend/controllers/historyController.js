const pool = require('../db');

const getProductHistory = async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM stock_movements WHERE product_id = $1 AND user_id = $2 ORDER BY created_at DESC',
      [productId, req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product history', error: err.message });
  }
};

module.exports = { getProductHistory };