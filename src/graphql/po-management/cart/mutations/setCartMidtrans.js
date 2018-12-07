var GraphQLString = require('graphql').GraphQLString;
var CartType = require('./../CartType');
var CartModel = require('./../../../../models/po-management/cart/cart');
var midtrans = require('./../../../../app/midtransConfig').midtrans;

//set cart midtrans by id
exports.setCartMidtrans = {
    type: CartType.CartType,
    args: {
        cartID: {
            type: GraphQLString
        }
    },
    resolve: async (root, params) => {
        const cart = await CartModel.findById(params.cartID).exec();
        var total_gross = cart.total_price[0].total;
        if(cart.total_price[0].total_cut_promo > 0){
            total_gross = cart.total_price[0].total_cut_promo;
        }
        const payload = {
            "transaction_details": {
                "order_id": "ORDER-" + cart.id,
                "gross_amount": total_gross
            },
            "customer_details": {
                "first_name": cart.member[0].name,
                "email": cart.member[0].email,
                "phone": cart.member[0].phone,
                "shipping_address": {
                    "first_name": cart.address[0].receiver_name,
                    "email": cart.member[0].email,
                    "phone": cart.address[0].phone_number,
                    "address": cart.address[0].address,
                    "city": cart.address[0].city_name,
                    "postal_code": cart.address[0].postal_code,
                    "country_code": "IDN"
                }
            },
        };

        const token = await midtrans.snap.transactions(payload)
            .then((token) => {
                return token.data.token;
            })
            .catch((err) => {
                console.log(err);
                throw new Error('Set Cart Midtrans failed.');
            });

        const updateCart = await CartModel.findOneAndUpdate({
            _id: params.cartID
        }, {
            "midtrans_token": token
        });
        return CartModel.findById(params.cartID).exec();
        return null;
    }
}