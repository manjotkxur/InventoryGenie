const pool = require('../db');

const createProduct = async (req, res) => {
  const {
    name,
    sku,
    unit_price,
    description,
    category_id,
    supplier_id,
    user_id
  } = req.body;

  if (!name || !sku || !user_id) {
    return res.status(400).json({ message: 'Name, SKU, and user_id are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO products 
        (name, sku, unit_price, description, category_id, supplier_id, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, sku, unit_price, description, category_id, supplier_id, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product', error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, c.name AS category_name, s.name AS supplier_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN suppliers s ON p.supplier_id = s.id
       ORDER BY p.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    sku,
    unit_price,
    description,
    category_id,
    supplier_id
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE products
       SET name = $1,
           sku = $2,
           unit_price = $3,
           description = $4,
           category_id = $5,
           supplier_id = $6
       WHERE id = $7
       RETURNING *`,
      [name, sku, unit_price, description, category_id, supplier_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
