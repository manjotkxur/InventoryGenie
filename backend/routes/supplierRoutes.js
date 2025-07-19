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


router.get('/', authenticate, getAllSuppliers);

router.post('/', authenticate, createSupplier);

router.put('/:id', authenticate, updateSupplier);

router.delete('/:id', authenticate, deleteSupplier);

router.get('/:id', authenticate, getSupplierById);


module.exports = router;
