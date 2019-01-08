var CartModel = require('./../../../models/po-management/cart/cart');
var PromoHistory = require('./../../../models/member-management/promoHistory');
var cartUpdateTotal = require('./cartUpdateTotal').cartUpdateTotal;
var mongoose = require('mongoose');

exports.removePromoProduct = async (type, cart_id) => {
    const cart = await CartModel.findById(cart_id).exec();

    if(cart.promo[0].target[0].target == 'product'){
        cart.products.map(obj=>{
            obj.promo = [];
            obj.price_gross = obj.price_netto;
            if(obj.discount_percent > 0){
                obj.price_gross = obj.price_gross - ((obj.price_gross * obj.discount_percent)/100);
            }
            obj.price_gross = obj.price_gross - obj.discount_price;
            obj.total_price = obj.price_gross * obj.quantity; 
        });
    }

    // update cart total
    if(await cartUpdateTotal(cart._id)){
        console.log('cartUpdateTotal success');
    }

    // update cart
    await CartModel.findOneAndUpdate({
        "_id": cart.id
    }, {
        'products': cart.products,
        'promo':[],
        'promo_used': false,
    });

    //update promo member history
    PromoHistory.find({
        "member_id": cart.member[0]._id,
        "promo": {
            $elemMatch: {
                "_id": mongoose.Types.ObjectId(cart.promo[0]._id)
            }
        }
    }).remove().exec();
    return true;
};