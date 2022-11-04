require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const token = req.header("token");
try {
  if (!token) {
    throw new Error("Auth Error!! No token!");
  }

  
    const decoded = jwt.verify(token, process.env.JWT_RANDOM_STRING);
    req.user = decoded; //jwt payload
    next();
  } catch (error) {
    res.status(500).json({token_error: error.message, auth: false});
  }
};