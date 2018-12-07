var CartModel = require('./../../../models/po-management/cart/cart');
var dateFormat = require('dateformat');

exports.cartUpdateTotal = async (cart_id) => {
    const now = new Date();
    var total_weight = [{
        'weight': 0,
        'unit': 'g'
    }];
    var total_price = [{
        'total_product': 0,
        'courier_cost':0,
        'courier_cut_promo':0,
        'total': 0,
        'total_cut_promo': 0,
        'currency': 'IDR'
    }];
    const cart = await CartModel.findById(cart_id).exec();
    cart.products.map(obj => {
        total_weight[0].weight = total_weight[0].weight + obj.weight[0].total_weight;
        total_price[0].total_product = total_price[0].total_product + obj.total_price;
        total_price[0].total = total_price[0].total_product;
    });
    if(cart.courier.length > 0) {
        total_price[0].total = total_price[0].total + cart.courier[0].costs[0].cost[0].value;
        total_price[0].courier_cost = cart.courier[0].costs[0].cost[0].value;
    }

    await CartModel.findOneAndUpdate({
        "_id": cart._id
    }, {
        'total_weight': total_weight,
        'total_price': total_price,
        'updated_at': dateFormat(now, "yyyy-mm-dd H:MM:ss")
    });
    return true;
};