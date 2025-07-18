const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.use(authenticateUser);
router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;