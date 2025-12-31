const Patient = require('../models/Patient');
const Analysis = require('../models/Analysis');
const Appointment = require('../models/Appointment');

exports.getStats = async (req, res) => {
    try {
        const totalPatients = await Patient.countDocuments();
        const totalScans = await Analysis.countDocuments();

        // Positive cases logic
        const covidCases = await Analysis.countDocuments({ diagnosis: 'COVID-19' });
        const pneumoniaCases = await Analysis.countDocuments({ diagnosis: 'Pneumonia' });
        const tbCases = await Analysis.countDocuments({ diagnosis: 'Tuberculosis' });
        const normalCases = await Analysis.countDocuments({ diagnosis: 'Normal' });

        const positiveCases = covidCases + pneumoniaCases + tbCases;

        const upcomingAppointments = await Appointment.countDocuments({
            appointmentDate: { $gte: new Date() },
            status: 'Scheduled'
        });

        res.status(200).json({
            success: true,
            data: {
                totalPatients,
                totalScans,
                positiveCases,
                upcomingAppointments,
                breakdown: {
                    covid: covidCases,
                    pneumonia: pneumoniaCases,
                    tuberculosis: tbCases,
                    normal: normalCases
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getChartsData = async (req, res) => {
    try {
        // Scans over last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const scansByMonth = await Analysis.aggregate([
            { $match: { createdAt: { $gte: sixMonthsAgo } } },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                scansByMonth
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getRecentActivity = async (req, res) => {
    try {
        const recentScans = await Analysis.find().sort({ createdAt: -1 }).limit(5).populate('patientId', 'fullName');
        const recentPatients = await Patient.find().sort({ createdAt: -1 }).limit(5);
        const todayAppointments = await Appointment.find({
            appointmentDate: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lt: new Date(new Date().setHours(23, 59, 59, 999))
            }
        }).populate('patientId', 'fullName');

        res.status(200).json({
            success: true,
            data: {
                recentScans,
                recentPatients,
                todayAppointments
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
