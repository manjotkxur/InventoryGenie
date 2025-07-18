const pool = require('../../db');

const getMonthlyMovementStats = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      TO_CHAR(sm.created_at, 'YYYY-MM') AS month,
      sm.movement_type,
      SUM(sm.quantity) AS total
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    WHERE p.user_id = $1
    GROUP BY month, sm.movement_type
    ORDER BY month DESC;
    `,
    [userId]
  );

  const monthlyStats = {};

  result.rows.forEach(row => {
    const { month, movement_type, total } = row;
    if (!monthlyStats[month]) {
      monthlyStats[month] = { month, inbound: 0, outbound: 0 };
    }

    if (movement_type === 'IN') {
      monthlyStats[month].inbound = parseInt(total);
    } else if (movement_type === 'OUT') {
      monthlyStats[month].outbound = parseInt(total);
    }
  });


  return Object.values(monthlyStats);
};

module.exports = getMonthlyMovementStats;
