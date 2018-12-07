var ProductModel = require('./../../../models/product-management/product');
var CartModel = require('./../../../models/po-management/cart/cart');
var setProductDiscount = require('./setProductDiscount').setProductDiscount;
var dateFormat = require('dateformat');

exports.addProductCart = async (cart, product_id, variant, quantity) => {
    const now = new Date();
    var product_detail = [];
    //get product by product ID, and variant
    var product = await ProductModel.findOne({
        "_id": product_id
    })
    .then(result => {
        
        //*set weight and total price
        product_detail = result;
        if(result.weight[0].unit != 'g'){
            result.weight[0].weight = result.weight[0].weight * 1000; //untuk berat KG
        }
        var weight = [{
            'weight': result.weight[0].weight,
            'unit': 'g',
            'total_weight': result.weight[0].weight * quantity
        }];
        var prodVariant = {
            'image': result.image[0].filename,
            'variant': result.name,
            'key': result.name,
            'sku': result.sku,
            'price': result.price[0].max,
        };
        if(variant != ''){
            prodVariant = result.variant.find(o => o.key === variant);
        }else{
            variant = prodVariant.key;
        }
        return {
            'product_id': product_id,
            'image': prodVariant.image,
            'product_name': result.name,
            'variant': prodVariant.key,
            'sku': prodVariant.sku,
            'weight': weight,
            'quantity': quantity,
            'price_netto': prodVariant.price,
            'discounts': [],
            'discount_percent': 0,
            'discount_price': 0,
            'discounts': [],
            'price_gross': prodVariant.price,
            'total_price': prodVariant.price*quantity,
            'updated_at': dateFormat(now, "yyyy-mm-dd H:MM:ss")
        };
    })
    .catch(err => {
        return [];
    });

    product = setProductDiscount(cart.member[0], product, product_detail);
    //check cart promo and set auto to product
    if(cart.promo.length > 0) {
        if(cart.promo[0].target[0].target == 'product'){
            console.log('promo available');
        }
    }
    await CartModel.findOneAndUpdate({
        "_id": cart._id
    }, {
        $pull: {
            "products": {
                "product_id": product_id,
                "variant": variant
            }
        }
    });
    await CartModel.findOneAndUpdate({
        "_id": cart._id
    }, {
        $push: {
            "products": product
        },
        "updated_at": dateFormat(now, "yyyy-mm-dd H:MM:ss")
    });
    return true;
};