const pool = require('../../db');
const getStockPerSupplier = async (userId) => {
  const result = await pool.query(
    ` SELECT 
      s.id AS supplier_id,
      s.name AS supplier,
      COUNT(DISTINCT p.id) AS total_products,
      SUM(CASE WHEN sm.movement_type = 'IN' THEN sm.quantity ELSE 0 END) -
      SUM(CASE WHEN sm.movement_type = 'OUT' THEN sm.quantity ELSE 0 END) AS total_stock
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    JOIN suppliers s ON p.supplier_id = s.id
    WHERE sm.user_id = $1
    GROUP BY s.id, s.name
    ORDER BY total_stock DESC;
`,
    [userId]
  );
  return result.rows;
};

module.exports = getStockPerSupplier;