const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientId: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    age: { type: Number, required: true, min: 1, max: 120 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    emergencyContactName: { type: String },
    emergencyContactPhone: { type: String },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    medicalConditions: { type: String },
    registrationDate: { type: Date, default: Date.now },
    lastVisitDate: { type: Date },
    totalScans: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
