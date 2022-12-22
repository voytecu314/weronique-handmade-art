const mongoose = require('mongoose');

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const connectMongo = () => {

    mongoose.connect(MONGO_DB_URL );

    // When successfully connected
  mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open');
  }); 
  
  // If the connection throws an error
  mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });
  

}

module.exports = connectMongo;