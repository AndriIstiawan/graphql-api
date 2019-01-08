var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;

var targetDetType = new GraphQLObjectType({
    name: 'targetDetType',
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

var targetType = new GraphQLObjectType({
    name: 'targetType',
    fields: function () {
        return {
            target: {
                type: GraphQLString
            },
            brands: {
                type: new GraphQLList(targetDetType)
            },
            categories: {
                type: new GraphQLList(targetDetType)
            },
            products: {
                type: new GraphQLList(targetDetType)
            },
            couriers: {
                type: new GraphQLList(targetDetType)
            },
        }
    }
});

// Level Type
exports.PromoType = new GraphQLObjectType({
    name: 'promo',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            image: {
                type: GraphQLString
            },
            title: {
                type: GraphQLString
            },
            code: {
                type: GraphQLString
            },
            value: {
                type: GraphQLString
            },
            type: {
                type: GraphQLString
            },
            target: {
                type: new GraphQLList(targetType)
            },
            expired_date: {
                type: GraphQLString
            },
            content_html: {
                type: GraphQLString
            },
            levels: {
                type: new GraphQLList(targetDetType)
            },
            members: {
                type: new GraphQLList(targetDetType)
            },
        }
    }
});