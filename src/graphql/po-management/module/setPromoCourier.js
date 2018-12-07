var CartModel = require('./../../../models/po-management/cart/cart');
var dateFormat = require('dateformat');

exports.setPromoCourier = async (cart) => {
    var promo_status_used = false;
    const now = new Date();
    if(cart.courier.length == 0){
        return false;
    }else{
        const courier = cart.promo[0].target[0].couriers.find(o => o._id === cart.courier[0].detail[0]._id.toString());
        if(courier || cart.promo[0].target[0].couriers.length == 0){
            promo_status_used = true;
            var courier_cost = cart.courier[0].costs[0].cost[0].value;
            if(cart.promo[0].type == 'percent'){
                cart.total_price[0].courier_cut_promo = courier_cost - (courier_cost*cart.promo[0].value/100);
            }else{
                cart.total_price[0].courier_cut_promo = courier_cost - cart.promo[0].value;
            }
            if(cart.total_price[0].courier_cut_promo < 0){
                cart.total_price[0].courier_cut_promo = 0;
            }
            cart.total_price[0].total = cart.total_price[0].total_product + cart.total_price[0].courier_cut_promo;
            //update cart
            await CartModel.findOneAndUpdate({
                "_id": cart.id
            }, {
                'total_price': cart.total_price,
                'updated_at': dateFormat(now, "yyyy-mm-dd H:MM:ss")
            });
        }
    }
    
    return promo_status_used;
};