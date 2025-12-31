const express = require('express');
const { getStats, getChartsData, getRecentActivity } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/stats', getStats);
router.get('/charts', getChartsData);
router.get('/recent', getRecentActivity);

module.exports = router;
