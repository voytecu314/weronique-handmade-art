require('dotenv').config();

const contactCtrl = (req, res)=>{
    res.status(200).json({
        pKey: process.env.EMAIL_JS_PUBLIC_KEY,
        serviceID: process.env.EMAIL_JS_SERVICE_ID,
        templateID: process.env.EMAIL_JS_TEMPLATE_ID
    }) }

module.exports = contactCtrl;