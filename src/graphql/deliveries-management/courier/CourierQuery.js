var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;
var CourierType = require('./CourierType').CourierType;
var CourierModel = require('./../../../models/deliveries-management/courier');

//view all promo
exports.Couriers = {
    type: new GraphQLList(CourierType),
    args: {
        type: {
            type: GraphQLString,
        },
    },
    resolve: (root, params) => {

        var couriers = CourierModel.find({
            $and: [{
                    "deleted_at": null
                },
                {
                    "status": "on"
                }
            ]
        });

        if (params.type == "default courier" || params.type == "e-commerce courier") {
            couriers.find({
                "type": params.type
            });
        }

        couriers.exec();
        return couriers;
    }
}