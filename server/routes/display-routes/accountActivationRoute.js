const express = require('express');
const accountActivationCtrl = require('../../controllers/accountActivationCtrl.js');

const router = express.Router();

router.get('/:id',accountActivationCtrl);

module.exports = router;