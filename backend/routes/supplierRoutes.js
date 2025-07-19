const express = require('express');
const router = express.Router();
const {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierById,
} = require('../controllers/supplierController');
const authenticate = require('../middleware/authMiddleware');

// GET all suppliers
router.get('/', authenticate, getAllSuppliers);

// POST a new supplier
router.post('/', authenticate, createSupplier);

// PUT update a supplier
router.put('/:id', authenticate, updateSupplier);

// DELETE a supplier
router.delete('/:id', authenticate, deleteSupplier);

router.get('/:id', authenticate, getSupplierById);


module.exports = router;
