const express = require('express');
const getOnLoadArtWorksCtrl = require('../controllers/getOnLoadArtWorksCtrl.js');

const router = express.Router();

router.get('/', getOnLoadArtWorksCtrl);

module.exports = router;