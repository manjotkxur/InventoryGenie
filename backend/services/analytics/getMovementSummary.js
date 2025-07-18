const pool = require('../../db');
const getMovementSummary = async (userId) => {
  const result = await pool.query(
    `SELECT 
  p.id AS product_id,
  p.name AS product_name,
  sm.movement_type,
  COUNT(*) AS count,
  SUM(sm.quantity) AS total_quantity
FROM stock_movements sm
JOIN products p ON sm.product_id = p.id
WHERE p.user_id = $1
GROUP BY p.id, p.name, sm.movement_type
ORDER BY p.name, sm.movement_type;`,
    [userId]
  );
  return result.rows;
};

module.exports = getMovementSummary;