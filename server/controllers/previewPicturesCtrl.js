const artWorkModel = require('../models/artWorkModel.js');

const previewPicturesCtrl = async (req,res)=>{

    try {
        const { name } = req.params;
        const item = await artWorkModel.find({name: name});
        res.status(200).json(item[0].pictures)
    } catch (error) {
        res.status(500).send(`getting pics from DB problem: ${error.message}`)
    }

};

module.exports = previewPicturesCtrl;