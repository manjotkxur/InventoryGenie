const pool = require('../../db');

const getCategoryDistribution = async (userId) => {
  const result = await pool.query(`
    SELECT c.name AS category, 
           SUM(sm.quantity * p.unit_price) AS revenue
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    JOIN categories c ON p.category_id = c.id
    WHERE sm.user_id = $1 AND sm.movement_type = 'OUT'
    GROUP BY c.name
    ORDER BY revenue DESC;
  `, [userId]);
  return result.rows;
};

const getTopSellingProducts = async (userId) => {
  const result = await pool.query(`
    SELECT p.name, 
           SUM(sm.quantity) AS total_sales,
           p.unit_price
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    WHERE sm.user_id = $1 AND sm.movement_type = 'OUT'
    GROUP BY p.name, p.unit_price
    ORDER BY total_sales DESC
    LIMIT 7;
  `, [userId]);

  return result.rows.map(row => ({
    ...row,
    revenue: row.total_sales * row.unit_price
  }));
};

const getMonthlySalesGrowth = async (userId) => {
  const result = await pool.query(`
    SELECT TO_CHAR(sm.created_at, 'Mon YYYY') AS month,
           SUM(sm.quantity) AS total_units
    FROM stock_movements sm
    WHERE sm.user_id = $1 AND sm.movement_type = 'OUT'
    GROUP BY month
    ORDER BY MIN(sm.created_at);
  `, [userId]);

  return result.rows;
};

module.exports = {
  getCategoryDistribution,
  getTopSellingProducts,
  getMonthlySalesGrowth
};
