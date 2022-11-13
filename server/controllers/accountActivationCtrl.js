const userModel = require('../models/userModel.js');

module.exports = async (req,res) => {

  try {

    const user = await userModel.findOneAndUpdate({activation_id: req.params.id},
                                                  {activated: true},{new:true});

    if(user.activated){
      res.status(200).send(`<div style="width: 50vw; margin: 15% auto">
                              <h1>Your account is now active, <span style="color: red">please login</span></h1>
                              <a href="http://localhost:5000/">Go to Weronique-Handmade-ART</a>
                            </div>`);
    }
    else {

      res.status(400).send('Account id not valid!')

    }
    
  } catch (error) {
    res.status(500).json({error});
  } 
}