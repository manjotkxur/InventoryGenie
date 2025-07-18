const pool = require('../../db');
const getArchivedProducts = async (userId) => {
  const result = await pool.query(
    `
    SELECT id, name, sku, is_archived, created_at
    FROM products
    WHERE user_id = $1 AND is_archived = true
    `,[userId]
  );
  return result.rows;
};

module.exports = getArchivedProducts;
