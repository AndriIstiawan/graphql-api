var CartModel = require('./../../../models/po-management/cart/cart');
var setPromoProduct = require('./setPromoProduct').setPromoProduct;
var setPromoCourier = require('./setPromoCourier').setPromoCourier;
var setPromoTotal = require('./setPromoTotal').setPromoTotal;
var removePromoProduct = require('./removePromo').removePromoProduct;
var cartUpdateTotal = require('./cartUpdateTotal').cartUpdateTotal;

exports.setPromo = async (type, cart_id) => {
    const now = new Date();
    const cart = await CartModel.findById(cart_id).exec();
    //check promo expire
    if(new Date(cart.promo[0].expired_date) < now){
        // update cart total
        if(await cartUpdateTotal(cart._id)){
            console.log('cartUpdateTotal success');
            await removePromoProduct("cart", cart.id);
            throw new Error('Promo Expired.');
        }
    }
    
    switch (cart.promo[0].target[0].target) {
        case "product":
            if(!await setPromoProduct(cart)){
                await removePromoProduct("cart", cart.id);
                throw new Error("Promo code is not available for this cart");
            }
            await cartUpdateTotal(cart_id);
            break;
        case "courier":
            if(!await setPromoCourier(cart)){
                await removePromoProduct("cart", cart.id);
                throw new Error("Promo code is not available for this cart");
            }
            break;
        case "total price":
            await setPromoTotal(cart);
            break;
        default:
            break;
    }
    return "setPromo success";
};