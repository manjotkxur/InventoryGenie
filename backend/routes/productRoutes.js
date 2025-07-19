const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require('../controllers/productController');

// Routes with inline auth middleware
router.get('/', authenticate, getAllProducts);
router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);
router.get('/:id', authenticate, getProductById);

module.exports = router;
