const pool = require('../../db');
const getStockPerProduct = async (userId) => {
  const result = await pool.query(
     `
    SELECT 
  p.id,
  p.name,
  SUM(CASE WHEN sm.movement_type = 'IN' THEN sm.quantity ELSE 0 END) -
  SUM(CASE WHEN sm.movement_type = 'OUT' THEN sm.quantity ELSE 0 END) AS total_stock
FROM stock_movements sm
JOIN products p ON sm.product_id = p.id
WHERE sm.user_id = $1
GROUP BY p.id, p.name
ORDER BY total_stock DESC;

    `,
    [userId]
  );
  return result.rows;
};

module.exports = getStockPerProduct;