var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var CartType = require('./CartType');
var CartModel = require('./../../../models/po-management/cart/cart');
var mongoose = require('mongoose');

//get cart by id
exports.getCart = {
    type: CartType.CartType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const cart = CartModel.findById(params.id).exec();
        if (!cart) {
            throw new Error('Error')
        }
        return cart;
    }
}

//get cart by member ID
exports.getCartByMemberID = {
    type: CartType.CartType,
    args: {
        memberID: {
            type: new GraphQLNonNull(GraphQLString)
        },
        cartType: {
            type: GraphQLString,
        }
    },
    resolve: (root, params) => {
        console.log(params.memberID);
        const cart = CartModel.findOne({
            "member": {
                $elemMatch: {
                    "_id": mongoose.Types.ObjectId(params.memberID)
                }
            },
            "type": params.cartType,
            "deleted_at": null
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return [];
        });
        return cart;
    }
}