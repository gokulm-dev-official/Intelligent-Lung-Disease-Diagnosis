const express = require('express');
const {
    createAppointment,
    getAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment
} = require('../controllers/appointmentController');

const router = express.Router();

router.route('/')
    .post(createAppointment)
    .get(getAppointments);

router.route('/:id')
    .get(getAppointment)
    .put(updateAppointment)
    .delete(deleteAppointment);

module.exports = router;
