const express = require('express');
const previewPicturesCtrl = require('../controllers/previewPicturesCtrl.js');

const router = express.Router();

router.get('/:name',previewPicturesCtrl);

module.exports = router;