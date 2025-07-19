const express = require('express');
const router = express.Router();
const {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  getLocationById,
} = require('../controllers/locationController');
const authenticate = require('../middleware/authMiddleware');

router.get('/', authenticate, getAllLocations);

router.post('/', authenticate, createLocation);

router.put('/:id', authenticate, updateLocation);

router.delete('/:id', authenticate, deleteLocation);

router.get('/:id', authenticate, getLocationById);

module.exports = router;
