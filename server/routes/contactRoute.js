const contactCtrl = require('../controllers/contactCtrl.js');
const express = require('express');

const router = express.Router();

router.get('/',contactCtrl);

module.exports = router;