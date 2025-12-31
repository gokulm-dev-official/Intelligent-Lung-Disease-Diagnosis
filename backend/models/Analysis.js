const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    analysisId: { type: String, unique: true, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    imagePath: { type: String, required: true },
    imageUrl: { type: String, required: true }, // URL for frontend access
    diagnosis: {
        type: String,
        enum: ['COVID', 'COVID-19', 'Normal', 'Pneumonia', 'Tuberculosis'],
        required: true
    },
    confidenceScores: {
        covid: { type: Number, min: 0, max: 1, default: 0 },
        normal: { type: Number, min: 0, max: 1, default: 0 },
        pneumonia: { type: Number, min: 0, max: 1, default: 0 },
        tuberculosis: { type: Number, min: 0, max: 1, default: 0 }
    },
    primaryConfidence: { type: Number, required: true, min: 0, max: 1 },
    doctorNotes: { type: String, default: '' },
    recommendations: { type: String, default: '' },
    analysisDate: { type: Date, default: Date.now },
    reportGenerated: { type: Boolean, default: false },
    reportPath: { type: String, default: '' },
    // Admin fields
    reviewedBy: { type: String, default: '' },
    reviewedAt: { type: Date },
    approvalStatus: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Needs Review'],
        default: 'Pending'
    },
    createdBy: { type: String, default: 'AI System' },
    // Report metadata
    reportMetadata: {
        hospitalName: { type: String, default: 'METRO PULMONOLOGY CENTER' },
        hospitalAddress: { type: String, default: '12/4, Medical Circle, Anna Salai, Chennai, Tamil Nadu - 600002' },
        hospitalPhone: { type: String, default: '+91 44-2458-9000' },
        registrationNumber: { type: String, default: 'TN/CH/MDS-100249' },
        reportingDoctor: { type: String, default: 'Dr. AI Scan' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Analysis', analysisSchema);
