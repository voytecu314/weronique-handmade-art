const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminPass: String
});

const adminModel = new mongoose.model('admin-pass', adminSchema);

module.exports = adminModel;