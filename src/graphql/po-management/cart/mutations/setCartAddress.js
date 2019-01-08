var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var CartType = require('./../CartType');
var CartModel = require('./../../../../models/po-management/cart/cart');
var MemberModel = require('./../../../../models/member-management/member');
var dateFormat = require('dateformat');
var mongoose = require('mongoose');

exports.setCartAddress = {
    type: CartType.CartType,
    args: {
        memberID: {
            type: GraphQLString,
        },
        position_index: {
            type: GraphQLInt,
        },
        cartType: {
            type: GraphQLString,
        }
    },
    resolve: async (root, params) => {
        const now = new Date();
        const member = await MemberModel.findById(params.memberID).exec();
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
                "address": [member.address[params.position_index]],
                'updated_at': dateFormat(now, "yyyy-mm-dd H:MM:ss")
            }
        );
        
        return await CartModel.findById(updateCart.id).exec();
    }
}