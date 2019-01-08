var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var CartType = require('./../CartType');
var CartModel = require('./../../../../models/po-management/cart/cart');
var MemberModel = require('./../../../../models/member-management/member');
var dateFormat = require('dateformat');
var mongoose = require('mongoose');

//add module
var addProductCart = require('./../../module/addProduct').addProductCart;
var setPromo = require('./../../module/setPromo').setPromo;
var cartUpdateTotal = require('./../../module/cartUpdateTotal').cartUpdateTotal;

exports.addToCart = {
    type: CartType.CartType,
    args: {
        IP: {
            type: GraphQLNonNull(GraphQLString),
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
        quantity: {
            type: GraphQLInt,
        },
        cartType: {
            type: GraphQLString,
        }
    },
    resolve: async (root, params) => {
        const now = new Date();
        //get cart by member ID, status, and type 
        var cart = await CartModel.findOne({
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
        });

        //get member
        const member = await MemberModel.findById(params.memberID).exec();
        const address = member.address.find(o => o.primary === true);
        if(!cart){
            cart = await new CartModel({
                'IP': params.IP,
                'member': member,
                'products': [],
                'address': address,
                'note': "",
                'total_weight': [],
                'total_price': [],
                'payment_status': false,
                'status': "Active", 
                'type': params.cartType,
                'created_at': dateFormat(now, "yyyy-mm-dd H:MM:ss"),
                'updated_at': dateFormat(now, "yyyy-mm-dd H:MM:ss")
            }).save();
        }

        if(await addProductCart(cart, params.productID, params.variant, params.quantity)){
            console.log('addProductCart success');
            if(await cartUpdateTotal(cart._id)){
                console.log('cartUpdateTotal success');
            }
        }
        if(cart.promo.length > 0){
            console.log(await setPromo("cart", cart.id));
        }
        return await CartModel.findById(cart._id).exec();
    }
}