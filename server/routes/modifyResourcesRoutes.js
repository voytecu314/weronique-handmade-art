const express = require('express');
const uploadResourceController = require('../controllers/uploadResourceCtrl.js');

const router = express.Router();

router.post('/upload', uploadResourceController);

module.exports = router;