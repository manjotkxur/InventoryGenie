const pool = require('../../db');
const getTotalProducts = async (userId) => {
  const result = await pool.query(
    'SELECT COUNT(*) FROM products WHERE user_id = $1',
    [userId]
  );
  return { totalProducts: parseInt(result.rows[0].count, 10) };
};

module.exports = getTotalProducts;
