const mongoose = require('mongoose');

const artWorkSchema = new mongoose.Schema({
    picture: {required: true, type: String},
    category: String,
    name: String,
    title: String,
    description: String,
    keywords: Array,
    technic: String,
    price: Number,
    discount: Number
});

const artWorkModel = new mongoose.model('art-work',artWorkSchema);

module.exports = artWorkModel;