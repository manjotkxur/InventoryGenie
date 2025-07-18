const pool = require('../../db');
const getOutOfStockProducts = async (userId) => {
  const result = await pool.query(
     `
    SELECT p.id AS product_id, p.name AS product_name
    FROM products p
    LEFT JOIN (
      SELECT product_id, 
             SUM(CASE WHEN movement_type = 'IN' THEN quantity ELSE 0 END) -
             SUM(CASE WHEN movement_type = 'OUT' THEN quantity ELSE 0 END) AS current_stock
      FROM stock_movements
      WHERE user_id = $1
      GROUP BY product_id
    ) sm ON p.id = sm.product_id
    WHERE p.user_id = $1 AND COALESCE(sm.current_stock, 0) = 0
    `,
    [userId]
  );
  return result.rows;
};

module.exports = getOutOfStockProducts;