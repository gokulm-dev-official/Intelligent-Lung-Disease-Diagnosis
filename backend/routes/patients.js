const express = require('express');
const {
    registerPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
} = require('../controllers/patientController');

const router = express.Router();

router.route('/')
    .post(registerPatient)
    .get(getPatients);

router.route('/:id')
    .get(getPatient)
    .put(updatePatient)
    .delete(deletePatient);

module.exports = router;
