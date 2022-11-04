const express = require('express');
const getEventCtrl = require('../controllers/getEventCtrl.js');

const router = express.Router();

router.get('/newest', getEventCtrl);

module.exports = router;