var GraphQLString = require('graphql').GraphQLString;
var CartType = require('./../CartType');
var CartModel = require('./../../../../models/po-management/cart/cart');
var mongoose = require('mongoose');

// add module
var removePromoProduct = require('./../../module/removePromo').removePromoProduct;

exports.removeCartPromo = {
    type: CartType.CartType,
    args: {
        memberID: {
            type: GraphQLString,
        },
        cartType: {
            type: GraphQLString,
        }
    },
    resolve: async (root, params) => {
        var cart = await CartModel.findOne({
            "member": {
                $elemMatch: {
                    "_id": mongoose.Types.ObjectId(params.memberID)
                }
            },
            "type": params.cartType,
            "deleted_at": null
        }).exec();
        await removePromoProduct("cart", cart.id);
        return await CartModel.findById(cart._id).exec();
    }
}