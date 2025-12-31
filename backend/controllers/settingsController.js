const Settings = require('../models/Settings');
const { trainModel } = require('../services/modelService');

exports.getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await Settings.create({});
        }
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const {
            clinicName,
            clinicAddress,
            clinicPhone,
            clinicEmail,
            registrationNumber,
            adminPassword,
            adminEmail,
            modelVersion,
            confidenceThreshold,
            appointmentDuration,
            reminderSettings,
            emailConfig,
            backupConfig,
            auditLog,
            allowPatientDeletion,
            allowDataExport,
            requireApprovalForReports
        } = req.body;

        let settings = await Settings.findOne();

        const updateData = {};

        // Only update fields that are provided
        if (clinicName !== undefined) updateData.clinicName = clinicName;
        if (clinicAddress !== undefined) updateData.clinicAddress = clinicAddress;
        if (clinicPhone !== undefined) updateData.clinicPhone = clinicPhone;
        if (clinicEmail !== undefined) updateData.clinicEmail = clinicEmail;
        if (registrationNumber !== undefined) updateData.registrationNumber = registrationNumber;
        if (adminPassword !== undefined) updateData.adminPassword = adminPassword;
        if (adminEmail !== undefined) updateData.adminEmail = adminEmail;
        if (modelVersion !== undefined) updateData.modelVersion = modelVersion;
        if (confidenceThreshold !== undefined) {
            if (confidenceThreshold < 0 || confidenceThreshold > 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Confidence threshold must be between 0 and 1'
                });
            }
            updateData.confidenceThreshold = confidenceThreshold;
        }
        if (appointmentDuration !== undefined) updateData.appointmentDuration = appointmentDuration;
        if (reminderSettings !== undefined) updateData.reminderSettings = reminderSettings;
        if (emailConfig !== undefined) updateData.emailConfig = emailConfig;
        if (backupConfig !== undefined) updateData.backupConfig = backupConfig;
        if (auditLog !== undefined) updateData.auditLog = auditLog;
        if (allowPatientDeletion !== undefined) updateData.allowPatientDeletion = allowPatientDeletion;
        if (allowDataExport !== undefined) updateData.allowDataExport = allowDataExport;
        if (requireApprovalForReports !== undefined) updateData.requireApprovalForReports = requireApprovalForReports;

        if (!settings) {
            settings = await Settings.create(updateData);
        } else {
            settings = await Settings.findByIdAndUpdate(
                settings._id,
                updateData,
                { new: true, runValidators: true }
            );
        }

        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        console.error('Update settings error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.triggerTraining = async (req, res) => {
    try {
        const { password } = req.body;
        const result = await trainModel(password);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
