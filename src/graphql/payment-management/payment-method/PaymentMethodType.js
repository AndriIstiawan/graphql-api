var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;

// Orders Type
exports.PaymentMethodType = new GraphQLObjectType({
    name: 'payment_method',
    fields: function () {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            type: {
                type: GraphQLString
            },
            key: {
                type: GraphQLString
            },
            image: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            account: {
                type: GraphQLString
            },
            account_number: {
                type: GraphQLString
            },
            status: {
                type: GraphQLString
            },
            created_at: {
                type: GraphQLString
            },
            updated_at: {
                type: GraphQLString
            },
            deleted_at: {
                type: GraphQLString
            },
        }
    }
});