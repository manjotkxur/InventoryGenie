const pool = require('../../db');
const getStockPerCategory = async (userId) => {
  const result = await pool.query(
    `SELECT 
  c.name AS category,
  SUM(CASE WHEN sm.movement_type = 'IN' THEN sm.quantity ELSE 0 END) -
  SUM(CASE WHEN sm.movement_type = 'OUT' THEN sm.quantity ELSE 0 END) AS total_stock
FROM stock_movements sm
JOIN products p ON sm.product_id = p.id
JOIN categories c ON p.category_id = c.id
WHERE p.user_id = $1
GROUP BY c.name
ORDER BY total_stock DESC;`,
    [userId]
  );
  return result.rows;
};

module.exports = getStockPerCategory;