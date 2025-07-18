const pool = require('../../db');

const getTotalInventoryValue = async (userId) => {
  const result = await pool.query(
    `
    SELECT 
      SUM(p.unit_price * net_stock.stock) AS inventory_value
    FROM (
      SELECT 
        product_id,
        SUM(CASE WHEN movement_type = 'IN' THEN quantity ELSE 0 END) -
        SUM(CASE WHEN movement_type = 'OUT' THEN quantity ELSE 0 END) AS stock
      FROM stock_movements
      WHERE user_id = $1
      GROUP BY product_id
    ) AS net_stock
    JOIN products p ON net_stock.product_id = p.id;
    `,
    [userId]
  );

  return parseFloat(result.rows[0].inventory_value || 0);
  console.log('Raw inventory value:', inventoryValueResult.rows[0]);

};

module.exports = getTotalInventoryValue;
