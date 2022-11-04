const eventsModel = require('../models/eventsModel.js');

module.exports = async (req, res) => {
    try {
        const events = await eventsModel.find({date: {$gt: new Date()}}).select('-_id');
        const newest = events.reduce((newest,current)=>newest.date<current.date?newest:current);
        res.status(200).json({newest})
    } catch (error) {
        res.status(500).json({error: error.message});
    } 
}