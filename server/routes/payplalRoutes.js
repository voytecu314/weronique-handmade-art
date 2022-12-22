const paypal =require('../paypal-api.js');
const auth = require('../middleware/authPurchase.js');
const {Router} = require('express');
const itemsModel = require('../models/artWorkModel.js');

const router = Router();

router.post("/api/orders", auth, async (req, res) => {
    try {
      const toPurchase = await itemsModel.find({ _id: { $in: req.body } }); 
      

      console.log(req.user?.auth && req.user.auth,'\n',toPurchase.map(item=>item.name));

      const order = await paypal.createOrder(6);
      res.json(order);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  router.post("/api/orders/:orderID/capture", async (req, res) => {
    const { orderID } = req.params;
    try {
      const captureData = await paypal.capturePayment(orderID);
      res.json(captureData);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = router;

