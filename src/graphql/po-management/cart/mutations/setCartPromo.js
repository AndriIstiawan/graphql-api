var GraphQLString = require('graphql').GraphQLString;
var CartType = require('./../CartType');
var CartModel = require('./../../../../models/po-management/cart/cart');
var PromoModel = require('./../../../../models/master-deal/promo');
var PromoHistory = require('./../../../../models/member-management/promoHistory');
var dateFormat = require('dateformat');
var mongoose = require('mongoose');

//add module
var validatePromoMember = require('./../../module/validatePromo').validatePromoMember;
var validatePromoHistory = require('./../../module/validatePromo').validatePromoHistory;
var removePromoProduct = require('./../../module/removePromo').removePromoProduct;
var setPromo = require('./../../module/setPromo').setPromo;

exports.setCartPromo = {
    type: CartType.CartType,
    args: {
        memberID: {
            type: GraphQLString,
        },
        code: {
            type: GraphQLString,
        },
        cartType: {
            type: GraphQLString,
        }
    },
    resolve: async (root, params) => {
        const now = new Date();
        const promo = await PromoModel.findOne({
            "code": params.code
        })
        .then(result => {
            if (!result) {
                throw new Error('Promo Code Failed.');
            }
            return result;
        });

        //get cart
        const cart = await CartModel.findOne({
            "member": {
                $elemMatch: {
                    "_id": mongoose.Types.ObjectId(params.memberID)
                }
            },
            "type": params.cartType,
            "deleted_at": null
        }).exec();
        if (cart.promo.length > 0) {
            await removePromoProduct("cart", cart.id);
        }

        //check promo for member and level
        if (promo.members.length > 0 || promo.levels.length > 0) {
            if (!await validatePromoMember(promo, params.memberID)) {
                throw new Error('Promo failed for this member.');
            }
        }

        //validate promo history
        if(!await validatePromoHistory(promo.id, params.memberID)){
            throw new Error('Promo already used.');
        }

        await CartModel.findOneAndUpdate({
            "_id": cart.id
        }, {
            "promo": [promo],
            "promo_used": false,
            "updated_at": dateFormat(now, "yyyy-mm-dd H:MM:ss")
        });
        await new PromoHistory({
            'member_id': params.memberID,
            'promo': [promo],
            'created_at': dateFormat(now, "yyyy-mm-dd H:MM:ss")
        }).save();
        console.log(await setPromo("cart", cart.id));
        return await CartModel.findById(cart.id).exec();
    }
}