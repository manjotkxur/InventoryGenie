const pool = require('../../db');

const getDashboardSummary = async (userId) => {
  try {
    const [
      products,
      suppliers,
      categories,
      locations,
      inventoryValueResult,
      topSelling
    ] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM products WHERE user_id = $1', [userId]),
      pool.query('SELECT COUNT(*) FROM suppliers WHERE user_id = $1', [userId]),
      pool.query('SELECT COUNT(*) FROM categories WHERE user_id = $1', [userId]),
      pool.query('SELECT COUNT(*) FROM locations WHERE user_id = $1', [userId]),
      pool.query(`
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
      `, [userId]),
      pool.query(`
        SELECT p.name, SUM(sm.quantity) AS total_sales
        FROM stock_movements sm
        JOIN products p ON sm.product_id = p.id
        WHERE sm.user_id = $1 AND sm.movement_type = 'OUT'
        GROUP BY p.name
        ORDER BY total_sales DESC
        LIMIT 5
      `, [userId])
    ]);

    return {
      totalProducts: parseInt(products.rows[0].count || 0, 10),
      totalSuppliers: parseInt(suppliers.rows[0].count || 0, 10),
      totalCategories: parseInt(categories.rows[0].count || 0, 10),
      totalLocations: parseInt(locations.rows[0].count || 0, 10),
      totalInventoryValue: parseFloat(inventoryValueResult.rows[0].inventory_value || 0),
      topSellingProducts: topSelling.rows.map(row => ({
        name: row.name,
        total_sales: parseInt(row.total_sales, 10)
      }))
    };
  } catch (error) {
    console.error('Error in getSummary:', error.message);
    throw new Error('Failed to fetch analytics summary');
  }
};

module.exports = getDashboardSummary;
