var GraphQLString = require('graphql').GraphQLString;
var dateFormat = require('dateformat');
var midtrans = require('./../../../../app/midtransConfig').midtrans;
//add orders type and model
var OrdersType = require('./../OrdersType');
var OrdersModel = require('./../../../../models/order-management/orders');
//add cart model
var CartModel = require('./../../../../models/po-management/cart/cart');
//add payment method model
var PaymentMethodModel = require('./../../../../models/payment-management/payment-method');
//add inqiury type
var InquiryModel = require('./../../../../models/po-management/inquiry/inqury');

exports.finalizeMidtrans = {
    type: OrdersType.OrdersType,
    args: {
        order_id: {
            type: GraphQLString,
        },
    },
    resolve: async (root, params) => {
        const order_midtrans = params.order_id.replace('ORDER-','');
        const now = new Date();
        var member = [];
        var cart = [];
        var inquiry = [];
        var payment = [];
        var deliveries = [];
        var courier = [];
        var type = "B2C";
        var total_price = 0;

        //get midtrans payment method
        payment = await PaymentMethodModel.find({
            "key": "midtrans"
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return [];
        });
        
        // await midtrans.transaction.status(params.order_id)
        // .then((res) => {
        //     payment[0].detail = [res.data];
        // })
        // .catch((err) => {
        //     console.log(err);
        // });

        //find cart
        cart = await CartModel.find({
            "_id": order_midtrans
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return [];
        });

        //find inquiry
        inquiry = await InquiryModel.find({
            "_id": order_midtrans
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return [];
        });

        if(cart.length > 0){
            const updateCart = await CartModel.findOneAndUpdate({
                "_id": order_midtrans
            }, {
                status: "Ordering",
                updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
                "deleted_at" : dateFormat(now, "yyyy-mm-dd H:MM:ss")
            });
            type = cart[0].type;
            member = cart[0].member;
            courier = cart[0].courier;
        }

        if(inquiry.length > 0){
            const updateInquiry = await InquiryModel.findOneAndUpdate({
                "_id": order_midtrans
            }, {
                status: "Ordering",
                updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
            });
            type = inquiry[0].type;
            member = inquiry[0].member;
            courier = inquiry[0].courier;
        }

        const uModel = await new OrdersModel({
            order_id: params.order_id,
            member: member,
            cart: cart,
            inquiry: inquiry,
            payment: payment,
            deliveries: deliveries,
            courier: courier,
            total_price: total_price,
            status: "Payment Pending",
            type: type,
            created_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
            updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss")
        });
        const newOrders = uModel.save();
        return await newOrders;
    }
}