require('dotenv').config();
const express = require('express');
const connectMongo = require('./mongo/mongo_connect.js');
const paypal =require('./paypal-api.js');
const adminRoutes = require('./routes/display-routes/adminRoutes.js');
const modifyResourcesRoutes = require('./routes/modifyResourcesRoutes.js');
const getOnLoadArtWorks = require('./routes/onLoadArtWorks.js');
const searchProductsRoutes = require('./routes/searchProducts.js');
const contactRoute = require('./routes/contactRoute.js');
const fetchPreviewPicturesRoute = require('./routes/fetchPreviewPicturesRoute.js');
const loginRoutes = require('./routes/loginRoutes.js');
const accountActivationRoute = require('./routes/display-routes/accountActivationRoute.js');
const upcomingEventRoute = require('./routes/upcomingEventRoute.js');
const basketRoutes = require('./routes/basketRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:'50mb'})); 

app.use('/admin',adminRoutes);
app.use('/resources',modifyResourcesRoutes);
app.use('/get-items-onload',getOnLoadArtWorks);
app.use('/search-products',searchProductsRoutes);
app.use('/email-js',contactRoute);
app.use('/get-preview-pictures',fetchPreviewPicturesRoute);
app.use('/user-login',loginRoutes);
app.use('/activate-account',accountActivationRoute);
app.use('/upcoming-event',upcomingEventRoute);
app.use('/basket',basketRoutes);

connectMongo();

app.use(express.static('public'));

app.get('/', (req, res) => {
    try {
        
        res.sendFile('index.html');

    } catch (error) {

        res.json({error})

    }

} );


//Move this to paypal-routes

app.post("/api/orders", async (req, res) => {
    try {
      const order = await paypal.createOrder(6);
      res.json(order);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
  app.post("/api/orders/:orderID/capture", async (req, res) => {
    const { orderID } = req.params;
    try {
      const captureData = await paypal.capturePayment(orderID);
      res.json(captureData);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });


app.listen(PORT, ()=>console.log('Server listens on port', PORT))