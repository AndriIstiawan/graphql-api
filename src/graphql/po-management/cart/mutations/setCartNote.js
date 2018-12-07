var GraphQLString = require('graphql').GraphQLString;
var CartType = require('./../CartType');
var CartModel = require('./../../../../models/po-management/cart/cart');
var dateFormat = require('dateformat');
var mongoose = require('mongoose');

exports.setCartNote = {
    type: CartType.CartType,
    args: {
        memberID: {
            type: GraphQLString,
        },
        note: {
            type: GraphQLString,
        },
        cartType: {
            type: GraphQLString,
        }
    },
    resolve: async (root, params) => {
        const now = new Date();
        const updateCart = await CartModel.findOneAndUpdate({
            "member": {
                $elemMatch: {
                    "_id": mongoose.Types.ObjectId(params.memberID)
                }
            },
            "type": params.cartType,
            "deleted_at": null
        },
            {
                "note": params.note,
                'updated_at': dateFormat(now, "yyyy-mm-dd H:MM:ss")
            }
        );
        
        return await CartModel.findById(updateCart.id).exec();
    }
}