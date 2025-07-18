const pool = require('../../db');
const getRecentMovements = async (userId, limit = 10) => {
  const result = await pool.query(
    `SELECT sm.*, p.name AS product_name
     FROM stock_movements sm
     JOIN products p ON sm.product_id = p.id
     WHERE sm.user_id = $1
     ORDER BY sm.created_at DESC
     LIMIT $2`,
    [userId, limit]
  );
  return result.rows;
};

module.exports = getRecentMovements;
