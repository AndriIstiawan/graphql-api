var CartModel = require('./../../../models/po-management/cart/cart');
var ProductModel = require('./../../../models/product-management/product');
var mongoose = require('mongoose');

exports.setPromoProduct = async (cart) => {
    var promo_status_used = false;
    var products = ProductModel.find({});
    if(cart.promo[0].target[0].brands.length > 0){
        const brand_array = cart.promo[0].target[0].brands.map(obj=>{return mongoose.Types.ObjectId(obj._id);});
        products.find({
            "brand._id": {$in: brand_array}
        });
    }
    if(cart.promo[0].target[0].categories.length > 0){
        const category_array = cart.promo[0].target[0].categories.map(obj=>{return mongoose.Types.ObjectId(obj._id);});
        products.find({
            "categories._id": {$in: category_array}
        });
    }
    if(cart.promo[0].target[0].products.length > 0){
        const product_array = cart.promo[0].target[0].products.map(obj=>{return mongoose.Types.ObjectId(obj._id);});
        products.find({
            "_id": {$in: product_array}
        });
    }

    products.exec();
    products = await products.then(function(result) {
        return result.map(obj=>{ return obj._id.toString(); });
    });
    cart.products.map(obj=>{
        if(products.indexOf(obj.product_id) > -1){
            var promo_percent = 0;
            promo_status_used = true;
            obj.promo = cart.promo;
            obj.price_gross = obj.price_netto;
            if(cart.promo[0].type == 'price'){
                obj.price_gross = obj.price_gross - cart.promo[0].value;
            }else{
                promo_percent = promo_percent + parseInt(cart.promo[0].value);
            }
            if(obj.discount_percent > 0){
                promo_percent = promo_percent + obj.discount_percent;
            }
            if(promo_percent > 0){
                obj.price_gross = obj.price_gross - (obj.price_netto*promo_percent/100);
            }
            obj.price_gross = obj.price_gross - obj.discount_price;
            if(obj.price_gross < 0){
                obj.price_gross = 0;
            }
            obj.total_price = obj.price_gross*obj.quantity;
        }
    });
    //update cart
    await CartModel.findOneAndUpdate({
        "_id": cart.id
    }, {
        'products': cart.products,
    });
    return promo_status_used;
};