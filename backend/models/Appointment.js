const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentId: { type: String, unique: true, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true },
    appointmentType: {
        type: String,
        enum: ['Follow-up', 'New Scan', 'Consultation', 'Emergency'],
        required: true
    },
    doctorName: { type: String, default: 'Dr. AI Scan' },
    department: { type: String, default: 'Pulmonology' },
    status: {
        type: String,
        enum: ['Scheduled', 'Completed', 'Cancelled', 'Missed', 'Rescheduled'],
        default: 'Scheduled'
    },
    notes: { type: String, default: '' },
    reminderSent: { type: Boolean, default: false },
    completionNotes: { type: String, default: '' },
    relatedAnalysisId: { type: mongoose.Schema.Types.ObjectId, ref: 'Analysis' },
    // Admin fields
    createdBy: { type: String, default: 'System' },
    updatedBy: { type: String, default: 'System' },
    cancelReason: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
