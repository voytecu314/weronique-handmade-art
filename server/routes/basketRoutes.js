const express = require('express');
const {addToBasketCtrl, getUserBasketCtrl, getSessionBasketCtrl, removeFromUserBasket} = require('../controllers/basketCtrl.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.get('/get-user-basket',auth, getUserBasketCtrl);

router.post('/get-session-basket',getSessionBasketCtrl);

router.post('/add-item',auth,addToBasketCtrl);

router.delete('/remove-item',auth,removeFromUserBasket);

module.exports = router;