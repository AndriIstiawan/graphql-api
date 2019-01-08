var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;

var discountTargetType = new GraphQLObjectType({
    name: 'discountTargetType',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            slug: {
                type: GraphQLString
            },
        }
    }
});

var discountType = new GraphQLObjectType({
    name: 'discountType',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            title: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            status: {
                type: GraphQLString
            },
            value: {
                type: GraphQLString
            },
            type: {
                type: GraphQLString
            },
            expired_date: {
                type: GraphQLString
            },
            brands: {
                type: new GraphQLList(discountTargetType)
            },
            categories: {
                type: new GraphQLList(discountTargetType)
            },
            products: {
                type: new GraphQLList(discountTargetType)
            },
            levels: {
                type: new GraphQLList(discountTargetType)
            },
            members: {
                type: new GraphQLList(discountTargetType)
            },
        }
    }
});

exports.discountType = discountType;