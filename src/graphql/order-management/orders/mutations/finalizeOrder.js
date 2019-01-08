var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQLFloat;
var dateFormat = require('dateformat');
//add orders type
var OrdersType = require('./../OrdersType');
var OrdersModel = require('./../../../../models/order-management/orders');
//add member type
var MemberType = require('./../../../member-management/member/MemberType').MemberType;
var MemberModel = require('./../../../../models/member-management/member');
//add cart type
var CartType = require('./../../../po-management/cart/CartType').CartType;
var CartModel = require('./../../../../models/po-management/cart/cart');
//add inqiury type
var InquiryType = require('./../../../po-management/inquiry/InquryType').InquryType;
var InquiryModel = require('./../../../../models/po-management/inquiry/inqury');

exports.finalizeOrder = {
    type: OrdersType.OrdersType,
    args: {
        memberID: {
            type: GraphQLString,
        },
        cartID: {
            type: GraphQLString,
        },
        InquiryID: {
            type: GraphQLString,
        },
        orderType: {
            type: GraphQLString,
        },
    },
    resolve: async (root, params) => {
        const now = new Date();
        var member = [];
        var cart = [];
        var inquiry = [];
        var payment = [];
        var deliveries = [];
        var courier = [];
        var total_price = 0;

        //add member
        if(params.memberID){
            member = await MemberModel.find({
                "_id": params.memberID
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                return [];
            });
        }

        //add cart
        if(params.cartID){
            const updateCart = await CartModel.findOneAndUpdate({
                "_id": params.cartID
            }, {
                "deleted_at": dateFormat(now, "yyyy-mm-dd H:MM:ss"),
                status: "Ordering",
                updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
            });
            cart = await CartModel.find({
                "_id": params.cartID
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                return [];
            });

            total_price = total_price + cart[0].total_price;
        }

        //add inquiry
        if(params.InquiryID){
            inquiry = await InquiryModel.find({
                "_id": params.InquiryID
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                return [];
            });

            const updateInquiry = await InquiryModel.findOneAndUpdate({
                "_id": params.InquiryID
            }, {
                status: "Ordering",
            });
        }

        const uModel = await new OrdersModel({
            member: member,
            cart: cart,
            inquiry: inquiry,
            payment: payment,
            deliveries: deliveries,
            total_price: total_price,
            status: "Checkout",
            type: params.orderType,
            created_at: dateFormat(now, "yyyy-mm-dd H:MM:ss"),
            updated_at: dateFormat(now, "yyyy-mm-dd H:MM:ss")
        });
        const newOrders = uModel.save();


        return await newOrders;
    }
}