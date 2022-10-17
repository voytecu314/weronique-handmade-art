const artWorkModel = require('../models/artWorkModel.js');

const uploadResourceController = async (req, res) => {

    try {

        await artWorkModel.create(req.body);

        res.status(200).json('DATABASE UPDATED')
    
    } catch (error) {
        res.status(500).json(error.message)
    }
    
}

module.exports = uploadResourceController;