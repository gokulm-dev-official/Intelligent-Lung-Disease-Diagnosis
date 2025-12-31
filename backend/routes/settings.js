const express = require('express');
const { getSettings, updateSettings, triggerTraining } = require('../controllers/settingsController');

const router = express.Router();

router.get('/', getSettings);
router.put('/', updateSettings);
router.post('/train', triggerTraining);

module.exports = router;
