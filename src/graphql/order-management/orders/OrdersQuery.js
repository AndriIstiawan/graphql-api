var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var OrdersType = require('./OrdersType');
var OrdersModel = require('./../../../models/order-management/orders');
var mongoose = require('mongoose');

//get product by id
exports.getOrders = {
    type: OrdersType.OrdersType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const orders = OrdersModel.findById(params.id).exec();
        if (!orders) {
            throw new Error('Error')
        }
        return orders;
    }
}

//get product by id
exports.getOrdersByMember = {
    type: new GraphQLList(OrdersType.OrdersType),
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params) {
        const orders = OrdersModel.find({
            "member": {
                $elemMatch: {
                    "_id":mongoose.Types.ObjectId(params.id)
                }
            }
        }).exec();
        if (!orders) {
            throw new Error('Error')
        }
        return orders;
    }
}