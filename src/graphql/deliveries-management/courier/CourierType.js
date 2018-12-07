var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;

// Courier Service
var CourierServiceType = new GraphQLObjectType({
    name: 'courier_service_type',
    fields: function () {
        return {
            name: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
        }
    }
});

// Locations Type
var LocationType = new GraphQLObjectType({
    name: 'location',
    fields: function () {
        return {
            city_id: {
                type: GraphQLString
            },
            province_id: {
                type: GraphQLString
            },
            province: {
                type: GraphQLString
            },
            type: {
                type: GraphQLString
            },
            city_name: {
                type: GraphQLString
            },
            postal_code: {
                type: GraphQLString
            },
        }
    }
});

// Courier Type
var CourierType = new GraphQLObjectType({
    name: 'courier',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            courier: {
                type: GraphQLString
            },
            type: {
                type: GraphQLString
            },
            slug: {
                type: GraphQLString
            },
            location: {
                type: new GraphQLList(LocationType)
            },
            service: {
                type: new GraphQLList(CourierServiceType)
            },
            status: {
                type: GraphQLString
            }
        }
    }
});

exports.CourierType = CourierType;