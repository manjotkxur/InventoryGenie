const express = require('express');
const router = express.Router();

const { getReport, downloadReport } = require('../controllers/reportController');

const authenticate = require('../middleware/authMiddleware');

router.get('/', authenticate, getReport);

router.get('/download', authenticate, downloadReport);

module.exports = router;
