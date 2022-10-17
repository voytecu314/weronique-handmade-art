const artWorkModel = require('../models/artWorkModel.js');

const getOnLoadArtWorksCtrl = async (req, res) => {

    try {
        const items = await artWorkModel.find({});
        const chosen_products = [];

        for (let i = 0; i < 2; i++) {
            chosen_products.push(...items.splice(Math.round(Math.random()*items.length),1));
        }
        
        res.status(200).json(chosen_products)

    } catch (error) {
        res.stratus(500).send('onLoadArtWorks Server error: ', error.message);
    }

}

module.exports = getOnLoadArtWorksCtrl;