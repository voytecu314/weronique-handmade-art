const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    place: String,
    date: Date,
    link: String
});

const eventsModel = new mongoose.model('event',eventSchema);

module.exports = eventsModel;