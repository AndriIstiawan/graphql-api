var GraphQLString = require('graphql').GraphQLString;
var CartType = require('./../CartType');
var CartModel = require('./../../../../models/po-management/cart/cart');
var dateFormat = require('dateformat');
var mongoose = require('mongoose');

//add module
var cartUpdateTotal = require('./../../module/cartUpdateTotal').cartUpdateTotal;

exports.removeFromCart = {
    type: CartType.CartType,
    args: {
        IP:{
            type: GraphQLString
        },
        memberID: {
            type: GraphQLString,
        },
        productID: {
            type: GraphQLString,
        },
        variant: {
            type: GraphQLString,
        },
        cartType: {
            type: GraphQLString,
        }
    },
    resolve: async (root, params) => {
        const now = new Date();

        //remove product cart
        const updatedCart = await CartModel.findOneAndUpdate({
            "member": {
                $elemMatch: {
                    "_id": mongoose.Types.ObjectId(params.memberID)
                }
            },
            "type": params.cartType,
            "deleted_at": null
        }, {
            $pull: {
                "products": {
                    "product_id": params.productID,
                    "variant": params.variant
                }
            },
            "updated_at": dateFormat(now, "yyyy-mm-dd H:MM:ss")
        });

        if(await cartUpdateTotal(updatedCart.id)){
            console.log('cartUpdateTotal success');
        }
        return await CartModel.findById(updatedCart.id).exec();
    }
}
