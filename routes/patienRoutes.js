const express = require('express');
const patientControllers = require('../controllers/patientController');

const router = express.Router();

router.post('/create/patient', patientControllers.createPatient);
router.post('/login/patient', patientControllers.loginPatient);

module.exports = router;