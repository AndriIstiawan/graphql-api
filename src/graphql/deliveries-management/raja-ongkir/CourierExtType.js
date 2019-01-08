var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLList = require('graphql').GraphQLList;
var CourierType = require('./../courier/CourierType').CourierType;

// Courier Service
var CostExtType = new GraphQLObjectType({
    name: 'ro_cost',
    fields: function () {
        return {
            value: {
                type: GraphQLFloat
            },
            etd: {
                type: GraphQLString
            },
            note: {
                type: GraphQLString
            },
        }
    }
});

// Courier Service
var ServiceExtType = new GraphQLObjectType({
    name: 'ro_courier_service',
    fields: function () {
        return {
            service: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            cost: {
                type: new GraphQLList(CostExtType)
            },
        }
    }
});

// Courier
exports.CourierExtType = new GraphQLObjectType({
    name: 'ro_courier',
    fields: function () {
        return {
            code: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            detail: {
                type: new GraphQLList(CourierType),
                resolve(parent, args) {
                    parent.detail.map( obj =>{
                        return obj.id = obj._id;
                    });
                    return parent.detail;
                }
            },
            costs: {
                type: new GraphQLList(ServiceExtType)
            },
        }
    }
});

// Service and cost export
exports.ServiceExtType = ServiceExtType;
exports.CostExtType = CostExtType;