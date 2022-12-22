const paypal =require('../paypal-api.js');
const auth = require('../middleware/authPurchase.js');
const {Router} = require('express');
const itemsModel = require('../models/artWorkModel.js');

const router = Router();

router.post("/api/orders", auth, async (req, res) => {
    try {
      const toPurchase = await itemsModel.find({ _id: { $in: req.body } }); 

      let total_value = 0;
      const items = [];

      const createItems = (name, value, description) => {
        items.push({
            name,
            quantity: 1,
            unit_amount: {
                currency_code: "EUR",
                value
            },
            description
        });
      }
      
      if(req.user?.auth){

        toPurchase.forEach(item => {
            const price_after_discount = Number((item.price-(item.price*(item.discount.percent/100))).toFixed(2));
            total_value+=price_after_discount;
            createItems(item.name, price_after_discount,item.title);
        });
      
    } else {

        toPurchase.forEach(item => {
            const itemPrice = item.discount.set?
                              Number((item.price-(item.price*(item.discount.percent/100))).toFixed(2)):
                              item.price;
            total_value+=itemPrice;
            createItems(item.name, itemPrice,item.title);
        });

    } 

    const orderObject = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "EUR",
              value: total_value,
              breakdown: {
                  item_total: {
                    currency_code: "EUR",
                    value: total_value,
                  },
                },
            },
            items
          },
        ],
      };      

      console.log(req.user?.auth && req.user.auth,'\n',toPurchase.map(item=>item.name));

      const order = await paypal.createOrder(orderObject);
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

