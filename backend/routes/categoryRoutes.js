const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require('../controllers/categoryController');
const authenticate = require('../middleware/authMiddleware');

router.get('/', authenticate, getAllCategories);
router.post('/', authenticate, createCategory);
router.put('/:id', authenticate, updateCategory);
router.delete('/:id', authenticate, deleteCategory);
router.get('/:id', authenticate, getCategoryById);

module.exports = router;
