require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    try {

        const token = req.headers.token; //console.log('token', token);
        
        if (!token || token==='null') {
            req.user = {auth:false}; //console.log('no token');
        } else {
            req.user = {auth:true};  //console.log('token is there');

                try {
                        const decoded = jwt.verify(token, process.env.JWT_RANDOM_STRING);
                    } catch (error) {
                        //console.log('token is wrong');
                        req.user = {auth:false}; //console.log('so I reject your auth');
                    }
            
        }

        next();

    } catch (error) {
    res.status(500).json({error: error.message, auth: false}); 
    console.log('authPurchaseError',error);
    }
};