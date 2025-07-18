const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const { getAllSuppliers, createSupplier } = require('../controllers/supplierController');

router.use(authenticateUser);
router.get('/', getAllSuppliers);
router.post('/', createSupplier);

module.exports = router;
