const express = require('express');
const {addToBasketCtrl, getSessionBasketCtrl} = require('../controllers/basketCtrl.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/get-session-basket',getSessionBasketCtrl);

router.post('/add-item',auth,addToBasketCtrl);

module.exports = router;