var CartModel = require('./../../../models/po-management/cart/cart');
var dateFormat = require('dateformat');

exports.setPromoTotal = async (cart) => {
    const now = new Date();
    if(cart.promo[0].type == 'percent'){
        cart.total_price[0].total_cut_promo = cart.total_price[0].total - (cart.total_price[0].total*cart.promo[0].value/100);
    }else{
        cart.total_price[0].total_cut_promo = cart.total_price[0].total - cart.promo[0].value;
    }

    //update cart
    await CartModel.findOneAndUpdate({
        "_id": cart.id
    }, {
        'total_price': cart.total_price,
        'updated_at': dateFormat(now, "yyyy-mm-dd H:MM:ss")
    });
};