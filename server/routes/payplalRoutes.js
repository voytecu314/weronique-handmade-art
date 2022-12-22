const {Router} = require('express');
const mongoose = require('mongoose');

const router = Router();

router.post("/api/orders", async (req, res) => {
    try {

      console.log(req.body);

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

