const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');
const { getAllLocations, createLocation } = require('../controllers/locationController');

router.use(authenticateUser);
router.get('/', getAllLocations);
router.post('/', createLocation);

module.exports = router;
