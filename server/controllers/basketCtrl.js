const artWorkModel = require('../models/artWorkModel.js');
const userModel = require('../models/userModel.js');

const getSessionBasketCtrl = async (req, res) => {
    try {
        const sessionBasket = await artWorkModel.find({_id:{$in: req.body}}).select(['-category','-description','-keywords','-technic','-__v']);
        res.status(200).json({sessionBasket});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const getUserBasketCtrl = async (req, res) => {
    try {
        const { activation_id } = req.user;
        const user = await userModel.findOne({ activation_id });
        const basketData = [];

        for(let i=0; i<user.basket.length; i++) {
            const {_id, item_name, item_style, item_value, discount, item_value_after_discount} = 
            user.basket[i];

            basketData.push({_id, item_name, item_style, item_value, discount, item_value_after_discount});
        }

        res.status(200).json(basketData);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const addToBasketCtrl = async (req, res) => {

    try {
        const filter = {activation_id: req.user.activation_id,name: req.user.name};
        const item = await artWorkModel.findById(req.body.id)
        const newItem = {
            item_id: item._id,
            item_name: item.name,
            item_style: item.title,
            item_value: item.price,
            discount: item.discount.percent,
            item_value_after_discount: Number((item.price-(item.price*(item.discount.percent/100))).toFixed(2)),
            item_quantity: 1,
            date_added: new Date().toLocaleString()
        }

        const user = await userModel.findOne(filter);
        const userBasket = user.basket;

        const itemAlreadyInTheBasket = userBasket.some(itemInBasket => itemInBasket.item_id.equals(req.body.id) );

        if(!itemAlreadyInTheBasket) await userModel.updateOne(filter,{$push:{basket: newItem}});
        
        res.status(200).json(itemAlreadyInTheBasket?'Already in basket':'Added to basket');
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}

const removeFromUserBasket = async (req, res) => {
    try {
        
        const user = await userModel.findOne({ activation_id: req.user.activation_id });

        const newBasket = user.basket.filter(item=>item._id!=req.body.item_id);

        await userModel.updateOne({ activation_id: req.user.activation_id }, 
            { basket: newBasket });
console.log(user.basket.filter(item=>item._id=req.body.item_id).pop());
        res.status(200).json({msg: 'Item removed from db basket', removed: user.basket.filter(item=>item._id=req.body.item_id).pop()});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports = { getSessionBasketCtrl, getUserBasketCtrl, addToBasketCtrl, removeFromUserBasket };