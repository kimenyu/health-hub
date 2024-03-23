const express = require('express');
const consultantController =  require('../controllers/consultantController');

const router = express.Router();

router.post('/create', consultantController.createConsultant);
router.post('/login', consultantController.loginConsultant);

module.exports =router;