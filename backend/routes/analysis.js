const express = require('express');
const {
    analyzeImage,
    saveAnalysis,
    getAnalyses,
    getAnalysis,
    updateAnalysis,
    generateReport
} = require('../controllers/analysisController');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/upload', upload.single('image'), analyzeImage);
router.post('/save', saveAnalysis);
router.get('/', getAnalyses);
router.get('/:id', getAnalysis);
router.put('/:id', updateAnalysis);
router.post('/:id/generate-report', generateReport);

module.exports = router;

