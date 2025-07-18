const pool = require('../../db');
const getTotalLocations = async (userId) => {
  const result = await pool.query(
    'SELECT COUNT(*) FROM locations WHERE user_id = $1',
    [userId]
  );
  return parseInt(result.rows[0].count, 10);
};

module.exports = getTotalLocations;
