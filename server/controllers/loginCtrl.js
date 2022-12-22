require('dotenv').config();
const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {

  const { user_name, email, password } = req.body;

  try {

    //Check if user already exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User Already Exists!" });
    }
	
    //Create a new user
    const user = new userModel({
      user_name,
      email,
      password,
      basket: [],
      purchase_history: []
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt); 

    await user.save();

    res.status(401).json({msg: `Activation email sent to ${email}, activate your account`,
                          activation_email: {
                            pKey: process.env.EMAIL_JS_PUBLIC_KEY,
                            serviceID: process.env.EMAIL_JS_SERVICE_ID,
                            templateID: process.env.EMAIL_JS_ACTIVATION_EMAIL_TEMPLATE_ID
                          },
                          data: {
                            name: user.user_name,
                            email: user.email,
                            activation_id: user.activation_id
                          }
                        });

  } catch (error) {
  res.status(500).send({msg :error});
  }
};

const userLogin = async (req, res) => {

  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User Not Exists!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect Password!" });
    }

    if (!user.activated) {
      return res.status(401).json( {msg: `Account is not activated, please check your email (${email})`,
                                    activation_email: {
                                      pKey: process.env.EMAIL_JS_PUBLIC_KEY,
                                      serviceID: process.env.EMAIL_JS_SERVICE_ID,
                                      templateID: process.env.EMAIL_JS_ACTIVATION_EMAIL_TEMPLATE_ID
                                    },
                                    data: {
                                      name: user.user_name,
                                      email: user.email,
                                      activation_id: user.activation_id
                                    }
                                  });
    }

    const payload = {
        activation_id: user.activation_id,
        name: user.user_name,
        auth: true
    }; 

    jwt.sign(payload, process.env.JWT_RANDOM_STRING, { expiresIn: 60 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ msg:`Hello ${user.user_name}! You are now logged`, token });
    });
  } catch (error) {
    res.status(500).json({msg: 'Authentication error!'});
    console.log('auth error:',error.message);}
};

const isLogged = async (req, res) => {
  
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.json({error});
  }

};

module.exports = {userSignUp, userLogin, isLogged};