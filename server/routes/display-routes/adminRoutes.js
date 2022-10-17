const express = require('express');
const adminPassController = require('../../controllers/adminPassCtrl.js');

const router = express.Router();

router.route('/upload')
    .get((req, res) => {
    res.sendFile('/public/admHtml/adminUpload.html', {root: __dirname.split( '/' ).slice( 0, -2 ).join( '/' )});
})  
    .post(adminPassController);

module.exports = router;