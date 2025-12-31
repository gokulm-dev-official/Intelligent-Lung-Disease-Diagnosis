const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    // Clinic Information
    clinicName: { type: String, default: 'MediScan AI Clinic' },
    clinicLogo: { type: String, default: '' },
    clinicAddress: { type: String, default: '12/4, Medical Circle, Anna Salai, Chennai, Tamil Nadu - 600002' },
    clinicPhone: { type: String, default: '+91 44-2458-9000' },
    clinicEmail: { type: String, default: 'info@mediscan.ai' },
    registrationNumber: { type: String, default: 'TN/CH/MDS-100249' },

    // Report Templates
    reportHeaderTemplate: { type: String, default: '' },
    reportFooterTemplate: { type: String, default: '' },
    defaultRecommendations: { type: Object, default: {} }, // Map diagnosis to text

    // Appointment Settings
    appointmentDuration: { type: Number, default: 30 }, // in minutes
    reminderSettings: {
        type: Object,
        default: {
            enabled: true,
            reminderTime: 24, // hours before appointment
            reminderMethod: 'SMS' // SMS, Email, Both
        }
    },

    // Admin Settings
    adminPassword: { type: String, default: 'admin123' },
    adminEmail: { type: String, default: 'admin@mediscan.ai' },
    allowPatientDeletion: { type: Boolean, default: true },
    allowDataExport: { type: Boolean, default: true },
    requireApprovalForReports: { type: Boolean, default: false },

    // AI Model Settings
    modelVersion: { type: String, default: 'v4.2.1-PRO' },
    modelPath: { type: String, default: './ai_model/lung_disease_model.h5' },
    confidenceThreshold: { type: Number, default: 0.7, min: 0, max: 1 },
    autoRetrainEnabled: { type: Boolean, default: false },
    lastTrainingDate: { type: Date },

    // System Settings
    maintenanceMode: { type: Boolean, default: false },
    maxUploadSize: { type: Number, default: 10 }, // MB
    allowedImageFormats: { type: [String], default: ['jpg', 'jpeg', 'png', 'dcm'] },

    // Email Configuration
    emailConfig: {
        type: Object,
        default: {
            enabled: false,
            smtpHost: '',
            smtpPort: 587,
            smtpUser: '',
            smtpPassword: '',
            fromEmail: 'noreply@mediscan.ai'
        }
    },

    // Backup Settings
    backupConfig: {
        type: Object,
        default: {
            enabled: false,
            frequency: 'daily', // daily, weekly, monthly
            retentionDays: 30,
            lastBackup: null
        }
    },

    // Audit Log Settings
    auditLog: {
        type: Object,
        default: {
            enabled: true,
            logPatientAccess: true,
            logReportGeneration: true,
            logAdminActions: true
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
