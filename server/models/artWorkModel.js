const mongoose = require('mongoose');

const artWorkSchema = new mongoose.Schema({
    pictures: {required: true, type: Array},
    category: String,
    name: String,
    title: String,
    description: String,
    keywords: Array,
    technic: String,
    price: Number,
    discount: Number
}, {
    timestamps: true
  });

const artWorkModel = new mongoose.model('art-work',artWorkSchema);

module.exports = artWorkModel;