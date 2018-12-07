var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLList = require('graphql').GraphQLList;

// List Type
var ListType = new GraphQLObjectType({
    name: 'listType',
    fields: function () {
        return {
            type: {
                type: GraphQLString
            },
            link: {
                type: GraphQLString
            },
            url: {
                type: GraphQLString
            },
            title: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            icon: {
                type: GraphQLString
            },
        }
    }
});

// Position Type
var PositionType = new GraphQLObjectType({
    name: 'positionType',
    fields: function () {
        return {
            title: {
                type: GraphQLString
            },
            list: {
                type: new GraphQLList(ListType)
            },
        }
    }
});

// Level Type
exports.FooterType = new GraphQLObjectType({
    name: 'footer',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            left: {
                type: new GraphQLList(PositionType)
            },
            middle: {
                type: new GraphQLList(PositionType)
            },
            right: {
                type: new GraphQLList(PositionType)
            },
        }
    }
});