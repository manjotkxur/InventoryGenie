const buildInventoryQuery = (userId, locationIds, supplierIds, categoryIds) => {
  let query = `
    SELECT 
      p.name AS product,
      c.name AS category,
      s.name AS supplier,
      l.name AS location,
      p.unit_price,
      p.is_archived,
      SUM(CASE WHEN sm.movement_type = 'IN' THEN sm.quantity ELSE 0 END) -
      SUM(CASE WHEN sm.movement_type = 'OUT' THEN sm.quantity ELSE 0 END) AS stock,
      (p.unit_price * (
        SUM(CASE WHEN sm.movement_type = 'IN' THEN sm.quantity ELSE 0 END) -
        SUM(CASE WHEN sm.movement_type = 'OUT' THEN sm.quantity ELSE 0 END)
      )) AS inventory_value
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    JOIN categories c ON p.category_id = c.id
    JOIN suppliers s ON p.supplier_id = s.id
    JOIN locations l ON sm.location_id = l.id
    WHERE p.user_id = $1
  `;

  const params = [userId];
  let i = 2;

  if (locationIds) {
    query += ` AND l.id = ANY($${i})`;
    params.push(locationIds);
    i++;
  }
  if (supplierIds) {
    query += ` AND s.id = ANY($${i})`;
    params.push(supplierIds);
    i++;
  }
  if (categoryIds) {
    query += ` AND c.id = ANY($${i})`;
    params.push(categoryIds);
    i++;
  }

  query += `
    GROUP BY p.name, c.name, s.name, l.name, p.unit_price, p.is_archived
    ORDER BY product
  `;

  return { query, params };
};

module.exports = buildInventoryQuery;
