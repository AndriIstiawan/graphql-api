var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var mongoose = require('mongoose');
var OrdersType = require('./../OrdersType').OrdersType;
var OrdersModel = require('./../../../../models/order-management/orders');

exports.acceptInquiry = {
    type: OrdersType,
    args: {
        orderID: {
            type: GraphQLString,
        },
        productID: {
            type: GraphQLString,
        },
        accept: {
            type: GraphQLBoolean,
        },
    },
    resolve: async (root, params) => {
        const Order = await OrdersModel.findOneAndUpdate({
            "_id": params.orderID,
            'inquiry.inquiries.id' : mongoose.Types.ObjectId(params.productID)
        },{
            $set : {
                'inquiry.0.inquiries.$.accept' : params.accept,
            }
        }
        ).exec();
        return OrdersModel.findById(params.orderID).exec();
    }
}