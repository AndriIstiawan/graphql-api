var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLInt = require('graphql').GraphQLInt;

// Level Type
exports.Order_statusType = new GraphQLObjectType({
  name: 'order_status',
  fields: function () {
    return {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString }
    }
  }
});