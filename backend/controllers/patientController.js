const Patient = require('../models/Patient');

// @desc    Register new patient
// @route   POST /api/patients
// @access  Public
exports.registerPatient = async (req, res) => {
    try {
        console.log("Registering patient with data:", req.body);

        // Ensure required fields are present
        const { fullName, age, gender, phoneNumber } = req.body;
        if (!fullName || !age || !gender || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: Name, Age, Gender, and Phone Number"
            });
        }

        // Generate a more robust unique ID
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomStr = Math.floor(1000 + Math.random() * 9000);
        const timestamp = Date.now().toString().slice(-4);
        const patientId = `PID-${date}-${randomStr}-${timestamp}`;

        const patient = await Patient.create({
            ...req.body,
            patientId
        });

        console.log("Patient created successfully:", patient.patientId);

        res.status(201).json({
            success: true,
            data: patient
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all patients
// @route   GET /api/patients
// @access  Public
exports.getPatients = async (req, res) => {
    try {
        const { search, gender, ageMin, ageMax, sortBy, order, page = 1, limit = 20 } = req.query;
        let query = {};

        // Search
        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { patientId: { $regex: search, $options: 'i' } },
                { phoneNumber: { $regex: search, $options: 'i' } }
            ];
        }

        // Filters
        if (gender) query.gender = gender;
        if (ageMin || ageMax) {
            query.age = {};
            if (ageMin) query.age.$gte = Number(ageMin);
            if (ageMax) query.age.$lte = Number(ageMax);
        }

        // Sort
        let sortOption = { createdAt: -1 };
        if (sortBy) {
            sortOption = { [sortBy]: order === 'asc' ? 1 : -1 };
        }

        const patients = await Patient.find(query)
            .sort(sortOption)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Patient.countDocuments(query);

        res.status(200).json({
            success: true,
            count: patients.length,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: patients
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Public
exports.getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Public
exports.updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Public
exports.deletePatient = async (req, res) => {
    try {
        const patientId = req.params.id;

        // Remove all associated analysis reports first
        console.log(`Cleaning up reports for patient: ${patientId}`);
        await Analysis.deleteMany({ patientId: patientId });

        const patient = await Patient.findByIdAndDelete(patientId);
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.status(200).json({ success: true, message: 'Patient and associated reports deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
