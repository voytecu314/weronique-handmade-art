const express = require('express');
const connectMongo = require('./mongo/mongo_connect.js');
const adminRoutes = require('./routes/display-routes/adminRoutes.js');
const modifyResourcesRoutes = require('./routes/modifyResourcesRoutes.js');
const getOnLoadArtWorks = require('./routes/onLoadArtWorks.js');
const searchProductsRoutes = require('./routes/searchProducts.js');
const contactRoute = require('./routes/contactRoute.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit:'50mb'})); 

app.use('/admin',adminRoutes);
app.use('/resources',modifyResourcesRoutes);
app.use('/get-items-onload',getOnLoadArtWorks);
app.use('/search-products',searchProductsRoutes);
app.use('/email-js',contactRoute);

connectMongo();

app.use(express.static('public'));

app.get('/', (req, res) => {
    try {
        
        res.sendFile('index.html');

    } catch (error) {

        res.json({error})

    }

} );


app.listen(PORT, ()=>console.log('Server listens on port', PORT))