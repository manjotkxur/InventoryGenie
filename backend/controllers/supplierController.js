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

const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, contact_email, phone, location_ids } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `UPDATE suppliers 
       SET name = $1, contact_email = $2, phone = $3 
       WHERE id = $4 AND user_id = $5
       RETURNING *`,
      [name, contact_email || null, phone || null, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Supplier not found or unauthorized' });
    }

    const supplier = result.rows[0];

    await pool.query('DELETE FROM supplier_locations WHERE supplier_id = $1', [id]);

    if (Array.isArray(location_ids)) {
      const inserts = location_ids.map(locId =>
        pool.query(
          'INSERT INTO supplier_locations (supplier_id, location_id) VALUES ($1, $2)',
          [id, locId]
        )
      );
      await Promise.all(inserts);
    }

    res.json({ message: 'Supplier updated', supplier });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update supplier', error: err.message });
  }
};

const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await pool.query('DELETE FROM supplier_locations WHERE supplier_id = $1', [id]);

    const result = await pool.query(
      'DELETE FROM suppliers WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Supplier not found or unauthorized' });
    }

    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete supplier', error: err.message });
  }
};

const getSupplierById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM suppliers WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch supplier', error: err.message });
  }
};

module.exports = {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierById,
};
