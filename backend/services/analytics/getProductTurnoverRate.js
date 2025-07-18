const pool = require('../../db');
const getProductTurnoverRate = async (userId) => {
  const result = await pool.query(
    `SELECT 
  p.id,
  p.name,
  COUNT(*) AS movement_count
FROM stock_movements sm
JOIN products p ON sm.product_id = p.id
WHERE sm.user_id = $1
GROUP BY p.id, p.name
ORDER BY movement_count DESC;
`,
    [userId]
  );
  return result.rows;
};

module.exports = getProductTurnoverRate;
