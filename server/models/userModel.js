const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_id: mongoose.Schema.Types.ObjectId,
    item_name: String,
    item_style: String,
    item_value: Number,
    discount: Boolean,
    item_quantity: Number
});

const basketSchema = new mongoose.Schema({
    purchase_date: Date,
    basket: [itemSchema]
});

const userSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    basket: [itemSchema],
    purchase_history: [basketSchema],
    activated: {type: Boolean, default: false},
    activation_id: {type: String, default: Math.random().toString(36).slice(2)}
},{
    timestamps: true
  });

const userModel = new mongoose.model('user',userSchema);

module.exports = userModel;