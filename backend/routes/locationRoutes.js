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

// GET all locations
router.get('/', authenticate, getAllLocations);

// POST a new location
router.post('/', authenticate, createLocation);

// PUT update a location by ID
router.put('/:id', authenticate, updateLocation);

// DELETE a location by ID
router.delete('/:id', authenticate, deleteLocation);

router.get('/:id', authenticate, getLocationById);

module.exports = router;
