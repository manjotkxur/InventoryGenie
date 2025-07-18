const pool = require('../../db');
const getTopStockedProducts = async (userId, limit = 5) => {
  const result = await pool.query(
    `SELECT 
      p.id AS product_id,
      p.name AS product_name,
      SUM(CASE WHEN sm.movement_type = 'IN' THEN sm.quantity ELSE 0 END) -
      SUM(CASE WHEN sm.movement_type = 'OUT' THEN sm.quantity ELSE 0 END) AS stock
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    WHERE sm.user_id = $1
    GROUP BY p.id, p.name
    ORDER BY stock DESC
    LIMIT $2;
`,
    [userId, limit]
  );
  return result.rows;
};

module.exports = getTopStockedProducts;