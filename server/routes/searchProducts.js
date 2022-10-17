const express = require('express');
const searchProducts = require('../controllers/searchProductsCtrl.js');

const router = express.Router();

router.get('/:keyword',searchProducts);

module.exports = router;