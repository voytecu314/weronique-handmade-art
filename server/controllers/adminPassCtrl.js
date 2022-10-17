require('dotenv').config();
const crypto = require('crypto');
const adminModel = require('../models/adminModel.js');
const salt = process.env.ADMIN_PASS_SALT;

const adminPassController = async (req,res) => {

    try {

        const hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, `sha512`).toString(`hex`);
        const adminCollection = await adminModel.find({});
        const auth = !!adminCollection.find(({adminPass})=>adminPass===hash);

        if(auth) res.sendFile(__dirname.split( '/' ).slice( 0, -1 ).join( '/' )+'/public/admHtml/updateDB.html');

        else res.json(auth);

    } catch (error) {

        console.log(error);
        res.status(500).json(false)
        
    }
    
     
}

module.exports = adminPassController;