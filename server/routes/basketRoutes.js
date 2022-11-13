const express = require('express');
const addToBasketCtrl = require('../controllers/addToBasketCtrl.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/add-item',auth,addToBasketCtrl);

module.exports = router;