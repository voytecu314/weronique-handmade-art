const mongoose = require('mongoose');

const discountSchema = mongoose.Schema({
  set: {type: Boolean, default: false},
  percent: {type: Number, min: 1, max: 100}
});

const artWorkSchema = new mongoose.Schema({
    pictures: {required: true, type: Array},
    category: String,
    name: String,
    title: String,
    description: String,
    keywords: Array,
    technic: String,
    price: Number,
    discount: Object
}, {
    timestamps: true
  });

const artWorkModel = new mongoose.model('art-work',artWorkSchema);

module.exports = artWorkModel;