const Analysis = require('../models/Analysis');
const Patient = require('../models/Patient');
const { predictImage } = require('../services/modelService');
const path = require('path');
const fs = require('fs');

// @desc    Upload and analyze image
// @route   POST /api/analysis/upload
// @access  Public
exports.analyzeImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        const imagePath = req.file.path;
        const filename = req.file.filename;
        console.log(`Image received. Path: ${imagePath}, Filename: ${filename}`);

        // Run prediction
        console.log("Starting prediction...");
        const prediction = await predictImage(imagePath);
        console.log("Prediction completed:", prediction);

        // We don't save to DB yet, user might want to confirm or discard. 
        // Or we can save as temporary.
        // Requirement says "Save results button", implying it's not automatic persistence of the *record* 
        // maybe, but usually we save the analysis. 
        // Let's return the prediction and the file info so the frontend can display it. 
        // Actual saving happens when linking to a patient usually, or we can save it now as unlinked?
        // The Requirement 2 says "Image Analysis Module ... Save results button". 
        // However, Requirement 4 says "All analysis history...".
        // Let's return the prediction data.

        res.status(200).json({
            success: true,
            data: {
                imageUrl: `/uploads/${req.file.filename}`,
                imagePath: imagePath,
                ...prediction
            }
        });

    } catch (error) {
        // Remove uploaded file if error
        if (req.file && req.file.path) {
            try {
                if (fs.existsSync(req.file.path)) {
                    fs.unlinkSync(req.file.path);
                }
            } catch (unlinkError) {
                console.error("Failed to delete file:", unlinkError);
            }
        }
        res.status(500).json({
            success: false,
            message: `Backend Error: ${error.message}`,
            details: error.stack
        });
    }
};

exports.saveAnalysis = async (req, res) => {
    try {
        let {
            patientId,
            imagePath,
            imageUrl,
            diagnosis,
            confidenceScores,
            primaryConfidence,
            doctorNotes,
            recommendations,
            createdBy,
            reviewedBy,
            approvalStatus,
            reportMetadata
        } = req.body;

        // Normalization for COVID diagnosis
        if (diagnosis === 'COVID') diagnosis = 'COVID-19';

        // Validate required fields
        if (!patientId || !imagePath || !imageUrl || !diagnosis || !primaryConfidence) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: patientId, imagePath, imageUrl, diagnosis, primaryConfidence'
            });
        }

        // Verify patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        // Validate confidence scores
        if (confidenceScores) {
            const scores = Object.values(confidenceScores);
            if (scores.some(score => score < 0 || score > 1)) {
                return res.status(400).json({
                    success: false,
                    message: 'Confidence scores must be between 0 and 1'
                });
            }
        }

        // Validate primary confidence
        if (primaryConfidence < 0 || primaryConfidence > 1) {
            return res.status(400).json({
                success: false,
                message: 'Primary confidence must be between 0 and 1'
            });
        }

        // Generate Analysis ID
        const count = await Analysis.countDocuments();
        const analysisId = `ANA-${Date.now()}-${count + 1}`;

        const analysis = await Analysis.create({
            analysisId,
            patientId,
            imagePath,
            imageUrl,
            diagnosis,
            confidenceScores: confidenceScores || {
                covid: 0,
                normal: 0,
                pneumonia: 0,
                tuberculosis: 0
            },
            primaryConfidence,
            doctorNotes: doctorNotes || '',
            recommendations: recommendations || '',
            createdBy: createdBy || 'AI System',
            reviewedBy: reviewedBy || '',
            approvalStatus: approvalStatus || 'Pending',
            reportMetadata: reportMetadata || {}
        });

        // Update patient stats
        patient.totalScans += 1;
        patient.lastVisitDate = Date.now();
        await patient.save();

        res.status(201).json({
            success: true,
            data: analysis
        });
    } catch (error) {
        console.error('Save analysis error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get analyses
// @route   GET /api/analysis
// @access  Public
exports.getAnalyses = async (req, res) => {
    try {
        const { patientId } = req.query;
        let query = {};
        if (patientId) query.patientId = patientId;

        const analyses = await Analysis.find(query).populate('patientId', 'fullName patientId').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: analyses.length,
            data: analyses
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get single analysis
// @route   GET /api/analysis/:id
// @access  Public
exports.getAnalysis = async (req, res) => {
    try {
        const analysis = await Analysis.findById(req.params.id).populate('patientId');
        if (!analysis) {
            return res.status(404).json({ success: false, message: 'Analysis not found' });
        }
        res.status(200).json({ success: true, data: analysis });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update analysis (Admin review/approval)
// @route   PUT /api/analysis/:id
// @access  Admin
exports.updateAnalysis = async (req, res) => {
    try {
        const { reviewedBy, approvalStatus, doctorNotes, recommendations, diagnosis } = req.body;

        const updateData = {
            ...req.body
        };

        // Normalization for COVID diagnosis
        if (updateData.diagnosis === 'COVID') updateData.diagnosis = 'COVID-19';

        // If reviewed, add review timestamp
        if (reviewedBy) {
            updateData.reviewedBy = reviewedBy;
            updateData.reviewedAt = new Date();
        }

        const analysis = await Analysis.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate('patientId');

        if (!analysis) {
            return res.status(404).json({ success: false, message: 'Analysis not found' });
        }

        res.status(200).json({ success: true, data: analysis });
    } catch (error) {
        console.error('Update analysis error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Generate report for analysis
// @route   POST /api/analysis/:id/generate-report
// @access  Public
exports.generateReport = async (req, res) => {
    try {
        const analysis = await Analysis.findById(req.params.id).populate('patientId');

        if (!analysis) {
            return res.status(404).json({ success: false, message: 'Analysis not found' });
        }

        // Mark report as generated
        analysis.reportGenerated = true;
        analysis.reportPath = `/reports/${analysis.analysisId}.pdf`;
        await analysis.save();

        res.status(200).json({
            success: true,
            message: 'Report generated successfully',
            data: analysis
        });
    } catch (error) {
        console.error('Generate report error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

