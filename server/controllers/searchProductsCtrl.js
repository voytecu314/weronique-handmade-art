const artWorkModel = require('../models/artWorkModel.js');

const searchProductsCtrl = async (req, res) => {
    try {
        const { keyword } = req.params;
        let searchResult;

        if(keyword==='TEDDIES' || keyword==='DOLLS' || keyword==='ART'){
            searchResult = await artWorkModel.find({category:keyword});
        } else if(keyword==='newest') {
            searchResult = await artWorkModel.find({});
            searchResult.reverse();
            searchResult=searchResult.slice(0,4);
        } else {
            searchResult = await artWorkModel.find({keywords:keyword});
        }
        
        res.status(200).json(searchResult)
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

module.exports = searchProductsCtrl;