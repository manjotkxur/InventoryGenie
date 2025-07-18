const pool = require('../db');

const getAllSuppliers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, COALESCE(json_agg(l.name) FILTER (WHERE l.id IS NOT NULL), '[]') AS locations
      FROM suppliers s
      LEFT JOIN supplier_locations sl ON s.id = sl.supplier_id
      LEFT JOIN locations l ON l.id = sl.location_id
      WHERE s.user_id = $1
      GROUP BY s.id
    `, [req.user.id]);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch suppliers', error: err.message });
  }
};

const createSupplier = async (req, res) => {
  const { name, contact_email, phone, location_ids } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'INSERT INTO suppliers (user_id, name, contact_email, phone) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, name, contact_email || null, phone || null]
    );

    const supplier = result.rows[0];

    if (Array.isArray(location_ids)) {
      const inserts = location_ids.map(locId =>
        pool.query(
          'INSERT INTO supplier_locations (supplier_id, location_id) VALUES ($1, $2)',
          [supplier.id, locId]
        )
      );
      await Promise.all(inserts);
    }

    res.status(201).json({ message: 'Supplier created', supplier });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create supplier', error: err.message });
  }
};

module.exports = { getAllSuppliers, createSupplier };
