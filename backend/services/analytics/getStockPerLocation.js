const pool = require('../../db');
const getStockPerLocation = async (userId) => {
  const result = await pool.query(
    `SELECT 
  l.name AS location,
  SUM(CASE WHEN sm.movement_type = 'IN' THEN sm.quantity ELSE 0 END) -
  SUM(CASE WHEN sm.movement_type = 'OUT' THEN sm.quantity ELSE 0 END) AS total_stock
FROM stock_movements sm
JOIN locations l ON sm.location_id = l.id
WHERE sm.user_id = $1
GROUP BY l.name
ORDER BY total_stock DESC`,[userId]
  );
  return result.rows;
};

module.exports = getStockPerLocation;