const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

exports.createAppointment = async (req, res) => {
    try {
        const {
            patientId,
            appointmentDate,
            appointmentTime,
            appointmentType,
            doctorName,
            department,
            notes,
            createdBy
        } = req.body;

        // Validate required fields
        if (!patientId || !appointmentDate || !appointmentTime || !appointmentType) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: patientId, appointmentDate, appointmentTime, appointmentType'
            });
        }

        // Check if patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        // Generate unique appointment ID
        const count = await Appointment.countDocuments();
        const appointmentId = `APT-${Date.now()}-${count + 1}`;

        const appointment = await Appointment.create({
            appointmentId,
            patientId,
            appointmentDate,
            appointmentTime,
            appointmentType,
            doctorName: doctorName || 'Dr. AI Scan',
            department: department || 'Pulmonology',
            notes: notes || '',
            createdBy: createdBy || 'System'
        });

        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        console.error('Create appointment error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const { date, status, patientId, upcoming } = req.query;
        let query = {};

        if (status) query.status = status;
        if (patientId) query.patientId = patientId;

        if (date) {
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            query.appointmentDate = { $gte: start, $lte: end };
        }

        if (upcoming === 'true') {
            query.appointmentDate = { $gte: new Date() };
            query.status = 'Scheduled';
        }

        const appointments = await Appointment.find(query)
            .populate('patientId', 'fullName patientId phoneNumber')
            .sort({ appointmentDate: 1, appointmentTime: 1 });

        res.status(200).json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('patientId');
        if (!appointment) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const { updatedBy, status, cancelReason, completionNotes } = req.body;

        const updateData = {
            ...req.body,
            updatedBy: updatedBy || 'System'
        };

        // If cancelling, require cancel reason
        if (status === 'Cancelled' && !cancelReason) {
            return res.status(400).json({
                success: false,
                message: 'Cancel reason is required when cancelling an appointment'
            });
        }

        // If completing, optionally add completion notes
        if (status === 'Completed') {
            updateData.completionNotes = completionNotes || '';
        }

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate('patientId', 'fullName patientId phoneNumber');

        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }

        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        console.error('Update appointment error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
