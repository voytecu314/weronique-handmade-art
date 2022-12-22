require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const token = req.header("token");

  try {
    //!token is always true!!? req.header method returns always a string?
    if (!token) {
      throw new Error("Auth Error!! No token!");
    }

    const decoded = jwt.verify(token, process.env.JWT_RANDOM_STRING);
    req.user = decoded; //jwt payload
    next();

  } catch (error) {
    res.status(500).json({error: error.message, auth: false});
  }
};